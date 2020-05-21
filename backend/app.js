import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import deletion from "./app/tasks/deletion";
import { SearchService } from "./app/services/SearchService";

// Database

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false)
mongoose.connect(config.mongoose, { useNewUrlParser: true, useUnifiedTopology: true });
// Web server

const listening_port = config.express.port;

const app = express();

// cors (cross-origin resource sharing)
app.use(cors());

// parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb' }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.enable('trust proxy')

const server = app.listen(listening_port, () => {
  console.log(`currently listening on ${listening_port}`)
});

const router = require('./app/router').default;
// use routes in app
app.use(router());

deletion();


SearchService.popular()
  .then(() => {
    console.log('get popular movies fetched');
  }) 