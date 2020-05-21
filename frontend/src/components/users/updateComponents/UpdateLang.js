import React from 'react';
import { Grid } from '@material-ui/core';
import { RequestManager } from '../../../services/RequestManager';
import '../../../style/EditStyle.css'

export default function UpdateLang() {

  const handleSubmit = (language) => {
    localStorage.setItem('language', language);
    RequestManager.updateLang(language)
  }

  return (
    <form className='editform' >   
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div align='center' >
            <button style={{backgroundColor: 'black', border:'none'}} onClick={ () => handleSubmit('en') }>
                <img 
                    src='/images/lang/englishflag.png'
                    alt='englishflag'
                    style={{height: '30px',width:'30px',borderRadius:'50%'}}
                />
            </button>
            &nbsp;
            <button style={{backgroundColor: 'black', border:'none'}} onClick={ () => handleSubmit('fr') }>
                <img
                    src='/images/lang/frenchflag.png'
                    alt='frenchflag'
                    style={{height: '30px',width:'30px',borderRadius:'50%'}}
                />
            </button>
            &nbsp;
            <button style={{backgroundColor: 'black', border:'none'}} onClick={ () => handleSubmit('es') }>
                <img 
                    src='/images/lang/spanishflag.png'
                    alt='spanishflag'
                    style={{height: '30px',width:'30px',borderRadius:'50%'}}
                />
            </button>
          </div>
        </Grid>
      </Grid>
    </form>
  )
}