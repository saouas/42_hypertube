import React, { useState, useEffect } from 'react'
import { Paper } from '@material-ui/core'
import { useStyles } from '../../style/globalstyle';
import { RequestManager } from '../../services/RequestManager';
import { AuthManager } from '../../services/AuthManager';

export default function Profile() {
  const classes = useStyles();
  const [profile, setProfile] = useState({})

  useEffect(() => {
    RequestManager.getUserProfile(AuthManager.getUsername())
    .then(res => {
      setProfile(res.data)
    })
  }, [])
  
  const default_img = '/images/default_avatar.png';
  const image = profile.profile_pic ? `http://localhost:8080/public/profile/${profile.profile_pic}` : default_img

  return ( 
    <React.Fragment >
      <Paper className={ classes.profile }>
        <h1>{ profile.username }</h1>
        <div className={ classes.inline }>
          <img className={ classes.profile_pic } src={ image }  alt='profile_pic'/>
        </div>
        <div align='center'>
          <h1>
            { profile.first_name }
            <br/>
            { profile.last_name }
          </h1>
        </div>
        <br/>
      </Paper>
    </React.Fragment>
  )
}