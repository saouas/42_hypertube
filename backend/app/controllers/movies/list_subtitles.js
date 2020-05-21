import { SubtitlesService } from "../../services/SubtitlesService";
import { ErrorHandler } from "../ErrorHandler";
import { MovieManager } from "../../services/MovieManager";
import { e_error } from "../../constants/e_error";

import Joi from '@hapi/joi';
import { regex } from "../../models/regex";

const schema = Joi.object().keys({
  id: Joi.string().regex(regex.mongo_id).required()
});

const list_subtitles = function (req, res) {
  schema.validate(req.query)
  .then((data) => {
    return MovieManager.getMovieImdb(data.id);
  })
  .then((_docs) => {
    if (!_docs) throw e_error.NOT_FOUND;
    return SubtitlesService.getLanguages(_docs.imdb)
  })
  .then((languages) => {
    res.json({
      languages: languages
    })
  })
  .catch((err) => {
    ErrorHandler.handleWebError(req, res, err)
  })
}

export default list_subtitles;
