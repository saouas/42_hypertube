import { app_github } from "../../config"
import axios from "axios"
import { e_error } from "../constants/e_error"

const api_endpoint_authorize = 'https://github.com'
const api_endpoint = 'https://api.github.com'

class Api_github {
  static createRedirectURI() {
    return `${api_endpoint_authorize}/login/oauth/authorize?client_id=${app_github.client_uid}&redirect_uri=${encodeURI(app_github.redirect)}`
  }

  static getAccessToken(code) {
    return new Promise((resolve, reject) => {
      axios.post(`${api_endpoint_authorize}/login/oauth/access_token`, {
        client_id: app_github.client_uid,
        client_secret: app_github.client_secret,
        code: code
      }, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then((res) => {
        resolve(res.data.access_token);
      })
      .catch(() => {
        reject(e_error.CANNOT_GET_ACCESS_TOKEN);
      });
    })
  }

  static me(accessToken) {
    return new Promise((resolve, reject) => {
      axios.get(`${api_endpoint}/user`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}

export { Api_github }