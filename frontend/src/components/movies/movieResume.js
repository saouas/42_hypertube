import React from 'react';

/* Material UI */

import Grid from '@material-ui/core/Grid';

/* Files */

import MoviePlayer from './moviesComponents/MoviePlayer.js';
import MovieInfos from './moviesComponents/MovieInfos.js';
import MovieComments from './moviesComponents/MovieComments.js';


export default function movieResume({match}) {
 const id = match.params.id
  return (
    <React.Fragment>
      <Grid container justify="center" display="flex">
        <Grid container display="flex" wrap="wrap-reverse" justify="center" spacing={1}>
          <Grid item md={7} xs={11}>
          <MoviePlayer id={id} />
          </Grid>      
          <Grid item md={4} xs={11}  >
            <MovieInfos id={id} />
          </Grid>
      </Grid>
        <Grid item xs={11}>
          <MovieComments id={id} />
        </Grid>      
      </Grid>
      <div style={{ height: '100px' }} />
    </React.Fragment>
  )
}