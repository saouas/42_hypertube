import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Language from '../../services/Language';
import { useStyles } from '../../style/globalstyle'
import { AuthManager } from '../../services/AuthManager'
import { NotificationManager } from 'react-notifications';
import rout from '../../config/history';

export default function Header({ logged, username }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    NotificationManager.info(Language.get('logoutmsg'), null, 2000)
    AuthManager.disconnect();
    handleMenuClose();
    rout.push('/')
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      className={classes.menu}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <Link to='/user/profile' ><MenuItem onClick={handleMenuClose}>{Language.get('myprofile')}</MenuItem></Link>
      <Link to="/account/edit" ><MenuItem onClick={handleMenuClose}>{Language.get('editinfo')}</MenuItem></Link>
      <MenuItem onClick={handleLogout}>{Language.get('logout')}</MenuItem>
    </Menu>
  );

  const rightIcon = () => {
    if (!logged)
      return (null);
    return (
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    )
  }

  const showSearch = () => {
    if (!logged)
      return (null);
    return (
      <Link to="/search">
        <Typography variant="h5" noWrap className={classes.header_el}>
          {Language.get('films')}
      </Typography>
      </Link>
    )
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.headerbar}>
        <Toolbar>
          <Link to='/'>
            <Typography className={classes.hypertube} variant="h4" noWrap>
              HyperTube
            </Typography>
          </Link>

          {showSearch()}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {rightIcon()}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
