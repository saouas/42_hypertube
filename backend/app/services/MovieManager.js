import Movie from "../models/mongoose/Movie";
import escapeRegex from 'escape-string-regexp';
import { Types } from "mongoose";

class MovieManager {
  static moviesExists(imdb_id = []) {
    return new Promise((resolve, reject) => {
      Movie.find({ imdb: { $in: imdb_id } })
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
    })
  }

  static getMovies(imdb_db = []) {
    return new Promise((resolve, reject) => {
      Movie.find({ imdb: { $in: imdb_db} }, '_id imdb genres title year banner rating')
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
    })
  }

  static getPopularMovies(username) {
    return new Promise((resolve, reject) => {
      Movie.aggregate([
        {
          $sort: {
            'seeds': -1
          }
        },
        {
          $project: {
            "watched": { $in: [username, "$watched_by"] },
            '_id': 1,
            'imdb': 1,
            'genres': 1,
            'title': 1,
            'year': 1,
            'banner': 1,
            'rating': 1,
            'seeds': 1
          }
        },
        {
          $limit: 16
        }
      ])
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
    })
  }

  static getMoviesKeywords(title, username) {
    return new Promise((resolve, reject) => {
      Movie.aggregate([
        {
          $match: {
            title: new RegExp(escapeRegex(title), 'i')
          }
        },
        {
          $project: {
            "watched": { $in: [username, "$watched_by"] },
            '_id': 1,
            'imdb': 1,
            'genres': 1,
            'title': 1,
            'year': 1,
            'banner': 1,
            'rating': 1,
            'seeds': 1
          }
        },
        {
          $sort: {
            'title': 1
          }
        },
        {
          $limit: 8
        }
      ])
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
    })
  }

  static getMoviesKeywordsIndex(title, username, index) {
    return new Promise((resolve, reject) => {
      Movie.aggregate([
        {
          $match: {
            title: new RegExp(escapeRegex(title), 'i')
          }
        },
        {
          $project: {
            "watched": { $in: [username, "$watched_by"] },
            '_id': 1,
            'imdb': 1,
            'genres': 1,
            'title': 1,
            'year': 1,
            'banner': 1,
            'rating': 1,
            'seeds': 1
          }
        },
        {
          $sort: {
            'title': 1
          }
        },
        {
          $match: {
            title: { $gt: index }
          }
        },
        {
          $limit: 8
        }
      ])
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
    })
  }

  static insertMovies(movies = []) {
    return new Promise((resolve, reject) => {
      Movie.insertMany(movies)
      .then(() => {
        resolve();
      })
      .catch(() => {
        console.log('duplicate');
        resolve();
      });
    })
  }

  static getMovie(movie) {
    return new Promise((resolve, reject) => {
      Movie.find({ _id: movie }, '_id imdb genres title year banner rating synopsis actors writer director runtime')
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
    })
  }

  static addViewer(_id, username) {
    return Movie.findByIdAndUpdate({ _id: _id }, {
      $addToSet: { watched_by: username}
    })
  }

  static insertComment(_id, username, content) {
    return new Promise((resolve, reject) => {
      Movie.updateOne({ _id: _id }, {
        $push: { comments: { username: username, content: content } }
      })
      .then((_doc) => {
        resolve(_doc.nModified);
      })
      .catch(reject);
    })
  }

  static getRecentComments(_id) {
    return new Promise((resolve, reject) => {
      Movie.aggregate([
        {
          '$match': {
            '_id': new Types.ObjectId(_id)
          }
        }, {
          '$unwind': {
            'path': '$comments'
          }
        }, {
          '$replaceRoot': {
            'newRoot': '$comments'
          }
        }, {
          '$sort': {
            'date': -1
          }
        }
      ])
      .then((_docs) => {
        resolve(_docs);
      })
      .catch(reject);
    })
  }

  static getMovieHash(id) {
    return new Promise((resolve, reject) => {
      Movie.findById(id, 'torrent found_with title')
      .then((_doc) => {
        resolve(_doc);
      })
      .catch(reject);
    })
  }

  static getMovieImdb(id) {
    return new Promise((resolve, reject) => {
      Movie.findById(id, 'imdb')
      .then((_doc) => {
        resolve(_doc);
      })
      .catch(reject);
    })
  }

  static setLastViewAndPath(id, path) {
    return new Promise((resolve, reject) => {
      Movie.updateOne({ '_id': id }, { last_view: Date.now(), $set : { path: path } })
      .then(() =>  {
        resolve();
      })
      .catch(reject);
    })
  }

  static getOneMonthMovies() {
    return new Promise((resolve, reject) => {
      console.log((Date.now() - (86400000 * 30)));
      Movie.find({ last_view: { $lt: (Date.now() - (86400000 * 30)) } }, '_id path')
      .then((_docs) => {
        resolve(_docs);
      })
      .catch(reject);
    })
  }

  static resetDate(ids) {
    return new Promise((resolve, reject) => {
      Movie.updateMany({ _id: { $in: ids } }, { $unset: { path: 1, last_view: 1 } })
      .then(() => {
        resolve();
      })
      .catch(reject);
    })
  }
}

export { MovieManager }