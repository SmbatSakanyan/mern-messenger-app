import React, { useEffect } from 'react';
// components
import ChatPanel from './chatPanel/ChatPanel'
import SidePanel from './sidePanel/SidePanel'
// redux
import { connect } from 'react-redux';
import {
  getConversations,
  addConversationWrapper,
  addMessageWrapper,
  updateLastMessageReadToServer
} from '../actions/conversations';
import { getContacts } from '../actions/contacts';
// styles
import { makeStyles } from '@material-ui/core/styles';
// socket.io
import io from 'socket.io-client';
import { 
  handleNewConversation, 
  handleNewMessage 
} from '../helpers/socketHandlers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    bottom: 0,
    display: 'flex',
  },
}));

const Main = ({ 
  getConversations, 
  getContacts, 
  addConversationWrapper,
  addMessageWrapper,
  updateLastMessageReadToServer
}) => {
  const socket = io();

  useEffect(() => {
    getConversations();
    getContacts();
    return () => socket.disconnect();
  }, [getConversations, getContacts, socket]);

  socket.on('conversation', data => {
    handleNewConversation(data, addConversationWrapper);
  });
  socket.on('message', data => {
    handleNewMessage(
      data, 
      addMessageWrapper,
      updateLastMessageReadToServer
    );
  });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SidePanel />
      <ChatPanel />
    </div>
  );
};

export default connect(
  null,
  { 
    getConversations, 
    getContacts, 
    addConversationWrapper,
    addMessageWrapper,
    updateLastMessageReadToServer 
  }
)(Main);