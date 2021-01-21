import React, { useState } from 'react';
// redux
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { clearContactsWrapper } from '../../actions/contacts';
import { clearConversationsWrapper } from '../../actions/conversations';
import { setCurrentConversationWrapper } from '../../actions/currentConversation';
// styles
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: theme.spacing(0.7),
    right: theme.spacing(2),
  },
  username: {
    borderBottom: '1px solid #c4c4c4',
    paddingBottom: theme.spacing(1),
  },
}));

const MenuButton = ({ 
  username,
  logout,
  clearContactsWrapper,
  clearConversationsWrapper,
  setCurrentConversationWrapper 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = event => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    logout();
    setCurrentConversationWrapper(null);
    clearContactsWrapper();
    clearConversationsWrapper();
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton color='primary' onClick={handleMenuClick}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography 
          variant='subtitle1' 
          align='center' 
          className={classes.username}
        >
          <strong>{username}</strong>
        </Typography>
        <MenuItem dense onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.auth.username
});

export default connect(mapStateToProps, {
  logout,
  clearContactsWrapper,
  clearConversationsWrapper,
  setCurrentConversationWrapper
})(MenuButton);