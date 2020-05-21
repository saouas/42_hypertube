import axios from 'axios';

class PopcornTime {
  static getByKeywords(keywords = '', page = 1) {
    return new Promise((resolve, reject) => {
      axios.get(`https://tv-v2.api-fetch.website/movies/${page}/?keywords=${encodeURI(keywords)}`, {
        params: {
          sort: 'name'
        }
      })
      .then((res) => {
        const data = res.data.map((movie) => {
          return {
            imdb: movie.imdb_id,
            title: movie.title,
            year: Number(movie.year),
            synopsis: movie.synopsis,
            released: movie.released,
            torrent: PopcornTime.getTorrentBestIn(movie.torrents),
            genres: movie.genres,
            banner: movie.banner,
            found_with: 'popcorn'
          }
        })
        console.log('popcorntime fetched')
        resolve(data);
      })
      .catch(() => {
        console.log('failed to fetch popcorntime')
        resolve([])
      })
    })
  }

  static getTorrentBestIn(torrents) {
    let torrentReturn;
    let quality;
    if (torrents.en['720p']) {
      torrentReturn = torrents.en['720p'];
      quality = '720p';
    }
    if (torrents.en['1080p']) {
      torrentReturn = torrents.en['1080p'];
      quality = '1080p';
    }

    torrentReturn = {
      hash: torrentReturn.url,
      quality: quality,
      seeds: torrentReturn.seed,
      peers: torrentReturn.peer
    }
    return torrentReturn;
  }
}

export { PopcornTime }