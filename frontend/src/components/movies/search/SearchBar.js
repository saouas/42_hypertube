import React, { useEffect, useState } from 'react';
import { movieStyle } from '../../../style/MovieStyle';
import { Grid, Button, Typography, Slider, Tooltip, ListItemText } from '@material-ui/core';
import Language from '../../../services/Language';
import { CssTextField } from '../../../style/CssTextField';
import PropTypes from 'prop-types';
import { StyledMenu, StyledMenuItem } from '../../../style/SearchStyle';

export default function Search({ sortBy, setSortBy, filterYear, setFilterYear, filterRate, setFilterRate, searchKeywords }) {
  const classes = movieStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [isSending, setIsSending] = useState(false);

  function ValueLabelComponent(props) {
    const { children, open, value } = props;

    console.log('render')
    const popperRef = React.useRef(null);
    useEffect(() => {
      console.log('boucle')
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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScoreChange = (event, newValue) => {
    setFilterRate(newValue);
  };

  const handleYearChange = (event, newValue) => {
    setFilterYear(newValue);
  };

  const handleSortBy = (val) => {
    setSortBy(val);
    setAnchorEl(null);
  }

  const startSearch = () => {
    setIsSending(true);
    searchKeywords(keywords, searchEnd)
  }

  const searchEnd = () => {
    setIsSending(false);
  }

  return (
    <>
      <Grid container align="middle" spacing={3}>
        <Grid item xs={8} md={5}>
          <CssTextField
            className={classes.keywords}
            variant='outlined'
            fullWidth
            id='keyword'
            label={  Language.get('keyword') }
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <Button
            type="submit"
            variant="contained"
            color="default"
            className={classes.searchsubmit}
            onClick={() => startSearch()}>
            {isSending ? 'searching..' : Language.get('search') }
          </Button>
        </Grid>
        <Grid item xs={6} md={5}>
          <Button
            className={classes.searchsubmit}
            aria-controls="customized-menu-1"
            aria-haspopup="true"
            variant="contained"
            onClick={handleClick}>
            {`${Language.get('sort_by')} ${Language.get(sortBy)}`} &#9660;
          </Button>
          <StyledMenu
            id="customized-menu-1"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={() => handleSortBy('genres')}>
              <ListItemText primary={ Language.get('genres') } />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleSortBy('seeds')}>
              <ListItemText primary={'Seeds'} />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleSortBy('title')}>
              <ListItemText primary={ Language.get('title') } />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleSortBy('year')}>
              <ListItemText primary={ Language.get('year') } />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleSortBy('rating')}>
              <ListItemText primary={ Language.get('rating') } />
            </StyledMenuItem>
          </StyledMenu>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography gutterBottom>{ Language.get('score') }</Typography>
          <Slider
            value={filterRate}
            className={classes.slider}
            ValueLabelComponent={ValueLabelComponent}
            defaultValue={5}
            max={10}
            min={0}
            onChange={handleScoreChange}
          />
          <div className={classes.margin} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography gutterBottom>{ Language.get('year') }</Typography>
          <Slider
            value={filterYear}
            className={classes.slider}
            ValueLabelComponent={ValueLabelComponent}
            defaultValue={new Date().getFullYear()}
            max={new Date().getFullYear()}
            min={1950}
            onChange={handleYearChange}
          />
          <div className={classes.margin} />
        </Grid>
      </Grid>
    </>
  )
}