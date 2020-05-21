import React from 'react';
import { Link } from 'react-router-dom';
import useForm from "react-hook-form";
import { Grid, Typography, Paper, Button, CssBaseline } from '@material-ui/core';
import { useStyles } from '../../style/globalstyle';
import Language from '../../services/Language';
import Background from '../layout/Background';
import ChangeLang from '../tools/ChangeLang';
import { CssTextField } from '../../style/CssTextField';
import { RequestManager } from '../../services/RequestManager';
import { AuthManager } from '../../services/AuthManager';
import { NotificationManager } from 'react-notifications';

export default function SignIn() {

  const classes = useStyles();

  const { handleSubmit, register, errors } = useForm();
  let disabled = Object.keys(errors).length ? true : false

  const onSubmit = values => {
    RequestManager.login(values.username, values.password)
      .then((res) => {
        const { data } = res;
        AuthManager.setAsLogged(data);
      })
      .catch(() => {
        NotificationManager.warning(Language.get('wrongauth'), Language.get('oups'), 1000)
      })
  }

  return (
    <>
      <Background />
      <ChangeLang />
      <Paper className={classes.signin} component="main">
        <CssBaseline />
        <Typography component="h1" variant="h5" className={classes.whiteLink} >
          {Language.get('signin')}
        </Typography>
        <form className={classes.editform} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                fullWidth
                id="username"
                label={Language.get('username')}
                name="username"
                autoComplete="username"
                inputRef={register({
                  required: 'Required',
                })
                }
              />
              {errors.username && <span style={{ color: 'red' }}>
                {errors.username.message} </span>
              }
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                fullWidth
                name="password"
                label={Language.get('password')}
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({
                  required: 'Required',
                })
                }
              />
              {errors.password && <span style={{ color: 'red' }}>
                {errors.password.message} </span>
              }
            </Grid>
          </Grid>
          <Button
            disabled={disabled}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.editsubmit}>
            {Language.get('submit')}
          </Button>
        </form>

        <Link to='/signup'><Button className={classes.whiteLink} align='right' color='default'>{Language.get('signup')}?</Button></Link>
        <Link to='/forget'><Button className={classes.whiteLink} align='right' color='default'>{Language.get('forget')}?</Button></Link>
        <Button
          onClick={() => window.location.href = "http://localhost:8080/auth/42/authorize"}
          fullWidth
          variant="contained" className={classes.button}
          data-provider="42"
          // data-oauthserver="https://www.facebook.com/v2.0/dialog/oauth" 
          data-oauthversion="2.0">
          <img
            style={{ height: "30px" }}
            src="http://localhost:3000/images/42.svg"
            alt="Connect with 42" />
        </Button>
          <Button
            onClick={() => window.location.href = "http://localhost:8080/auth/github/authorize"}
            fullWidth
            variant="contained" className={classes.button}
            data-provider="github"
            data-oauthversion="2.0">
            <img
              style={{ height: "30px" }}
              src="http://localhost:3000/images/github.png"
              alt="Connect with Github" />
          </Button>
      </Paper>
      <div className={classes.endmargin} />
    </>
  );
}
