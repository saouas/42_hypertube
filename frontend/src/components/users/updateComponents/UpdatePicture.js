import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { RequestManager } from '../../../services/RequestManager';
import Language from '../../../services/Language';
import '../../../style/EditStyle.css'

export default function UpdatePicture(props) {
  const [uploadPicture, setUploadPicture] = useState(null);

  function handleChange(event) {     
    const file = event.target.files[0];
    setUploadPicture(file)
  }

  function uploadFile() {
    RequestManager.updatePicture(uploadPicture);
  }

  const default_img = '/images/default_avatar.png';
  const image = props.profile_pic ? `http://localhost:8080/public/profile/${props.profile_pic}` : default_img

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <label htmlFor="file-input" >
          <div className="container">
            <img 
              id="avatar" 
              src= { uploadPicture ? URL.createObjectURL(uploadPicture) : image } 
              className='avatar'
              alt={ Language.get('picture') } />
          </div>        
        </label>
        <TextField
          variant="outlined"
          type="file"
          id="file-input"
          name="profile_pic"
          onChange={handleChange}
          style={{display: 'none'}}
        />
        <Button
          disabled={!uploadPicture}
          type="submit"
          variant="contained"
          onClick={uploadFile}
          color='secondary'
          style={{width:'50%'}}
          className='editsubmit'
        >
          { Language.get('upload') } {Language.get('picture') }
        </Button>
      </Grid>
    </Grid>
  )
}