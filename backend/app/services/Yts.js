import axios from 'axios'

class Yts {
  static getByKeywords(keywords = '', page = 1) {
    return new Promise((resolve, reject) => {
      axios.get('https://yts.lt/api/v2/list_movies.json', {
        params: {
          query_term: keywords,
          page: page,
          sort_by: 'name',
          order_by: 'asc',
          limit: 50
        }
      })
      .then((res) => {
        if (!res.data.data.movies)
          return resolve([])
        const data = res.data.data.movies.map((movie) => {
          const torrent = Yts.getTorrentBestIn(movie.torrents);
          return {
            imdb: movie.imdb_code,
            title: movie.title,
            year: Number(movie.year),
            synopsis: movie.synopsis,
            released: movie.released,
            torrent: torrent.hash,
            genres: movie.genres,
            banner: movie.medium_cover_image,
            seeds: Number(torrent.seeds),
            quality: torrent.quality,
            found_with: 'yts'
          }
        })
        console.log('yts fetched')
        resolve(data);
      })
      .catch(() => {
        console.log('failed to fetch yts')
        resolve([])
      })
    })
  }

  static getTorrentBestIn(torrents) {
    let torrentReturn;
    for (let i = 0; i < torrents.length; i++) {
      const torrent = torrents[i];
      if (torrent.quality === '720p')
        torrentReturn = torrent;
      if (torrent.quality === '1080p') {
        torrentReturn = torrent;
        i = torrents.length;
      }
    }
    torrentReturn = {
      hash: torrentReturn.hash,
      quality: torrentReturn.quality,
      seeds: torrentReturn.seeds,
      peers: torrentReturn.peers,
    }
    return torrentReturn; 
  }
}

export { Yts }