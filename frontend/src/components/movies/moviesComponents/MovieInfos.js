import React, { useState, useEffect } from 'react';
// import { Player, BigPlayButton } from 'video-react';
import { getMovieInfo } from '../../../services/RequestManager';

/* Material UI */

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Language from '../../../services/Language';

const styles = makeStyles(theme => ({
	paper: {
		marginTop: "100px",
		padding: "30px",
		backgroundColor: "black",
	},
	title: {
		color: "white"
	},
	poster: {
		maxWidth: "100%"
	},
	infos: {
		'& p, span': {
			color: "white",
			fontSize: "20px",
		},
		paddingBottom: "20px",
		textAlign: 'left'
	},
	metascore: {
		width: "85px",
		height: "50px",
		borderRadius: "10px",
		textAlign: "center",
		verticalAlign: "middle",
		lineHeight: "50px",
		color: "white",
		fontSize: "22px",
		fontStyle: "bold"
	},

}));


export default function MovieResume(props) {
	let id = props.id;
	useEffect(() => {
		const loadMovieInfo = () => {
			getMovieInfo(id)
				.then((res) => {
					const data = res.data[0];
					const title = data.title;
					const rating = data.rating; //need to update
					const actors = data.actors;
					const writer = data.writer;
					const director = data.director;
					const runtime = data.runtime; //need to update
					const genres = data.genres;
					const banner = data.banner;
					const year = data.year;
					const synopsis = data.synopsis;
					setImdb({
						title: title,
						rating: rating,
						actors: actors,
						writer: writer,
						director: director,
						runtime: runtime,
						genres: genres,
						banner: banner,
						year: year,
						synopsis: synopsis
					})
				})
		}
		loadMovieInfo();
	}, [id])

	const classes = styles();
	const [imdb, setImdb] = useState({
		title: 'titre',
		rating: '75',
		actors: [],
		writer: [],
		director: [],
		runtime: 61,
		genres: [],
		banner: 'http://localhost:3000/images/image_test_film.jpg',
		year: 2019,
		synopsis: 'Lorem ipsum etc'
	});


	let colorScore;
	if (imdb.rating >= 7.5) {
		colorScore = "#6c3"
	} else if (imdb.rating >= 5) {
		colorScore = "#fc3"
	} else {
		colorScore = "#f00"
	}

	return (
		<Paper elevation={20} className={classes.paper}>
			<div>
				<h1 className={classes.title}>{imdb.title}</h1>
				<img
					className={classes.poster}
					src={imdb.banner}
					alt=""
				/>
				<hr />
			</div>
			<div className={classes.infos}>
				<p>{Language.get('synopsis')}: {imdb.synopsis}</p>
				<p>{Language.get('pdtyear')}: {imdb.year}</p>
				<p>Runtime : {imdb.runtime}</p>
				<p>{Language.get('actors')}: {imdb.actors.map((el) => el.trim()).join(', ')}</p>
				<p>{Language.get('director')}: {imdb.director.map((el) => el.trim()).join(', ')}</p>
				<p>{Language.get('writer')}: {imdb.writer.map((el) => el.trim()).join(', ')}</p>
				<span>Metascore:</span>
				<div
					style={{ backgroundColor: colorScore, margin: "auto" }}
					className={classes.metascore}>
					{imdb.rating}/10
				</div>
			</div>
		</Paper>
	)
}