import React from 'react';
// redux
import { connect } from 'react-redux';
// styles
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '70%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexShrink: 0,
  },
  message: {
    borderRadius: 15,
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  sent: {
    alignSelf: 'flex-end',
    marginLeft: '30%',
    marginRight: theme.spacing(2),
  },
  sentMessage: {
    background: '#c4e2ff',
  },
  sentDate: {
    textAlign: 'right',
  },
  received: {
    display: 'flex',
    marginRight: '30%',
    marginLeft: theme.spacing(2),
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight :theme.spacing(1),
    marginTop :theme.spacing(2),
    backgroundColor: '#3f51b5',
  },
  receivedMessage: {
    background: '#e8e8e8',
  },
  receivedDate: {
    textAlign: 'left',
  },
}));

const ChatItem = ({ message, currentUser }) => {
  const { username, text, date } = message;
  const initial = username.charAt(0).toUpperCase(); // for avatar
  const dateString = (new Date(date)).toLocaleString();

  const fromCurrentUser = username === currentUser;

  const classes = useStyles();
  
  if (fromCurrentUser) {
    return (
      <div className={[classes.root, classes.sent].join(' ')}>
        <Typography 
          variant='body1' 
          className={[classes.message, classes.sentMessage].join(' ')}
        >
          {text}
        </Typography>
        <Typography variant='body2' className={classes.sentDate}>
          {dateString}
        </Typography>
      </div>
    );
  }

  return (
    <div className={[classes.root, classes.received].join(' ')}>
      <Avatar className={classes.avatar}>{initial}</Avatar>
      <div>
        <Typography variant='body1'><strong>{username}</strong></Typography>
        <Typography 
          variant='body1' 
          className={[classes.message, classes.receivedMessage].join(' ')}
        >
          {text}
        </Typography>
        <Typography variant='body2' className={classes.receivedDate}>
          {dateString}
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.username
});

export default connect(mapStateToProps)(ChatItem);