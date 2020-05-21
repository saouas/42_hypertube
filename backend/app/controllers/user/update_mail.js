import Joi from '@hapi/joi';
import { regex } from '../../models/regex';
import { e_error } from '../../constants/e_error';
import { ErrorHandler } from '../ErrorHandler';
import { UserManager } from '../../services/UserManager';

const schema = Joi.object().keys({
    mail: Joi.string().regex(regex.mail).required()
});

const update_mail = function(req, res) {
    const session = req.session;
    let data;
    schema.validate(req.body)
    .then((freshData) => {
        data = freshData;
        if (session.auth !== 'basic') throw (e_error.FORBIDDEN_AUTH);
        return UserManager.mailExist(data.mail)
    })
    .then((exist) => {
        if (exist) throw e_error.MAIL_EXIST;
        return UserManager.updateMail(session.username, data.mail)
    })
    .then(() => {
        res.json().end();
    })
    .catch((err) => {
        ErrorHandler.handleWebError(req, res, err)
    })
}

export default update_mail;