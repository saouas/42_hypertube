import { e_error } from "../constants/e_error"
import multer from 'multer';
import config from "../../config";

const multer_config = {
    limits: {
        fileSize: 5000000,
    },
    fileFilter: (req, file, cb) => {
        if (!['image/jpeg'].includes(file.mimetype)) {
            return cb(new Error('Wrong file type'));
        }
        cb(null, true)
    }
}

/**
 * Config multer upload showcase pic
 */
const config_profile_pic = multer({
  dest: config.public_profile,
  ...multer_config
})
const upload_profile_func = config_profile_pic.single('pic');

const UploadService = {
  uploadOne(req, uploader) {
    return new Promise((resolve, reject) => {
      uploader(req, null, (err) => {
        if (err || !req.file)
          return reject(e_error.INVALID_FILE);
        resolve(req.file);
      })
    })
  },

  uploadPic(req) {
    return UploadService.uploadOne(req, upload_profile_func);
  }
}

export { UploadService }