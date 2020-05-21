import React, { useEffect, useState } from 'react';
import { movieStyle } from '../../../style/MovieStyle';
import { Grid, Button, Typography, Slider, Tooltip, ListItemText } from '@material-ui/core';
import Language from '../../../services/Language';
import { CssTextField } from '../../../style/csstextfield';
import PropTypes from 'prop-types';
import { StyledMenu, StyledMenuItem } from '../../../style/SearchStyle';

export default function Search() {
  const classes = movieStyle();

  function ValueLabelComponent(props) {
    const { children, open, value } = props;

    const popperRef = React.useRef(null);
    useEffect(() => {
      if (popperRef.current) {
        popperRef.current.update();
      }
    });

    return (
      <Tooltip
        PopperProps={{
          popperRef,
        }}
        open={open}
        enterTouchDelay={0}
        placement="top"
        title={value}
      >
        {children}
      </Tooltip>
    );
  }

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [score_value, setScoreValue] = useState([0, 10]);
  const [year_value, setYearValue] = useState([1950, new Date().getFullYear()]);

  const handleClickName = event => {
    console.log('this button will filter movie with alphabet')
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScoreChange = (event, newValue) => {
    setScoreValue(newValue);
  };

  const handleYearChange = (event, newValue) => {
    setYearValue(newValue);
  };

  const handleClickClear = event => {
    setYearValue([1950, new Date().getFullYear()]);
    setScoreValue([0, 10]);
    setAnchorEl(null);
    console.log('this button will clear filter')
  };

  return (
    <React.Fragment>
      <form className={classes.form} >
        <Grid item xs={12}>
          <Grid container align="left" spacing={8}>
            <Grid item>
              <CssTextField
                className={classes.keywords}
                variant='outlined'
                id='keyword'
                label={  Language.get('keyword') }
                name='keyword'
              />
            </Grid>
            <Grid item >
              <Button
                type="submit"
                variant="contained"
                color="default"
                className={classes.searchsubmit}>
                { Language.get('search') }
              </Button>
            </Grid>
            <Grid item >
              <Typography className={classes.filter} component="h3" variant="h5">
                { Language.get('filter') }
              </Typography>
            </Grid>
            <Grid item >
              <Button
                className={classes.searchsubmit}
                variant="contained"
                onClick={handleClickName}>
                {  Language.get('name') }
              </Button>
            </Grid>
            <Grid item >
              <Button
                className={classes.searchsubmit}
                aria-controls="customized-menu-1"
                aria-haspopup="true"
                variant="contained"
                onClick={handleClick}>
                {  Language.get('genre') } &#9660;
                            </Button>
              <StyledMenu
                id="customized-menu-1"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <ListItemText primary='it will be mapping genre here' />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemText primary={  Language.get('genre') } />
                </StyledMenuItem>

              </StyledMenu>
            </Grid>
          </Grid>
          <Grid container align="left" spacing={5}>
            <Grid item >
              <Typography gutterBottom>{  Language.get('score') }</Typography>
              <Slider
                value={score_value}
                className={classes.slider}
                ValueLabelComponent={ValueLabelComponent}
                defaultValue={5}
                max={10}
                min={0}
                onChange={handleScoreChange}
              />
              <div className={classes.margin} />
            </Grid>
            <Grid item >
              <Typography gutterBottom>{ Language.get('year') }</Typography>
              <Slider
                value={year_value}
                className={classes.slider}
                ValueLabelComponent={ValueLabelComponent}
                defaultValue={new Date().getFullYear()}
                max={new Date().getFullYear()}
                min={1950}
                onChange={handleYearChange}
              />
              <div className={classes.margin} />
            </Grid>
            <Grid item >
              <Button
                className={classes.searchsubmit}
                variant="contained"
                onClick={handleClickClear}>
                {  Language.get('clear') }
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}