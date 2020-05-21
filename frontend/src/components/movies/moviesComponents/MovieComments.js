import React, { useState, useEffect } from 'react';
import { getComments, postComment } from '../../../services/RequestManager';
/* Material UI */

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { CssTextField } from '../../../style/CssTextField';
import Language from '../../../services/Language';

const styles = makeStyles(theme => ({
  paper: {
    marginTop: "10px",
    padding: "30px",
    backgroundColor: "black"
  },
  title: {
    color: "white",
  },
  commentInput: {
    margin: "25px 0 12px 0",
    width: "70%",
    color: 'white'
  },
  editsubmit: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    color: "white",
    fontSize: "18px",
    fontStyle: "bold",
    backgroundColor: "#bf1b2b",
    width: "70%",
    '&:hover': {
      backgroundColor: "#d40f0f",
      transition: ".5s ease",
    }
  },
  paperComment: {
    width: "80%",
    margin: "5px auto",
    padding: "15px",
    backgroundColor: "#2C2C2C",
    color: "white",
    textAlign: 'left'
  },
  infoComment: {
    marginTop: "0",
    fontSize: "15px",
    fontStyle: "italic",
    textAlign: "left",
  }
}));

export default function MovieResume(props) {
  let id = props.id;
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);

  const loadMovieComments = (id) => {
    getComments(id)
      .then((res) => {
        setComments(res.data);
      })
  }

  const sendMovieComment = (id, content) => {
    postComment(id, content)
      .then((res) => {
        setComments([{
          username: localStorage.getItem('username'),
          date: Date.now(),
          content: content
        }, ...comments])
      })
      .catch(console.log)
  }

  useEffect(() => {
    loadMovieComments(id)
  }, [id])

  const classes = styles();

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMovieComment(id, comment);
    setComment("");
  }

  const printComments = () => {
    return (
      <div>
        {comments.map(item => {
          let date = new Date(item.date);
          date = date.toDateString();
          return (
            <Paper className={classes.paperComment} key={item.date}>
              <div className={classes.comment}>
                <p className={classes.infoComment}>{item.username} {date}</p>
                <p>{item.content}</p>
              </div>
            </Paper>)
        })}
      </div>)
  }

  useEffect(() => {
    console.log('test')
  }, [])

  return (
    <Paper className={classes.paper} elevation={20} >
      <h1 className={classes.title}>{Language.get('comment')}</h1>
      <div className={classes.divForm}>
        <form className={classes.commentForm} onSubmit={handleSubmit}>
          <CssTextField
            variant="outlined"
            className={classes.commentInput}
            name="comment_content"
            label={Language.get('leavecomment')}
            value={comment}
            onChange={handleChange}
            required
          />
          <Button
            disabled={!comment}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.editsubmit}
          >
            {Language.get('submit')}
        </Button>
        </form>
      </div>
      <div className={classes.commentsList}>
        {printComments()}
      </div>
    </Paper>
  )
}