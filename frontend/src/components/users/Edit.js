import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import Language from '../../services/Language';
import { RequestManager } from '../../services/RequestManager';
import UpdatePassword from './updateComponents/UpdatePassword';
import UpdateInfos from './updateComponents/UpdateInfos';
import UpdatePicture from './updateComponents/UpdatePicture'
import UpdateEmail from './updateComponents/UpdateEmail'
import UpdateLang from './updateComponents/UpdateLang'
import { AuthManager } from '../../services/AuthManager';
import '../../style/EditStyle.css'

export default function Edit() {
  const [userInfos, setUserInfos] = useState({});
  
  useEffect(() => {
    RequestManager.getUserProfile(AuthManager.getUsername())
    .then(res => {
      setUserInfos(res.data)
    })
  }, [])

  return (
    <React.Fragment>
      <Grid container style={{marginTop: '60px'}} justify="center" alignItems="stretch" spacing={5}>
        <Grid item xs={12} >
        </Grid>
        <Grid item md={5} xs={9}>   
          <Paper elevation={5} className='edit' style={{backgroundColor: 'black'}}>
              <UpdatePicture profile_pic={ userInfos.profile_pic }/>
              <UpdateInfos fullname={{ 'first_name': userInfos.first_name, 'last_name': userInfos.last_name }} />
          </Paper>
        </Grid>           
        <Grid item md={5} xs={9}>     
          <Paper elevation={5} className='edit' style={{backgroundColor: 'black'}}>
              <h1>{ Language.get('editinfo') }</h1>
              <UpdatePassword />
              <UpdateEmail email={ userInfos.mail } />
              <UpdateLang/>
          </Paper>
        </Grid>    
      </Grid>
      <div className='endmargin'></div>
    </React.Fragment>
  )
}