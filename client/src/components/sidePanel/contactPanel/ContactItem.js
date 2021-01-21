import React from 'react';

// styles
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  root: {
    height: 70,
  },
  avatar: {
    backgroundColor: '#3f51b5',
  },
}));

const ContactItem = ({ username }) => {
  const initial = username.charAt(0).toUpperCase();  // for avatar
  
  const classes = useStyles();
  return (
    <ListItem button alignItems="center" className={classes.root}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>{initial}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography noWrap>
            <strong>{username}</strong>
          </Typography>
        }
      />
    </ListItem>
  );
};

export default ContactItem;