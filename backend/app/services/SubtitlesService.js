import OS from 'opensubtitles-api';
import config from '../../config';
import { FileService } from './FileService';
import download from './download';

const OpenSubtitles = new OS({
  useragent: 'TemporaryUserAgent',
  username: config.os.username,
  password: config.os.password
});

const SubtitlesService = {
  downloadSubtitle(imdb, res_obj) {
    console.log(`download subtitle: ${res_obj.langcode}`);
    return download(res_obj.vtt, `${config.subtitles_directory}/${imdb}/${res_obj.langcode}.vtt`)
  },
  downloadSubtitles(imdb) {
    return new Promise((resolve, reject) => {
      FileService.createSubtitlesDir(imdb);
      console.log(imdb)
      OpenSubtitles.search({
        imdbid: imdb,
        sublanguageid: ['spa', 'fre', 'eng'].join()
      })
        .then((subtitles) => {
          let promises = [];
          for (let [key, value] of Object.entries(subtitles)) {
            promises.push(this.downloadSubtitle(imdb, value));
          }
          return Promise.all(promises);
        })
        .then(() => {
          console.log('downloaded')
          resolve();
        })
        .catch(reject)
    })
  },

  getLanguages(imdb) {
    return new Promise((resolve, reject) => {
      let promise = Promise.resolve();

      if (!FileService.subtitlesExist(imdb))
        promise = SubtitlesService.downloadSubtitles(imdb);

      promise.then(() => {
        let toCheck = ['fr', 'en', 'es']
        let languages = toCheck.filter((el) => {
          if (FileService.subtitleExist(imdb, el))
            return true;
          return false;
        })
        resolve(languages);
      })
      .catch(reject)
    })
  },
  get(imdb, best_language) {
    return new Promise((resolve, reject) => {
      if (!FileService.subtitlesExist(imdb))
        return resolve(null);
      if (FileService.subtitleExist(imdb, best_language))
        return resolve(`${config.subtitles_directory}/${imdb}/${best_language}.vtt`)
      return resolve(null);
    })
  }

}

export { SubtitlesService }