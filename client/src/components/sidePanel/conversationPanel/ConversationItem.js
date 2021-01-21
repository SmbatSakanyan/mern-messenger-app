import React from 'react';
// redux
import { connect } from 'react-redux';
import { updateLastMessageReadToServer } from '../../../actions/conversations';
import { setCurrentConversationWrapper } from '../../../actions/currentConversation';
// styles
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
  root: {
    height: 90,
    display: 'flex',
  },
  date: {
    margin: theme.spacing(2, 0, 1.5),
  },
  side: {
    alignSelf: 'flex-start',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#3f51b5',
  },
}));

const ConversationItem = ({ 
  conversation, 
  conversations,
  currentConversation, 
  updateLastMessageReadToServer,
  setCurrentConversationWrapper 
}) => {
  const { _id, participants, messages, lastMessageRead } = conversation;
  const participantsStr = participants.join(', ');
  const initial = participantsStr.charAt(0).toUpperCase(); // for avatar
  let lastMsgText = '';
  let lastMsgDate = '';
  if (messages.length > 0) {
    const lastMsg = messages[messages.length - 1];
    lastMsgText = `${lastMsg.username}: ${lastMsg.text}`;
    lastMsgDate = (new Date(lastMsg.date)).toLocaleDateString();
  }
  const unreadMessages = messages.length - lastMessageRead;

  const handleClick = () => {
    setCurrentConversationWrapper(_id);
    const lastMessageRead = conversations.find(
      conversation => conversation._id === _id
    ).lastMessageRead;
    if (lastMessageRead !== messages.length) {
      updateLastMessageReadToServer(_id, messages.length);
    }
  };

  const classes = useStyles();
  return (
    <ListItem 
      button 
      alignItems="center" 
      className={classes.root}
      selected={_id === currentConversation}
      onClick={handleClick}
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar}>{initial}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography noWrap>
            <strong>{participantsStr}</strong>
          </Typography>
        }
        secondary={
          <Typography noWrap color='textSecondary'>
            {lastMsgText}
          </Typography>
        }
      />
      <div className={classes.side}>
        <Typography variant='caption' className={classes.date}>
          {lastMsgDate}
        </Typography>
        <Badge 
          color='secondary' 
          badgeContent={unreadMessages}
          invisible={unreadMessages === 0}
        >
          <div />
        </Badge>
      </div>
    </ListItem>
  );
};

const mapStateToProps = state => ({
  conversations: state.conversations,
  currentConversation: state.currentConversation
});

export default connect(
  mapStateToProps, 
  { updateLastMessageReadToServer, setCurrentConversationWrapper }
)(ConversationItem);