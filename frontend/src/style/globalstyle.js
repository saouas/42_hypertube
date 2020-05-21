import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: 'rgb(35,35, 35)'
        },
        a: {
            color: 'white',
            textDecoration: 'none'
        },
        p: {
            color: 'white'
        },
        h1: {
            color: 'white'
        },
        h3: {
            color: 'white'
        }
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    margin: {
        height: theme.spacing(3),
    },
    // landing page - index 
    indexbutton: {
        marginTop: '30vh',
        height: '20vh',
        width: '28vw',
        fontSize: '20px',
        backgroundColor: 'black',
        opacity: '.8'
    },
    // profile page
    profile_pic: {
        height: '100px',
        width: '100px',
        borderRadius: '50%'
    },
    inline: {
        float: 'left'
    },
    link: {
        color: 'black'
    },
    profile: {
        backgroundColor: 'black',
        color: 'white',
        marginTop: '150px',
        align: 'center',
        height: 'auto',
        marginLeft: '32vw',
        marginRight: '32vw',
        textAlign: 'left',
        padding: '30px',
        opacity: '.85',
    },
    // sign in
    signin: {
        backgroundColor: 'black',
        align: 'center',
        marginLeft: '32vw',
        marginRight: '32vw',
        minWidth: '350px',
        textAlign: 'left',
        padding: '30px',
        opacity: '.8'
    },
    // signup
    signup: {
        marginTop: '-25px',
        backgroundColor: 'black',
        align: 'center',
        marginLeft: '30vw',
        marginRight: '30vw',
        minWidth: '350px',
        textAlign: 'left',
        padding: '30px',
        opacity: '.8'
    },
    whiteLink: {
        color: "white",
    },
    button: {
        backgroundColor: "white",
        marginTop: theme.spacing(2),
    },
    forget: {
        align: 'center',
        marginLeft: '32vw',
        marginRight: '32vw',
        width: '500px',
        textAlign: 'left',
        padding: '30px',
        opacity: '.85',
        backgroundColor: 'black'
    },
    reset: {
        align: 'center',
        marginLeft: '32vw',
        marginRight: '32vw',
        width: '500px',
        textAlign: 'left',
        padding: '30px',
        opacity: '.85',
        backgroundColor: 'black'
    },
    // header
    headerbar: {
        backgroundColor: 'black',
        opacity: .8,
        width: '100vw',
        position: 'fixed',
        top: 0
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        padding: "10px",
    },
    hypertube: {
        padding: "12px",
        color: 'red',
        fontSize: '40px',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'flex',
        },
    },
    menu: {
        '& a': {
            color: 'black'
        }
    },
    // footer
    footer: {
        backgroundColor: 'black',
        position: 'fixed',
        bottom: '0',
        width: '100vw',
        opacity: .8,
        textAlign: 'right',
    },
    //  lang flag
    flagblock: {
        marginRight: '10px',
        marginTop: '80px',
    },
    flag: {
        borderRadius: '50%',
        height: '30px',
        width: '30px',
        zIndex: 100
    },
    flagbutton: {
        background: 'none',
        border: 'none'
    },
    edit: {
        align: 'center',
        width: '30vw',
        textAlign: 'center',
        padding: '30px',
        opacity: '.85',
        backgroundColor: 'black',
    },
    editform: {
        margin: 'auto',
        width: '80%',
        marginTop: theme.spacing(2)
    },
    editsubmit: {
        marginTop: theme.spacing(2),
        color: "white",
        fontSize: "18px",
        fontStyle: "bold",
        backgroundColor: "#bf1b2b",
        width: "100%",
        '&:hover': {
            backgroundColor: "#d40f0f",
            transition: ".5s ease",
        }
    },
    endmargin: {
        marginTop: '150px'
    },
    avatar: {
        width: "250px",
        height: '250px',
        borderRadius: "50%",
        cursor: "pointer",
        '&:hover': {
            transition: ".5s ease",
            opacity: "0.6",
        }
    },
    imageUpload: {
        display: 'none'
    },
    header_el: {
        marginLeft: '20px'
    }
}));