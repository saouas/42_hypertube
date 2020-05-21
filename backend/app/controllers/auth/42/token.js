import { regex } from "../../../models/regex";
import Joi from '@hapi/joi';
import { ErrorHandler } from "../../ErrorHandler";
import { Api_42 } from "../../../services/Api_42";
import { UserManager } from "../../../services/UserManager";
import jwt from 'jsonwebtoken';
import config from "../../../../config";
import download from "../../../services/download";

const schema = Joi.object().keys({
  code: Joi.string().regex(regex.sha256).required()
});

const createSession = (username) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({
      username: username,
      auth: '42'
    }, config.jwt_tokens.auth.key, {
      expiresIn: config.jwt_tokens.auth.expiry
    })
    resolve({
      token: token,
      username: username,
      auth: '42'
    });
  })
}

const getFreeUsername = (username, n = 0) => {
  return new Promise((resolve, reject) => {
    const prefix = n !== 0 ? n : '';
    UserManager.usernameExist(`${username}${prefix}`)
    .then((isExist) => {
      if (isExist) return getFreeUsername(username, n + 1);
      else return `${username}${prefix}`;
    })
    .then((username) => {
      resolve(username);
    })
    .catch(reject);
  })
}

const registerUser = (me) => {
  return new Promise((resolve, reject) => {
    let username;
    getFreeUsername(me.login)
    .then((usernameOut) => {
      username = usernameOut;
      return download(me.image_url, `${config.public_profile}/42_${me.id}`)
    })
    .then(() => {
      return UserManager.insert(username, me.first_name, me.last_name, `42_${me.id}`, me.email, null, me.id)
    })
    .then(() => {
      return createSession(username)
    })
    .then((out) => {
      resolve();
    })
    .catch(reject);
  })
}

const token = (req, res) => {
  let data;
  let me;
  schema.validate(req.query)
  .then((freshData) => {
    data = freshData;
    return Api_42.getAccessToken(data.code);
  })
  .then((accessToken) => {
    console.log('accessToken', accessToken);
    return Api_42.me(accessToken);
  })
  .then((meData) => {
    me = meData;
    return UserManager.exist42(me.id);
  })
  .then((user) => {
    if (user)
      return createSession(user.username)
    return registerUser(me);
  })
  .then((out) => {
    res.json(out);
  })
  .catch((err) => {
    ErrorHandler.handleWebError(req, res, err);
  })
}

export default token