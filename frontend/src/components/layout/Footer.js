import React from 'react';
import { useStyles } from '../../style/globalstyle';

export default function Footer(){
    const classes = useStyles();

    return (
        <div className={ classes.footer }>
            <p> Copyright &copy; 2019 HyperTube &nbsp;</p>
        </div>
    )
}