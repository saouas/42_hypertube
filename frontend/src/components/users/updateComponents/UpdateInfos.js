import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { CssTextField } from '../../../style/CssTextField';
import Language from '../../../services/Language';
import { RequestManager } from '../../../services/RequestManager';
import '../../../style/EditStyle.css'

export default function UpdateInfos(props) {
  const [first_name, setFirst_Name] = useState()
  const [last_name, setLast_Name] = useState()

  useEffect(() => {
    setFirst_Name(props.fullname.first_name)
    setLast_Name(props.fullname.last_name)
  }, [props.fullname]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const first = first_name.toLowerCase();
    const last = last_name.toLowerCase();
    RequestManager.updateFullName(first, last);
  }

  return (
    <form className='editform' onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CssTextField
            required
            variant="outlined"
            fullWidth
            name="first_name"
            label={ Language.get('firstname') }
            type="text"
            id="first_name"
            onChange={e => setFirst_Name(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            required
            variant="outlined"
            fullWidth
            name="last_name"
            label={ Language.get('lastname') }
            type="text"
            id="last_name"
            onChange={e => setLast_Name(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color='secondary'
            style={{ color: 'white' }}
            className='editsubmit'>
            { Language.get('update') } { Language.get('info') }
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}