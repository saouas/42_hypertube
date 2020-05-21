import { SubtitlesService } from "../../services/SubtitlesService";
import { ErrorHandler } from "../ErrorHandler";
import fs from 'fs';

import Joi from '@hapi/joi';
import { regex } from "../../models/regex";
import { MovieManager } from "../../services/MovieManager";

const schema = Joi.object().keys({
  id: Joi.string().regex(regex.mongo_id).required(),
  lang: Joi.string().regex(regex.lang).required()
});

const get_subtitles = function (req, res) {
  let data;
  schema.validate(req.query)
    .then((freshData) => {
      data = freshData;
      return MovieManager.getMovieImdb(data.id);
    })
    .then((_docs) => {
      if (!_docs) throw e_error.NOT_FOUND;
      return SubtitlesService.get(_docs.imdb, data.lang)
    })
    .then((file) => {
      console.log(file);
      console.log('ok')
      if (!file)
        res.status(404).end();
      else
        fs.createReadStream(file).pipe(res);
    })
    .catch((err) => {
      ErrorHandler.handleWebError(req, res, err)
    })
}

export default get_subtitles;