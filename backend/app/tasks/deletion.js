'use strict'
import cron from 'node-cron';
import { MovieManager } from '../services/MovieManager';
import fs from 'fs';
import config from '../../config';

const deletion = () => {
  console.log('creation task');
  cron.schedule('* * * * *', () => {
    console.log('ok running deletion task');
    MovieManager.getOneMonthMovies()
    .then((_docs) => {
      console.log(_docs);
      _docs.forEach((doc) => {
        doc.path.forEach((path) => {
          console.log(`delete: ${path}`)
          if (fs.existsSync(`${config.temp_directory}/files/${path}`))
            fs.unlinkSync(`${config.temp_directory}/files/${path}`)
        })
      })

      MovieManager.resetDate(_docs.map((el) => el._id))
      console.log('all files deleted..')
    })
    .catch((err) => {
      console.log('failed to get old viewed movies')
    })
  })
}

export default deletion;