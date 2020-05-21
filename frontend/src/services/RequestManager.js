import axios from 'axios';
import config from '../config/Config';
import { AuthManager } from './AuthManager';
import history from '../config/history';
import { NotificationManager } from 'react-notifications';
import Language from './Language';

const _axios = axios.create();

_axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = AuthManager.getToken();
  return config;
}, (err) => {
  return Promise.reject(err);
})

const authErr = (err) => {
  if (!err.response || !err.response.status)
    return Promise.reject(err);
  if (err.response.status === 401) {
    AuthManager.disconnect();
    NotificationManager.error( Language.get('connectmsg'), Language.get('errormsg'), 1000)
    history.push('/signin');
  }
  return Promise.reject(err);
}

const RequestManager = {
  getUserProfile: (username) => {
    return _axios.get(config.profile, {
      params: {
        username: username
      }
    })
      .catch(authErr);
  },
  popular: () => {
    return _axios.get(config.popular).catch(authErr)
  },
  login: (username, password) => {
    return _axios.post(config.signin, { username, password })
      .catch(authErr)
  },
  search: (keywords, reference) => {
    console.log(keywords, reference);
    return _axios.post(config.search, {
      keywords: keywords,
      reference: reference
    })
      .catch(authErr)
  },
  askPassword: (username) => {
    return _axios.post(config.ask, { username })
      .catch(authErr);
  },
  resetPassword: (token, password) => {
    return _axios.post(config.reset, { token, password })
      .catch(authErr)
  },
  token_github: (code) => {
    return axios.get(config.token_github, {
      params: {
        code: code
      }
    })
      .catch(authErr)
  },
  token_42: (code) => {
    return axios.get(config.token_42, {
      params: {
        code: code
      }
    })
  },
  register: (values) => {
    let data = new FormData();
    data.append(`username`, values.username)
    data.append(`first_name`, values.first_name)
    data.append(`last_name`, values.last_name)
    data.append(`mail`, values.mail)
    data.append(`password`, values.password)
    data.append(`pic`, values.file)

    return _axios.post(config.signup, data)
      .catch(authErr)
  },
  updateLang: (lang) => {
    return _axios.post(config.lang, { lang })
      .catch(err => {
        NotificationManager.error(Language.get('tryagain'), Language.get('errormsg'), 1000)
      })
  },
  updateMail: (mail) => {
    return _axios.post(config.mail, { mail })
      .then(() => {
        NotificationManager.success( Language.get('infomsg'), Language.get('successmsg'), 1000)
      })
      .catch(authErr)
  },
  updatePassword: (old_password, new_password) => {
    return _axios.post(config.password, { old_password, new_password })
      .then(() => {
        NotificationManager.success( Language.get('infomsg'), Language.get('successmsg'), 1000)
      })
      .catch(authErr)
  },
  updateFullName: (first_name, last_name) => {
    return _axios.post(config.full_name, { first_name, last_name })
      .then(() => {
        NotificationManager.success( Language.get('infomsg'), Language.get('successmsg'), 1000)
      })
      .catch(authErr)
  },
  updatePicture: (picture) => {
    let data = new FormData();
    data.append(`pic`, picture)

    return _axios.post(config.pic, data)
      .then(() => {
        NotificationManager.success( Language.get('infomsg'), Language.get('successmsg'), 1000)
      })
      .catch(authErr)
  }
}

export { RequestManager }

// export function askPassword(username) {
//   return _axios.post(config.ask, { username })
//     .catch(err => { console.log(err) });
// }

// export function resetPassword(token, password) {
//   return _axios.post(config.reset, { token, password })
//     .catch(err => { console.log(err) })
// }

// export function getRegister(values) {

//   let data = new FormData();
//   data.append(`username`, values.username)
//   data.append(`first_name`, values.first_name)
//   data.append(`last_name`, values.last_name)
//   data.append(`mail`, values.mail)
//   data.append(`password`, values.password)
//   data.append(`pic`, values.file)

//   return _axios.post(config.signup, data)
//     .catch(err => { console.log(err) })
// }

export function getMovieInfo(id) {
  return _axios.get(config.movie, { params: { id } })
    .catch(authErr)
}

export function getComments(id) {
  return _axios.get(config.comments, { params: { id } })
    .catch(authErr)
}

export function postComment(id, content) {
  return _axios.post(config.comment, { id, content })
    .catch(err => { console.log(err) })
}

export function getPopular() {
  return _axios.get(config.popular)
    .catch(err => { console.log(err) })
}

export function searchMovies(keywords, reference) {
  return _axios.post(config.search, { keywords, reference })
    .catch(err => { console.log(err) })
}

export function getMoviesKeywords(keywords) {
  return _axios.post(config.search, { keywords })
    .catch(err => { console.log(err) })
}

// export function updateLang(lang) {
//   return _axios.post(config.lang, { lang })
//     .catch(err => { 
//       NotificationManager.error(tryagain[lang], errormsg[lang], 1000)
//     })
// }

// export function updateMail(mail) {
//   return _axios.post(config.mail, { mail })
//     .then(() => {
//       NotificationManager.success(infomsg[lang], successmsg[lang], 1000)
//     })
//     .catch(err => { console.log(err) })
// }

// export function updatePassword(old_password, new_password) {
//   return _axios.post(config.password, { old_password, new_password })
//     .then(() => {
//       NotificationManager.success(infomsg[lang], successmsg[lang], 1000)
//     })
//     .catch(err => { console.log(err) })
// }

// export function updateFullName(first_name, last_name) {
//   return _axios.post(config.full_name, { first_name, last_name })
//     .then(() => {
//       NotificationManager.success(infomsg[lang], successmsg[lang], 1000)
//     })
//     .catch(err => { console.log(err) })
// }

// export function updatePicture(picture) {

//   let data = new FormData();
//     data.append(`pic`, picture)

//   return _axios.post(config.pic, data)
//     .then(() => {
//       NotificationManager.success(infomsg[lang], successmsg[lang], 1000)
//     })
//     .catch(err => { console.log(err) })
// }

export function getStream(id) {
  return _axios.post(config.stream, { id })
    .catch(err => { console.log(err) })
}

// export function getAuth42(){
//     return _axios.get(config.auth_42)
//         .catch(err => { console.log(err) }) 
// }

// export function getToken42(){
//     return _axios.get(config.token_42)
//         .catch(err => { console.log(err) })
// }

// export function getAuthGithub(){
//     return _axios.get(config.auth_github)
//         .catch(err => { console.log(err) }) 
// }

// export function getTokenGithub(){
//     return _axios.get(config.token_github)
//         .catch(err => { console.log(err) })
// }