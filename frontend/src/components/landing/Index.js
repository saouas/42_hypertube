import React from 'react';
import { Link } from 'react-router-dom';
import Language from '../../services/Language';
import { Grid, Button } from '@material-ui/core';
import { useStyles } from '../../style/globalstyle';
import Background from '../layout/Background';
import ChangeLang from '../tools/ChangeLang';

export default function Index() {
    
    const classes = useStyles();

    return ( 
        <React.Fragment>
            <Background/>
            <ChangeLang/>
            <Grid container className={ classes.root } spacing={3}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={5}>
                        <Grid item>
                            <Link to='/signup'>
                                <Button variant="contained" color="secondary" 
                                    className={ classes.indexbutton }>
                                    { Language.get('newuser') }?<br/>{ Language.get('signup') }
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to='/signin'>
                                <Button variant="contained" color="secondary"
                                    className={ classes.indexbutton }>
                                    { Language.get('already') }?<br/>{ Language.get('signin') }
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}