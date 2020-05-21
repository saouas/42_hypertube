export const express = {
    port: 8080
}

export const web_app = {
    domain: process.env.WEB_DOMAIN || 'localhost:3000',
    protocol: 'http'
}

export const mongoose = 'mongodb://localhost/hypertube'

export const bcrypt = {
    salt: 11
}

export const jwt_tokens = {
    auth: {
        key: 'AUTH_KEY',
        expiry: '24h'
    },
    reset: {
        key: 'RESET_KEY',
        expiry: '1h'
    }
}

export const app_42 = {
    client_uid: process.env.CLIENT_UID_42,
    client_secret: process.env.CLIENT_SECRET_42,
    redirect: 'http://localhost:3000/auth/42/token'
}

export const app_github = {
    client_uid: process.env.CLIENT_UID_GITHUB,
    client_secret: process.env.CLIENT_SECRET_GITHUB,
    redirect: 'http://localhost:3000/auth/github/token'
}

export const public_profile = __dirname + '/public/profile'

export const subtitles_directory = __dirname + '/tmp/subtitles';

export const temp_directory = __dirname + '/tmp';

export const omdb_api_key = process.env.OMDB_KEY;

export const mail = {
    host: process.env.MAIL_HOST || 'smtp.sendgrid.net',
    port: 587,
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
}

export const mail_sender = process.env.MAIL_SENDER;

export const torrent_options = {
    connections: 100,     // Max amount of peers to be connected to.
    uploads: 10,
    tmp: __dirname + '/tmp',
    path: __dirname + '/tmp/files'
}

export const os = {
    username: process.env.OS_USERNAME,
    password: process.env.OS_PASSWORD
}

export default {
    express,
    mongoose,
    bcrypt,
    jwt_tokens,
    app_42,
    app_github,
    public_profile,
    omdb_api_key,
    mail,
    web_app,
    subtitles_directory,
    temp_directory,
    os
}