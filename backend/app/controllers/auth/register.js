import { regex } from '../../models/regex';
import { ErrorHandler } from '../ErrorHandler';
import Joi from '@hapi/joi';
import { UserManager } from '../../services/UserManager';
import { e_error } from '../../constants/e_error';
import bcryptjs from 'bcryptjs';
import config from '../../../config';
import { UploadService } from '../../services/UploadService';
import { FileService } from '../../services/FileService';

const schema = Joi.object().keys({
    username: Joi.string().regex(regex.username).required(),
    mail: Joi.string().regex(regex.mail).required(),
    first_name: Joi.string().regex(regex.first_name).required(),
    last_name: Joi.string().regex(regex.last_name).required(),
    password: Joi.string().regex(regex.password).required()
});

export const register = (req, res) => {
    let data;
    let file;
    UploadService.uploadPic(req)
    .then((val) => {
        file = val;
        return schema.validate(req.body)
    })
    .then((freshData) => {
        data = freshData;
        return UserManager.usernameExist(data.username);
    })
    .then((exist) => {
        if (exist) throw (e_error.USERNAME_EXIST);
        return UserManager.mailExist(data.mail)
    })
    .then((exist) => {
        if (exist) throw (e_error.MAIL_EXIST);
        return bcryptjs.hash(data.password, config.bcrypt.salt)
    })
    .then((hashedPassword) => {
        return UserManager.insert(data.username, data.first_name, data.last_name, file.filename, data.mail, hashedPassword)
    })
    .then(() => {
        res.json().end();
    })
    .catch((err) => {
        if (file)
            FileService.try_to_delete(file.path)
        ErrorHandler.handleWebError(req, res, err);
    })
}