import Joi from '@hapi/joi';
import { regex } from '../../models/regex';
import { ErrorHandler } from '../ErrorHandler';
import { MovieManager } from '../../services/MovieManager';

const schema = Joi.object().keys({
  id: Joi.string().regex(regex.mongo_id).required()
});

const comments = function (req, res) {
  let data;
  schema.validate(req.query)
  .then((freshData) => {
    data = freshData;
    return MovieManager.getRecentComments(data.id)
  })
  .then((docs) => {
    res.json(docs);
  })
  .catch((err) => {
    ErrorHandler.handleWebError(req, res, err);
  })
}

export default comments