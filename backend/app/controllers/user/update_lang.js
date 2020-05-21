import { regex } from '../../models/regex';
import { ErrorHandler } from '../ErrorHandler';
import Joi from '@hapi/joi';
import { UserManager } from '../../services/UserManager';

const schema = Joi.object().keys({
    lang: Joi.string().regex(regex.lang).required()
});

const update_lang = (req, res) => {
    const session = req.session;
    let data;
    schema.validate(req.body)
    .then((freshData) => {
        data = freshData;
        return UserManager.updateLang(session.username, data.lang)
    })
    .then(() => {
        res.json().end()
    })
    .catch((err) => {
        ErrorHandler.handleWebError(req, res, err);
    })
}

export default update_lang