import Joi from '@hapi/joi';
import { SearchService } from "../../services/SearchService";
import { MovieManager } from "../../services/MovieManager";
import { ErrorHandler } from '../ErrorHandler';
import { StreamingService } from '../../services/StreamingService';
import trackers from '../../constants/trackers';

const schema = Joi.object().keys({
  id: Joi.string().min(1).max(40).required()
});

const stream = function(req, res) {
  let data;
  schema.validate(req.query)
  .then((freshData) => {
    data = freshData;
    return MovieManager.getMovieHash(data.id);
  })
  .then((movie) => {
    let torrent = movie.torrent;
    if (!torrent.includes('magnet'))
      torrent = `magnet:?xt=urn:btih:${torrent}&dn=${encodeURI(movie.title)}${trackers.map((el) => `&tr=${el}`).join('')}`;
    StreamingService.stream(torrent, req.headers.range, data.id, res)
  })
  .catch((err) => {
    ErrorHandler.handleWebError(req, res, err);
  })
}

export default stream;