import { app_42 } from "../../config"
import axios from "axios"
import { e_error } from "../constants/e_error"

const api_endpoint = 'https://api.intra.42.fr'

class Api_42 {
  static createRedirectURI() {
    return `${api_endpoint}/oauth/authorize?client_id=${app_42.client_uid}&redirect_uri=${encodeURI(app_42.redirect)}&response_type=code`
  }

  static getAccessToken(code) {
    return new Promise((resolve, reject) => {
      axios.post(`${api_endpoint}/oauth/token`, {
        grant_type: 'authorization_code',
        client_id: app_42.client_uid,
        client_secret: app_42.client_secret,
        code: code,
        redirect_uri: app_42.redirect
      })
      .then((res) => {
        resolve(res.data.access_token)
      })
      .catch((err) => {
        reject(e_error.CANNOT_GET_ACCESS_TOKEN)
      })
    })
  }

  static me(accessToken) {
    return new Promise((resolve, reject) => {
      axios.get(`${api_endpoint}/v2/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch(reject)
    })
  }
}

export { Api_42 }