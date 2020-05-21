import omdbapi from 'omdbapi';
import config from '../../config';

const omdb = new omdbapi(config.omdb_api_key);

const objectValueArray = function(obj) {
  if (!obj)
    return null;
  return Object.entries(obj).map((tab) => tab[1])
}

class Imdbservice {
  static getImdb(imdb) {
    return new Promise((resolve) => {
      omdb.get({ id: imdb })
      .then(resolve)
      .catch(() => resolve(null));
    })
  }

  static getImdbByTitle(title) {
    return new Promise((resolve, reject) => {
      omdb.get({
        title: title
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        resolve(null)
      })
    })
  }

  static getImdbForMovies(movies) {
    if (movies.length === 0)
      return [];
    return Promise.all(movies.map(async (item) => {
      let data;
      if (!item.imdb)
        return item;
      data = await this.getImdb(item.imdb);
      if (!data)
        return item;
      if (typeof item.rating === 'object' || !item.rating)
        item.rating = data.imdbrating;
      item.actors = objectValueArray(data.actors);
      item.writer = objectValueArray(data.writer);
      item.director = objectValueArray(data.director);
      item.runtime = data.runtime;
      if (!item.genres)
        item.genres = objectValueArray(data.genre);
      if (!item.banner)
        item.banner = data.poster;
      item.year = Number(data.year);
      if (isNaN(item.year))
        item.year = null;
      if (!item.synopsis)
        item.synopsis = data.plot;
      return item;
    }))
  }
}

export { Imdbservice }