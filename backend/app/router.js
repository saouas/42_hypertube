import express from 'express';
import { register } from './controllers/auth/register';
import { login } from './controllers/auth/login';
import authorize_42 from './controllers/auth/42/authorize';
import token_42 from './controllers/auth/42/token';
import github_authorize from './controllers/auth/github/authorize';
import github_token from './controllers/auth/github/token';
import { session } from './middlewares/session';
import update_lang from './controllers/user/update_lang';
import update_mail from './controllers/user/update_mail';
import update_password from './controllers/user/update_password';
import update_fullname from './controllers/user/update_fullname';
import { http_log } from './middlewares/http_log';
import ask_password from './controllers/auth/forgot/ask_password';
import reset_password from './controllers/auth/forgot/reset_password';
import get_user from './controllers/user/get_user';
import search from './controllers/movies/search';
import movie from './controllers/movies/movie';
import comment from './controllers/movies/comment';
import comments from './controllers/movies/comments';
import popular from './controllers/movies/popular';
import update_pic from './controllers/user/update_pic';
import stream from './controllers/movies/stream';
import subtitles from './controllers/movies/list_subtitles';
import list_subtitles from './controllers/movies/list_subtitles';
import get_subtitles from './controllers/movies/get_subtitles';

class Router {

	static user() {
		let router = express.Router();
		router.use('/', session);
		router.post('/lang', update_lang)
		router.post('/mail', update_mail);
		router.post('/password', update_password)
		router.post('/full_name', update_fullname)
		router.get('/get', get_user);
		router.post('/pic', update_pic);
		console.log('user route..');
		return router;
	}

	static auth() {
		let router = express.Router();
		console.log('auth routes..');
		router.post('/basic/register', register);
		router.post('/basic/login', login)
		router.get('/42/authorize', authorize_42);
		router.get('/42/token', token_42);
		router.get('/github/authorize', github_authorize);
		router.get('/github/token', github_token);
		router.post('/forgot/ask_password', ask_password);
		router.post('/forgot/reset_password', reset_password);
		return router;
	}

	static movies() {
		let router = express.Router();
		router.use('/', session);
		router.post('/search', search);
		router.get('/movie', movie);
		router.post('/comment', comment);
		router.get('/comments', comments);
		router.get('/popular', popular);
		return router;
	}

	static stream() {
		let router = express.Router();
		router.get('/', stream)
		router.get('/subtitles/list', list_subtitles);
		router.get('/subtitles', get_subtitles)
		return router;
	}

	static getRouter() {
		console.log('initialize router..');
		let router = express.Router();

		router.use('/', http_log);
		router.use('/auth/', Router.auth());
		router.use('/user/', Router.user());
		router.use('/movies', Router.movies());
		router.use('/stream', Router.stream());

        console.log('end routing operations..');
		return router;
	}
}

export default Router.getRouter;