import { regex } from '../../models/regex';
import { ErrorHandler } from '../ErrorHandler';
import Joi from '@hapi/joi';
import { UserManager } from '../../services/UserManager';
import { e_error } from '../../constants/e_error';
import bcryptjs from 'bcryptjs';
import config from '../../../config';
import jwt from 'jsonwebtoken';

const schema = Joi.object().keys({
    username: Joi.string().regex(regex.username).required(),
    password: Joi.string().regex(regex.password).required()
});

const login = (req, res) => {
    let data;
    schema.validate(req.body)
    .then((freshData) => {
        data = freshData;
        return UserManager.getPassword(data.username)
    })
    .then((password) => {
        return bcryptjs.compare(data.password, password);
    })
    .then((same) => {
        if (!same) throw e_error.BAD_CREDENTIALS;
        const token = jwt.sign({
            username: data.username,
            auth: 'basic'
        }, config.jwt_tokens.auth.key, {
            expiresIn: config.jwt_tokens.auth.expiry
        })
        res.json({
            token: token,
            username: data.username,
            auth: 'basic'
        });
    })
    .catch((err) => {
        ErrorHandler.handleWebError(req, res, err);
    })
}

export { login }