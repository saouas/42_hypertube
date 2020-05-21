import Joi from '@hapi/joi';
import { regex } from '../../models/regex';
import { e_error } from '../../constants/e_error';
import { ErrorHandler } from '../ErrorHandler';
import { UserManager } from '../../services/UserManager';
import bcryptjs from 'bcryptjs';
import { bcrypt } from '../../../config';

const schema = Joi.object().keys({
    old_password: Joi.string().regex(regex.password).required(),
    new_password: Joi.string().regex(regex.password).required()
});

const update_password = function(req, res) {
    const session = req.session;
    let data;
    schema.validate(req.body)
    .then((freshData) => {
        data = freshData;
        if (session.auth !== 'basic') throw (e_error.FORBIDDEN_AUTH);
        return UserManager.getPassword(session.username)
    })
    .then((password) => {
        return bcryptjs.compare(data.old_password, password);
    })
    .then((same) => {
        if (!same) throw e_error.BAD_CREDENTIALS;
        return bcryptjs.hash(data.new_password, bcrypt.salt)
    })
    .then((hashedPassword) => {
        return UserManager.updatePassword(session.username, hashedPassword);
    })
    .then(() => {
        res.end();
    })
    .catch((err) => {
        ErrorHandler.handleWebError(req, res, err)
    })
}

export default update_password;