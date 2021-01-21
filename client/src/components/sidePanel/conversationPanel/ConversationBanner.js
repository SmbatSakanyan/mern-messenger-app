import React, { useState } from 'react';
// redux
import { connect } from 'react-redux';
import { addConversationToServer } from '../../../actions/conversations';
import { setCurrentConversation } from '../../../actions/currentConversation';
// styles
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 70,
    padding: theme.spacing(0, 2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogContent: {
    height: 300,
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    flexGrow: 1,
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const ConversationBanner = ({ 
  username, 
  contacts, 
  conversations,
  setCurrentConversation 
}) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [conversationExists, setConversationExists] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChecked([]);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      newChecked.sort();
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    const exists = conversations.find(conversation =>
      conversation.participants.toString() === newChecked.toString()
    );
    setConversationExists(!!exists);
  };

  const handleConfirm = () => {
    const participants = [...checked, username].sort();
    addConversationToServer(participants);
    setOpen(false);
    setChecked([]);
    setCurrentConversation(null);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h6'>Conversations</Typography>
      
      <Tooltip title='New conversation'>
        <IconButton onClick={handleClickOpen}>
          <AddCommentIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new conversation</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <List className={classes.list}>
            {contacts.map(value => {
              return (
                <ListItem key={value} button onClick={handleToggle(value)}>
                  <ListItemText primary={value} />
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      disableRipple
                      color='primary'
                    />
                  </ListItemIcon>
                </ListItem>
              );
            })}
          </List>
          {
            conversationExists && (
              <DialogContentText color='secondary'>
                Conversation already exists.
              </DialogContentText>
            )
          }
        </DialogContent>
        
        <DialogActions>
          <Button 
            color='primary'
            disabled={checked.length === 0 || conversationExists}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.auth.username,
  contacts: state.contacts,
  conversations: state.conversations
});

const mapDispatchToProps = dispatch => ({
  setCurrentConversation: _id => dispatch(setCurrentConversation(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationBanner);