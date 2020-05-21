import { ErrorHandler } from "../ErrorHandler"
import Joi from '@hapi/joi';
import { SearchService } from "../../services/SearchService";
import { MovieManager } from "../../services/MovieManager";

const schema = Joi.object().keys({
  keywords: Joi.string().min(1).max(40).required(),
  reference: Joi.string().min(1).max(50).optional()
});

const continue_search = function(keywords) {
  SearchService.movies(keywords, 2)
  .then(() => SearchService.movies(keywords, 3))
}

const search = function (req, res) {
  const session = req.session;
  let data;
  schema.validate(req.body)
    .then((freshData) => {
      data = freshData;
      if (!data.reference)
        return SearchService.movies(data.keywords, 1, session.username)
      else
        return MovieManager.getMoviesKeywordsIndex(data.keywords, session.username, data.reference);
    })
    .then((movies) => {
      console.log('response')
      movies = movies.map((el) => {
        if (!el.seeds)
          el.seeds = 0;
        return el;
      })
      res.json({
        count: movies.length,
        movies: movies
      });
    })
    .catch((err) => {
      ErrorHandler.handleWebError(req, res, err);
    })
    .catch((err) => console.log(err))
}

export default search;