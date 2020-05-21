import Joi from '@hapi/joi';
import { regex } from '../../models/regex';
import { e_error } from '../../constants/e_error';
import { ErrorHandler } from '../ErrorHandler';
import { UserManager } from '../../services/UserManager';

const schema = Joi.object().keys({
    username: Joi.string().regex(regex.username).required()
});

const get_user = function(req, res) {
    schema.validate(req.query)
    .then((freshData) => {
        return UserManager.getUser(freshData.username)
    })
    .then((user) => {
        if (!user) throw e_error.NOT_FOUND;
        let toSend = Object.assign({}, user._doc);
        delete toSend['_id'];
        res.json(toSend);
    })
    .catch((err) => {
        ErrorHandler.handleWebError(req, res, err);
    })
}

export default get_user;