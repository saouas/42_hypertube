import Joi from '@hapi/joi';
import { regex } from '../../models/regex';
import { ErrorHandler } from '../ErrorHandler';
import { MovieManager } from '../../services/MovieManager';
import { e_error } from '../../constants/e_error';

const schema = Joi.object().keys({
  id: Joi.string().regex(regex.mongo_id).required(),
  content: Joi.string().regex(regex.comment_content).required()
});

const comment = function (req, res) {
  const session = req.session;
  let data;
  schema.validate(req.body)
  .then((freshData) => {
    data = freshData;
    return MovieManager.insertComment(data.id, session.username, data.content)
  })
  .then((inserted) => {
    if (!inserted) throw e_error.NOT_FOUND;
    res.end();
  })
  .catch((err) => {
    ErrorHandler.handleWebError(req, res, err);
  })
}

export default comment