import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { CssTextField } from '../../../style/CssTextField';
import Language from '../../../services/Language';  
import { RequestManager } from '../../../services/RequestManager';
import '../../../style/EditStyle.css'
import { AuthManager } from '../../../services/AuthManager';
import { NotificationManager } from 'react-notifications';

export default function UpdateEmail(props) {
  const [email, setEmail] = useState(props.email);

  const handleSubmit = (event) => {
    event.preventDefault();
    RequestManager.updateMail(email)
    .catch((err) => {
      NotificationManager.error('Mail invalide ou existant')
    })
  }

  if (AuthManager.getType() !== 'basic')
    return (null);

  return (
    <form className='editform' onSubmit={handleSubmit}>   
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CssTextField
            required
            variant="outlined"
            fullWidth
            name="email"
            label={ Language.get('mail') }
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value) }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className='editsubmit'>
              { Language.get('update') } {  Language.get('mail') }
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}