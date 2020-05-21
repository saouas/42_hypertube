import { MovieManager } from "../../services/MovieManager"
import { ErrorHandler } from "../ErrorHandler"
import { SearchService } from "../../services/SearchService";

/*
SearchService.popular()
.then(() => {
  console.log('get popular movies fetched');
}) */

const popular = function(req, res) {
  const session = req.session;
  MovieManager.getPopularMovies(session.username)
  .then((movies) => {
    const data = {
      count: movies.length,
      movies: movies
    }
    res.json(data);
  })
  .catch((err) => {
    ErrorHandler.handleWebError(req, res, err);
  })
}

export default popular;