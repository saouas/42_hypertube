import Joi from '@hapi/joi';
import { e_error } from '../../../constants/e_error';
import bcryptjs from 'bcryptjs';
import { jwt_tokens, bcrypt } from '../../../../config';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../../ErrorHandler';
import { regex } from '../../../models/regex';
import { UserManager } from '../../../services/UserManager';

const schema = Joi.object().keys({
    token: Joi.string().regex(regex.jwt).required(),
    password: Joi.string().regex(regex.password).required(),
});

const reset_password = function(req, res) {
    let data;
    let token;
    schema.validate(req.body)
    .then((freshData) => {
        data = freshData;
        return bcryptjs.hash(data.password, bcrypt.salt)
    })
    .then((hashedPassword) => {
        token = jwt.verify(data.token, jwt_tokens.reset.key);
        return UserManager.updatePasswordByResetCode(token.username, token.code, hashedPassword)
    })
    .then((updated) => {
        if (!updated) throw e_error.INVALID_TOKEN;
        res.end();
    })
    .catch((err) => {
        if (err instanceof jwt.JsonWebTokenError)
            err = e_error.INVALID_TOKEN;
        ErrorHandler.handleWebError(req, res, err);
    })
}

export default reset_password