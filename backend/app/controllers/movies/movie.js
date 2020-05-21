import Joi from '@hapi/joi';
import { regex } from '../../models/regex';
import { ErrorHandler } from '../ErrorHandler';
import { MovieManager } from '../../services/MovieManager';
import { e_error } from '../../constants/e_error';

const schema = Joi.object().keys({
  id: Joi.string().regex(regex.mongo_id).required(),
});

const movie = function (req, res) {
  const session = req.session;
  let data;
  let movie;
  schema.validate(req.query)
  .then((freshData) => {
    data = freshData;
    return MovieManager.getMovie(freshData.id)
  })
  .then((freshMovie) => {
    if (!freshMovie) throw e_error.NOT_FOUND;
    movie = freshMovie;
    return MovieManager.addViewer(data.id, session.username)
  })
  .then(() => {
    res.json(movie);
  })
  .catch((err) => {
    ErrorHandler.handleWebError(req, res, err);
  })
}

export default movie