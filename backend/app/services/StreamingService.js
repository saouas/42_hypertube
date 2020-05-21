import torrentstream from 'torrent-stream';
import { torrent_options } from '../../config';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import pump from 'pump';
import trackers from '../constants/trackers';
import { MovieManager } from './MovieManager';

const streamConvertTorrent = (rangeVideo, res, fl, format) => {
  let fileStream = fl.createReadStream()
    const head = {
      'Cache-Control': 'no-cache, no-store',
      'Content-Length': fl.length,
      'Content-Type': `video/webm`,
    }
    res.writeHead(200, head);
    console.log('streaming conversion')

  let stream = ffmpeg(fileStream)
  .on('error', function(err) {
      console.log('Streaming[Conversion]: error:', err)
  })
  .audioBitrate(128)
  .audioCodec('libvorbis')
  .format('webm')
  .videoBitrate(1024)
  .videoCodec('libvpx')
  .fps(30)
  .outputOptions([
    '-cpu-used 5',
    '-d --rt',
    '-error-resilient 1',
    '-threads 4'
])
  .on('progress', function (progress) {
    console.log('Processing: ' + progress.frames + 'frames done');
  })
  .on('end', () => {
      console.log('Streaming[Conversion]: finished')
  })

  pump(stream, res)
}

const streamTorrent = (rangeVideo, res, fl, format) => {
  const fileSize = fl.length
  const range = rangeVideo
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1
    const chunksize = (end - start) + 1
    const file = fl.createReadStream({ start, end })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': `video/${format}`,
    }
    res.writeHead(206, head);
    console.log('streaming directly from torrent')
    pump(file, res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    const stream = fs.createReadStream(path)
    pump(stream, res)
  }
}

const StreamingService = {
  stream(magnet, range, id, res) {
    console.log(magnet)
    let engine = torrentstream(magnet, torrent_options);
    setInterval(() => console.log(`peers: ${Object.keys(engine.swarm._peers).length}`), 5500);
    engine.on('ready', () => {
      let path = [];
      engine.files.forEach((file) => {
        console.log('filename:', file.name);
        console.log(`length ${file.length}`);
        console.log(`path: ${file.path}`)
        path.push(file.path);
        let format;
        if (file.name.endsWith('.mp4'))
          format = 'mp4';
        if (file.name.endsWith('.avi'))
          format = 'avi';
        if (file.name.endsWith('.ogg'))
          format = 'ogg';
        if (file.name.endsWith('.mkv'))
          format = 'mkv'
        if (file.name.endsWith('.webm'))
          format = 'webm'
        if (format) {
          console.log('stream torrent')
          if (['webm', 'mp4'].includes(format))
            streamTorrent(range, res, file, format)
          else
            streamConvertTorrent(range, res, file, format)
        }
      })
      MovieManager.setLastViewAndPath(id, path);
    })

    engine.on('download', (piece) => {
      console.log(`[${id}] pcs: ${piece}`)
    })

    engine.on('upload', (pieces, offset, length) => {
      console.log(`[${id}] upload [pieces: ${pieces}| offset: ${offset}| length: ${length}]`);
    })
  }
}

export { StreamingService }