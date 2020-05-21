import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

export const CssTextField = withStyles({
    root: {
      '& input': {
        color: "white",
      },
      '& label': {
        color: 'white',
      },
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
          backgroundColor: "#2C2C2C",
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
})(TextField);