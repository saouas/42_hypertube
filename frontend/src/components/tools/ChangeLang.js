import React from 'react';
import { useStyles } from '../../style/globalstyle';
import rout from '../../config/history';

export default function ChangLang() {
    const classes = useStyles();

    const changeLang = (lang) => {
        localStorage.setItem('language', lang)
        rout.push(0)
    }

    return (
        <React.Fragment>
            <div align='right' className={ classes.flagblock }>
                <button className={ classes.flagbutton } onClick={ () => changeLang('en') }>
                    <img 
                        src='/images/lang/englishflag.png'
                        alt='englishflag'
                        className={ classes.flag }
                    />
                </button> &nbsp;
                <button className={ classes.flagbutton } onClick={ () => changeLang('fr') }>
                    <img
                        src='/images/lang/frenchflag.png'
                        alt='frenchflag'
                        className={ classes.flag }
                    />
                </button> &nbsp;
                <button className={ classes.flagbutton } onClick={ () => changeLang('es') }>
                    <img 
                        src='/images/lang/spanishflag.png'
                        alt='spanishflag'
                        className={ classes.flag }
                    />
                </button>
            </div>
        </React.Fragment>
    )
}