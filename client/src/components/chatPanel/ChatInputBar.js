import React, { useState } from 'react';
// redux
import { connect } from 'react-redux';
import { addMessageToServer } from '../../actions/conversations'
// styles
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    padding: theme.spacing(0, 2),
    display: 'flex',
  },
  textField: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

const ChatInputBar = ({ username, currentConversation }) => {
  const [text, setText] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setText(value);
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (!text) return;

    const message = {
      username,
      text,
      date: Date.now()
    };
    addMessageToServer(currentConversation, message);
    setText('');
  };
  
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <InputBase
        type='text'
        name='message'
        value={text}
        onChange={handleChange}
        autoFocus
        placeholder='Type a message'
        className={classes.textField}
      />
      <IconButton type='submit' color='primary'>
        <SendIcon />
      </IconButton>
    </form>
  );
};

const mapStateToProps = state => ({
  username: state.auth.username,
  currentConversation: state.currentConversation
});

export default connect(mapStateToProps)(ChatInputBar);