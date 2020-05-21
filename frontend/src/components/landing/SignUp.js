import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useForm from "react-hook-form";
import { regex } from '../tools/regex.js';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import { useStyles } from '../../style/globalstyle';
import Language from '../../services/Language';
import Background from '../layout/Background';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChangeLang from '../tools/ChangeLang';
import { CssTextField } from '../../style/CssTextField';
import { makeStyles } from '@material-ui/core/styles';
import { RequestManager } from '../../services/RequestManager';
import rout from '../../config/history';
import { NotificationManager } from 'react-notifications';

const useStyleBackground = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "white",
    margin: "auto",
    width: "150px",
    height: '150px',
    borderRadius: "50%",
    cursor: "pointer",
    '&:hover': {
      transition: ".5s ease",
      opacity: "0.6",
    }
  },
  imageUpload: {
    display: "none",
  }
}));

export default function SignUp() {    
  const localStyle = useStyleBackground();
  const classes = useStyles();

  const { handleSubmit, register, errors } = useForm(); 
  let disabled = Object.keys(errors).length ? true : false

  const [uploadPicture, setUploadPicture] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setUploadPicture(file)
  }

  const onSubmit = values => {
    values.file = uploadPicture;
    values.username = values.username.toLowerCase();
    values.first_name = values.first_name.toLowerCase();
    values.last_name = values.last_name.toLowerCase();
    RequestManager.register(values)
    .then(() => {
      NotificationManager.success( Language.get('signupmsg'), Language.get('successmsg'), 1000);
      rout.push('/signin')
    })
  };

  return (
    <React.Fragment>
      <Background/>
      <ChangeLang/>
      <CssBaseline/>
      <Paper className={ classes.signup }  component="main">
        <Typography component="h1" variant="h5">
          { Language.get('signup') }
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CssTextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                inputRef={register({
                    required: 'Required',
                    minLength: {
                      value: 2,
                      message: 'Please min 2 chars'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Please max 20 chars'
                    }
                  })
                }
                fullWidth
                id="firstName"
                label={  Language.get('firstname') }
                autoFocus
              />
              {errors.firstName && <span style={{color: 'red'}}> 
                  {errors.firstName.message} </span>
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <CssTextField
                variant="outlined"
                inputRef={register({
                    required: 'Required',
                    minLength: {
                      value: 2,
                      message: 'Please min 2 chars'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Please max 20 chars'
                    }
                  })
                }
                fullWidth
                id="lastName"
                label={  Language.get('lastname') }
                name="last_name"
                autoComplete="lname"
              />
              {errors.lastName && <span style={{color: 'red'}}> 
                  {errors.lastName.message} </span>
              }
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                inputRef={register({
                    required: 'Required',
                    minLength: {
                      value: 3,
                      message: 'Please min 3 chars'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Please max 20 chars'
                    }
                  })
                }
                fullWidth
                id="username"
                label={  Language.get('username') }
                name="username"
                autoComplete="username"
              />
              {errors.username && <span style={{color: 'red'}}> 
                  {errors.username.message} </span>
              }
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                inputRef={register({
                    required: 'Required',
                    pattern: {
                      value: regex.mail,
                      message: "Invalid email address"
                    }
                  })
                }
                fullWidth
                id="email"
                label={ Language.get('mail') }
                name="mail"
                autoComplete="email"
              />
              {errors.email && <span style={{color: 'red'}}> 
                  {errors.email.message} </span>
              }
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                inputRef={register({
                    required: 'Required',
                    pattern: {
                      value: regex.password,
                      message: 'Password must have 1 lower case 1 upper case 1 number 1 special charac'
                    },
                    minLength: {
                      value: 8,
                    message: 'Please min 8 chars'
                    }
                  })
                }
                fullWidth
                name="password"
                label={  Language.get('password') }
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors.password && <span style={{color: 'red'}}> 
                  {errors.password.message} </span>
              }
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="file-input" >
                <div className={localStyle.container}>
                  <img 
                    src={uploadPicture ? URL.createObjectURL(uploadPicture) : 'images/default_avatar.png'}
                    id="avatar"
                    className={localStyle.avatar} 
                    alt="avatar" />
                </div>        
              </label>
              <input
                variant="outlined"
                type="file"
                id="file-input"
                name="file"
                onChange={handleChange}
                className={localStyle.imageUpload}
              />
            </Grid>
          </Grid>
          <Button
            disabled={disabled}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.editsubmit}>
             { Language.get('submit') }
            </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">
                <Button align='right' color='default' style={{color: "white"}}>
                { Language.get('already') }? {  Language.get('signin') }
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <div className={ classes.endmargin } />
    </React.Fragment>
  );
}