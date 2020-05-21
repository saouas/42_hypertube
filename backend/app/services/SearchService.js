import { MovieManager } from "./MovieManager";
import { Imdbservice } from "./ImdbService";
import { Yts } from "./Yts";
import { PopcornTime } from "./PopcornTime";
import { PirateBayService } from "./PirateBayService";

const removeDuplicates = function (movies) {
  return movies.filter((movie) => {
    if (movie.found_with == 'popcorn') {
      if (movies.some((a) => {
        if (a.found_with === 'yts' && a.imbd === movie.imbd)
          return true;
      }))
        return false;
    }
    if (movie.found_with == 'pirate') {
      if (movies.some((a) => {
        if (['popcorn', 'yts'].includes(a.found_with) && a.imdb === movie.imdb)
          return true
      }))
        return false;
    }
    return true;
  })
}

const SearchService = {
  movies(keywords, page, username) {
    return new Promise((resolve, reject) => {
      const promises = Promise.all([
        PopcornTime.getByKeywords(keywords, page),
        Yts.getByKeywords(keywords, page),
        PirateBayService.getByKeywords(keywords, page)
      ])
      SearchService.processMovies(promises)
        .then(() => {
          return (MovieManager.getMoviesKeywords(keywords, username));
        })
        .then((movies) => {
          resolve(movies);
        })
        .catch(reject);
    })
  },

  popular() {
    return new Promise((resolve, reject) => {
      const promises = Promise.all([
        PirateBayService.getPopular()
      ])
      SearchService.processMovies(promises)
        .then(() => {
          resolve();
        })
        .catch(reject);
    })
  },

  processMovies(promises) {
    return new Promise((resolve, reject) => {
      console.log('starting search..')
      let movies;
      promises
        .then((values) => {
          console.log('all scraping finished');
          let merged = values[0];
          if (values[1])
            merged = merged.concat(values[1]);
          if (values[2])
            merged = merged.concat(values[2])
          merged = removeDuplicates(merged)
          movies = merged;
          return MovieManager.moviesExists(movies.map((el) => el.imdb))
        })
        .then((_docs) => {
          //console.log(_docs);
          console.log('get imdb for movies')
          const toInsert = movies.filter((movie) => {
            return !(_docs.some((mov) => {
              return mov.imdb === movie.imdb
            }))
          })
          return Imdbservice.getImdbForMovies(toInsert);
        })
        .then((toInsert) => {
          console.log(`ok we're trying to insert, length: ${toInsert.length}`)
          toInsert = toInsert.filter((el) => el.imdb)
          toInsert = toInsert.map((el) => {
            el.title = el.title.toLowerCase();
            return el;
          })
          if (toInsert.length > 0)
            return MovieManager.insertMovies(toInsert)
          return ([]);
        })
        .then((_docs) => {
          console.log('all is finished')
          resolve(_docs);
        })
        .catch(reject);
    })
  }
}

export { SearchService }