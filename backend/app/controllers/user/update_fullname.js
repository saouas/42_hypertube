import Joi from '@hapi/joi';
import { regex } from '../../models/regex';
import { e_error } from '../../constants/e_error';
import { ErrorHandler } from '../ErrorHandler';
import { UserManager } from '../../services/UserManager';

const schema = Joi.object().keys({
    first_name: Joi.string().regex(regex.first_name).required(),
    last_name: Joi.string().regex(regex.last_name).required()
});

const update_fullname = function(req, res) {
    const session = req.session;
    let data;
    schema.validate(req.body)
    .then((freshData) => {
        data = freshData;
        return UserManager.updateFullname(session.username, data.first_name, data.last_name);
    })
    .then(() => {
        res.end();
    })
    .catch((err) => {
        ErrorHandler.handleWebError(req, res, err)
    })
}

export default update_fullname;