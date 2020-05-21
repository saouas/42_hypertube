import React from 'react';
import useForm from "react-hook-form";
import { Grid, Button } from '@material-ui/core';
import { regex } from '../../tools/regex.js';
import { CssTextField } from '../../../style/CssTextField';
import { RequestManager } from '../../../services/RequestManager';
import Language from '../../../services/Language';
import '../../../style/EditStyle.css'
import { AuthManager } from '../../../services/AuthManager.js';
import { NotificationManager } from 'react-notifications';

export default function UpdatePassword() {
  const { handleSubmit, register, errors } = useForm(); 

  const onSubmit = values => {
    RequestManager.updatePassword(values.old_password, values.new_password)
    .catch(() => {
      NotificationManager.error('Mot de passe invalide')
    })
  };

  if (AuthManager.getType() !== 'basic')
    return (null);

  return (
    <form className='editform' onSubmit={handleSubmit(onSubmit)}>   
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CssTextField
            variant="outlined"
            inputRef={register({
                required: 'Required',
              })
            }
            fullWidth
            name="old_password"
            label={ Language.get('currentpassword') }
            type="password"
            autoComplete="current-password"
          />
          {errors.old_password && <span style={{color: 'red'}}> 
            {errors.old_password.message} </span>
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
            name="new_password"
            autoComplete='new-password'
            label={ Language.get('newpassword') }
            type="password"
          />
          {errors.new_password && <span style={{color: 'red'}}> 
            {errors.new_password.message} </span>
          }
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className='editsubmit'>
              { Language.get('update') } { Language.get('password') }
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}