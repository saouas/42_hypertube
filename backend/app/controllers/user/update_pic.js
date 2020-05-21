import Joi from '@hapi/joi';
import { regex } from '../../models/regex';
import { e_error } from '../../constants/e_error';
import { ErrorHandler } from '../ErrorHandler';
import { UserManager } from '../../services/UserManager';
import { UploadService } from '../../services/UploadService';
import { FileService } from '../../services/FileService';
import config from '../../../config';

const update_pic = function(req, res) {
    const session = req.session;
    let file;
    UploadService.uploadPic(req)
    .then((newFile) => {
        file = newFile;
        return UserManager.updatePic(session.username, file.filename)
    })
    .then((lastPic) => {
        return FileService.try_to_delete(`${config.public_profile}/${lastPic}`);
    })
    .then(() => {
        res.json().end();
    })
    .catch((err) => {
        if (file)
            FileService.try_to_delete(file.path);
        ErrorHandler.handleWebError(req, res, err)
    })
}

export default update_pic;