import PirateBay from 'thepiratebay';
import ptn from 'parse-torrent-name';
import { Imdbservice } from './ImdbService';

const removeDups = function (torrents) {
  const seen = new Set();
  torrents.filter(el => {
    const duplicate = seen.has(el.title.toLowerCase());
    seen.add(el.title.toLowerCase());
    return !duplicate;
  })
  return torrents;
}

const processMovies = function (result) {
  return new Promise((resolve, reject) => {
    console.log('ok TPB process movies..')
    const filtered = result.filter((el) => {
      return el.category.id == '201' || el.subcategory.id == '201';
    })
    let data = filtered.map((el) => {
      const parsed = ptn(el.name);
      return {
        title: parsed.title,
        torrent: el.magnetLink,
        seeds: Number(el.seeders),
        leechers: el.leechers,
        found_with: 'pirate'
      }
    })
    data = removeDups(data);
    console.log('get imdb for the pirate bay')
    Promise.all(data.map(async (item) => {
      const imdbInfo = await Imdbservice.getImdbByTitle(item.title);
      if (imdbInfo)
        item.imdb = imdbInfo.imdbid
      return item;
    }))
      .then((movies) => {
        resolve(movies)
      })
      .catch(reject);
  })
}

const PirateBayService = {
  getByKeywords(keywords = '', page = 1) {
    return PirateBay.search(keywords, {
      category: 201,
      page: page,
      orderBy: 'name',
      sortBy: 'asc'
    })
      .then((result) => {
        return processMovies(result);
      })
      .then((data) => {
        console.log('pirate bay fetched')
        return data;
      })
      .catch(() => {
        return ([]);
      })
  },

  getPopular() {
    return PirateBay.topTorrents(201)
      .then((torrents) => {
        console.log('popular torrents fetched')
        torrents = torrents.slice(0, 24);
        return processMovies(torrents);
      })
      .then((movies) => {
        console.log('popular movies fetched')
        return movies;
      })
  }
}

export { PirateBayService }