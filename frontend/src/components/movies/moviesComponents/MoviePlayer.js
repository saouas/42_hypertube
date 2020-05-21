import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'

/* Material UI */

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Language from '../../../services/Language';

const styles = makeStyles(theme => ({
  paper: {
    marginTop: "100px",
    padding: "30px",
    backgroundColor: "black"
  },
  title: {
    color: "white"
  }

}));

export default function MovieResume(props) {
  let id = props.id;
  let link = "http://localhost:8080/stream?id=" + id;
  const classes = styles();
  const [subtitles, setSubtitles] = useState([]);
  const [requestFinished, setRequestFinished] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/stream/subtitles/list?id=${id}`)
      .then((res) => {
        console.log(res.data);
        setSubtitles(res.data.languages)
        setRequestFinished(true);
      })
      .catch(console.log)
  }, [id])


  if (!requestFinished)
    return (null);

  return (
    <Paper className={classes.paper} elevation={20} >
      <h1 className={classes.title}>{Language.get('player')}</h1>
      <div className='player-wrapper'>
        <ReactPlayer
          url={[link]}
          className='react-player'
          controls
          playing
          width='100%'
          height='100%'
          config={{
            file: {
              attributes: {
                crossOrigin: 'true'
              },
              tracks: subtitles.map((lang) => {
                return { kind: 'subtitles', src: `http://localhost:8080/stream/subtitles?id=${id}&lang=${lang}`, srcLang: lang }
              })
            }
          }}
        />
      </div>
      <style>{`
      .player-wrapper {
        position: relative;
        padding-top: 42.5%;
      }
      
      .react-player {
        position: absolute;
        top: 0;
        left: 0;
      }
      `}
      </style>
    </Paper>
  )
}