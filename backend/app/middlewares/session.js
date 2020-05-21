import config from '../../config';
import jwt from 'jsonwebtoken';
import { regex } from '../models/regex';

const jwtRegex = new RegExp(regex.jwt);

/**
 * middleware require a session token
 */
export let session = (req, res, next) => {
    const tokenHeader = req.get('Authorization');
    let session = {};
    Promise.resolve()
    .then(() => {
        if (!tokenHeader && !jwtRegex.test(tokenHeader))
            throw new Error('user not connected');
    })
    .then(() => {
        const token = jwt.verify(tokenHeader, config.jwt_tokens.auth.key);
        return token;
    })
    .then((token) => {
        session.username = token.username;
        session.auth = token.auth;
        req.session = session;
        next();
    })
    .catch((err) => {
        console.log(err.message);
        res.status(401).end();
    });
}