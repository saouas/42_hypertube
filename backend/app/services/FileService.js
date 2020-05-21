import fs from 'fs';
import config from '../../config';

export const FileService = {
  try_to_delete(file_path)  {
    try {
      if (file_path && fs.existsSync(file_path))
        fs.unlinkSync(file_path);
    }
    catch (err) {
      console.log(err);
    }
  },
  subtitlesExist(imdb) {
    let ok = fs.existsSync(`${config.subtitles_directory}/`);
    if (!ok)
      return (false);
    ok = fs.existsSync(`${config.subtitles_directory}/${imdb}`)
    if (!ok)
      return (false);
    return (true);
  },

  createSubtitlesDir(imdb) {
    if (!fs.existsSync(`${config.temp_directory}/`))
      fs.mkdirSync(`${config.temp_directory}`);
    if (!fs.existsSync(`${config.subtitles_directory}`))
      fs.mkdirSync(`${config.subtitles_directory}`);
    if (!fs.existsSync(`${config.subtitles_directory}/${imdb}`))
      fs.mkdirSync(`${config.subtitles_directory}/${imdb}`)
  },

  subtitleExist(imdb, lang) {
    if (fs.existsSync(`${config.subtitles_directory}/${imdb}/${lang}.vtt`))
      return (true);
    return (false);
  }
}