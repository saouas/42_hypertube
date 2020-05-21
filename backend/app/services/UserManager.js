import UserSchema from '../models/mongoose/User';
import { e_error } from '../constants/e_error';

class UserManager {
  static insert(username, first_name, last_name, profile_pic, mail, password, id_42, github_id) {
    return new Promise((resolve, reject) => {
      const user = new UserSchema({
        username: username,
        first_name: first_name,
        last_name: last_name,
        profile_pic: profile_pic,
        mail: mail,
        password: password,
        id_42: id_42,
        github_id: github_id
      })
      user.save()
        .then(() => {
          resolve();
        })
        .catch(reject)
    })
  }

  static usernameExist(username) {
    return new Promise((resolve, reject) => {
      UserSchema.findOne({ username: username }, 'username')
      .then((_doc) => {
        const res = _doc ? true : false;
        resolve(res);
      })
      .catch(reject)
    })
  }

  static exist42(id) {
    return new Promise((resolve, reject) => {
      UserSchema.findOne({ id_42: id }, 'username')
      .then((_doc) => {
        resolve(_doc);
      })
      .catch(reject);
    })
  }

  static existGithub(id) {
    return new Promise((resolve, reject) => {
      UserSchema.findOne({ github_id: id }, 'username')
      .then((_doc) => {
        resolve(_doc);
      })
      .catch(reject);
    })
  }

  static mailExist(mail) {
    return new Promise((resolve, reject) => {
      UserSchema.findOne({ mail: mail }, 'mail')
      .then((_doc) => {
        const res = _doc ? true : false;
        resolve(res);
      })
      .catch(reject)
    })
  }

  static getPassword(username) {
    return new Promise((resolve, reject) => {
      UserSchema.findOne({ username: username }, 'username password')
      .then((_doc) => {
        if (!_doc || !_doc.password) throw e_error.BAD_CREDENTIALS;
        resolve(_doc.password);
      })
      .catch(reject)
    })
  }

  static updateLang(username, lang) {
    return new Promise((resolve, reject) => {
      UserSchema.updateOne({ username: username }, { lang: lang })
      .then(() => {
        resolve();
      })
      .catch(reject);
    })
  }

  static updateMail(username, mail) {
    return new Promise((resolve, reject) => {
      UserSchema.updateOne({ username: username }, { mail: mail} )
      .then(() => {
        resolve();
      })
      .catch(reject);
    })
  }

  static updatePassword(username, password) {
    return new Promise((resolve, reject) => {
      UserSchema.updateOne({ username: username }, { password: password })
      .then(() => {
        resolve();
      })
      .catch(reject);
    })
  }

  static updateFullname(username, first_name, last_name) {
    return new Promise((resolve, reject) => {
      UserSchema.updateOne({ username: username }, { first_name: first_name, last_name: last_name })
      .then(() => {
        resolve();
      })
      .catch(reject);
    })
  }

  static updatePic(username, pic) {
    return new Promise((resolve, reject) => {
      UserSchema.findOneAndUpdate({ username: username }, { profile_pic: pic })
      .then((_doc) => {
        if (_doc)
          return resolve(_doc.profile_pic);
        resolve()
      })
      .catch(reject);
    })
  }

  static getForReset(username) {
    return new Promise((resolve, reject) => {
      UserSchema.findOne({ username: username }, 'mail id_42 github_id username')
      .then((_doc) => {
        resolve(_doc);
      })
      .catch(reject)
    })
  }

  static setReset(username, code) {
    return new Promise((resolve, reject) => {
      UserSchema.updateOne({ username: username }, { reset_code: code })
      .then(() => {
        resolve();
      })
      .catch(reject);
    })
  }

  static updatePasswordByResetCode(username, code, password) {
    return new Promise((resolve, reject) => {
      UserSchema.updateOne({ username: username, reset_code: code }, { password: password, $unset : { reset_code: '' } })
      .then((_doc) => {
        resolve(_doc.nModified)
      })
      .catch(reject)
    })
  }

  static getUser(username) {
    return new Promise((resolve, reject) => {
      UserSchema.findOne({ username: username }, 'username first_name last_name profile_pic lang')
      .then((_doc) => {
        resolve(_doc);
      })
      .catch(reject)
    })
  }
}

export { UserManager }