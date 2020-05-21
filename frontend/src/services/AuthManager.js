import { NotificationManager } from "react-notifications";
import history from "../config/history";
import Language from "./Language";
import store from "../store/store";
import { setLogged } from "../actions/user";

// import store from '../store/store'
// import { setLogged } from '../actions/user';
let logged = false;

if (localStorage.getItem('token')) {
    logged = true;
    store.dispatch(setLogged(true))
}

const isLogged = () => {
    return logged;
}

let token;
const getToken = () => { 
    if (!token)
        token = localStorage.getItem('token');
    return token;
}

let username;
const getUsername = () => {
    if (!username)
        username = localStorage.getItem('username');
    return username;
}

const setAsLogged = (user) => {
    logged = true;
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('auth', user.auth);
    token = user.token;
    username = user.username;
    type = user.auth;
    NotificationManager.info(`${Language.get('welcome')} ${user.username}`, '', 2000)
    store.dispatch(setLogged(true))
    history.push('/search')
}

let type;
const getType = () => {
    if (!type)
        type = localStorage.getItem('auth');
    return type;
}
const disconnect = () => {
    logged = false;
    username = undefined;
    token = undefined;
    localStorage.clear();
    store.dispatch(setLogged(false))
}

export const AuthManager = {
    isLogged,
    setAsLogged,
    getToken,
    getUsername,
    getType,
    disconnect
}
