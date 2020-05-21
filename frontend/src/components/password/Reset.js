import React from 'react';
import useForm from "react-hook-form";
import { Grid, Typography, Container, Button } from '@material-ui/core';
import Language from '../../services/Language';
import { useStyles } from '../../style/globalstyle';
import ChangeLang from '../tools/ChangeLang';
import Background from '../layout/Background';
import { CssTextField } from '../../style/CssTextField';
import { RequestManager } from '../../services/RequestManager';
import rout from '../../config/history';
import { NotificationManager } from 'react-notifications';

export default function Reset(prop) {

  const classes = useStyles();
  const token = prop.match.params.token;

  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    RequestManager.resetPassword(token, values.password)
      .then(() => {
        NotificationManager.success( Language.get('resetmsg'),  Language.get('successmsg'), 2000)
        rout.push('/signin')
      })
  }
  return (
    <React.Fragment>
      <Background />
      <ChangeLang />
      <Container className={classes.reset} component="main">
        <div >
          <Typography component="h1" variant="h5">
            { Language.get('reset') }
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label={ Language.get('newpassword') }
                  name="password"
                  autoComplete="password"
                  inputRef={register({ required: 'Required', })}
                />
                {errors.password && <span style={{ color: 'red' }}>
                  {errors.password.message} </span>
                }
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
        </div>
      </Container>
    </React.Fragment>
  );
}
