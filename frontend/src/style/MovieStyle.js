import { makeStyles } from '@material-ui/core/styles';

export const movieStyle = makeStyles(theme => ({
    '@global': {
        p : {
            color: 'white'
        },
        h5 : {
            color: 'white'
        },
    },
    slider : {
        width: '100%', 
    },
    search : {
        backgroundColor: 'none',
        border : 'none',
    },
    searchsubmit: {
        margin: theme.spacing(2, 0, 2),
        backgroundColor: 'red',
        color : 'white',
        marginTop : '10px',
    },
    filter : {
        margin: theme.spacing(3, 0, 2),
        color : 'white',
        marginTop : '10px'
    },
    movies: {
        marginTop : '100px',
        background: 'black',
        align : 'center',
        marginLeft : '10vw',
        marginRight: '10vw',
        textAlign : 'left',
        height: 'auto',
        padding: '30px',
        opacity: '.85',
        '& p, h1' : {
            color: 'white' 
        }
    },
    onemovie: {
        marginLeft: '1px',
        marginRight: '1px',
        height: '400px',
        width: '200px',
        textAlign : 'left',
        backgroundColor: 'black'
    },
    root: {
        flexGrow: 1,
    },
    movieimg: {
        height: '280px',
        width: '200px',
        position: 'cover',
    },
    watched: {
        height: '15px',
        width: '15px',
        padding: '2px',
        borderRadius: '50%',
        border: 'none',
        marginTop: '20px',
        marginLeft: '100px'
    },
    tag: {
        color: 'black',
        backgroundColor:'white',
        borderRadius: '15px',
        marginRight: '2px', 
        fontSize: '8px',
        padding: '1px'
    },
    endmargin: {
        marginTop: '150px'
    }, 
    block: {
        marginTop: '-20px'
    }
}))