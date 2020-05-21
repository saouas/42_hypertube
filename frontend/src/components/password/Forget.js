import React from 'react';
import useForm from "react-hook-form";
import { Grid, Typography, Paper, Button, CssBaseline } from '@material-ui/core';
import { useStyles } from '../../style/globalstyle';
import Language from '../../services/Language';
import ChangeLang from '../tools/ChangeLang';
import Background from '../layout/Background';
import { CssTextField } from '../../style/CssTextField';
import { RequestManager } from '../../services/RequestManager';
import rout from '../../config/history';
import { NotificationManager } from 'react-notifications';
import { regex } from '../tools/regex';

export default function Forget() {
  const classes = useStyles();

  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    if (!regex.username.test(values.username))
      NotificationManager.error('Nom d\'utilisateur invalide')
    RequestManager.askPassword(values.username)
      .then(() => {
        NotificationManager.info( Language.get('sentmsg'),  Language.get('successmsg'), 1500)
        rout.push('/')
      })
  }

  return (
    <React.Fragment>
      <Background />
      <ChangeLang />
      <CssBaseline />
      <Paper className={classes.forget} component="main">
        <Typography component="h1" variant="h5">
          { Language.get('forget') }
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label={ Language.get('username') }
                name="username"
                autoComplete="username"
                inputRef={register({ required: 'Required', })}
              />
              {errors.username && <span style={{ color: 'red' }}>
                {errors.username.message} </span>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.editsubmit}>
            {  Language.get('submit') }
          </Button>
        </form>
      </Paper>
    </React.Fragment>
  );
}
