import React from 'react';
import { Grid } from '@material-ui/core';
import notFound from '../../../images/notfound.jpg';

const classes = {
  genres: {
    margin: '5px',
    padding: '10px 15px',
    color: 'white',
    backgroundColor: 'red',
    borderRadius: '30px',
    display: 'inline-block'
  },
  rating: {
    textAlign: 'right'
  },
  image: {
    textAlign: 'center'
  },
  title: {
    textAlign: 'center'
  },
  genresContainer: {
    textAlign: 'center'
  },
  watched: {
    height: '15px',
    width: '15px',
    padding: '2px',
    borderRadius: '50%',
    border: 'none',
  }
}

export function OneMovie(movie) {
  const watched = (movie.watched ? 'orange' : 'green')
  const watchedStyle = Object.assign({}, classes.watched, { backgroundColor: watched });
  const banner = movie.banner ? movie.banner : notFound
  console.log(banner)
  return (
    <Grid key={movie._id} item xs={12} lg={4}>
      <p style={classes.title}>{movie.title} &nbsp;({movie.year})</p>
      <div style={watchedStyle}/>
      <div style={classes.image}>
        <a href={`/movie/${movie._id}`} style={{width: '100%'}}>
          <img
            src={banner}
            alt={movie.title}
            style={{width: '100%'}}
          />
        </a>
      </div>
      <Grid container>
        <Grid item xs={6}>
          <h3>{movie.seeds} Seeds &nbsp;</h3>
        </Grid>
        <Grid item xs={6} style={classes.rating}>
          <h3>{movie.rating ? `${movie.rating}/10` : 'N/A'}</h3>
        </Grid>
      </Grid>
      <div style={classes.genresContainer}>
        {
          movie.genres.map((elem) => {
            return (
              <div key={elem} style={classes.genres}>
                {elem}
              </div>
            )
          })
        }
      </div>
    </Grid>
  )
}