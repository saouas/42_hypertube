import Joi from '@hapi/joi';
import { ErrorHandler } from '../../ErrorHandler';
import uuid from 'uuid/v4'
import { regex } from '../../../models/regex';
import { UserManager } from '../../../services/UserManager';
import { MailService } from '../../../services/MailService';
import jwt from 'jsonwebtoken';
import { jwt_tokens } from '../../../../config';

const schema = Joi.object().keys({
    username: Joi.string().regex(regex.username).required()
});

const reset_way = (user, data) => {
    return new Promise((resolve, reject) => {
        const resetCode = uuid();
        UserManager.setReset(data.username, resetCode)
        .then(() => {
            return UserManager.setReset(data.username, resetCode)
        })
        .then(() => {
            const content = { username: user.username, code: resetCode }
            const options = { expiresIn: jwt_tokens.reset.expiry };
            const token = jwt.sign(content, jwt_tokens.reset.key, options)
            return MailService.ask_reset_password(user.mail, user.username, token);
        })
        .then(() => {
            resolve();
        })
        .catch(reject);
    })
}

const ask_password = function(req, res) {
    let data;
    schema.validate(req.body)
    .then((freshData) => {
        data = freshData;
        return UserManager.getForReset(data.username)
    })
    .then((user) => {
        if (!user) return ;
        if (user.github_id) return ;
        if (user.id_42) return ;
        return reset_way(user, data)
    })
    .then(() => {
        res.end();
    })
    .catch((err) => {
        ErrorHandler.handleWebError(req, res, err);
    })
}

export default ask_password