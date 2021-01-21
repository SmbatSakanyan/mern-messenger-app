import axios from 'axios';
import store from '../store';
import {
  SET_CONVERSATIONS, 
  CLEAR_CONVERSATIONS,
  ADD_CONVERSATION, 
  ADD_PARTICIPANTS,
  ADD_MESSAGE,
  UPDATE_LAST_MESSAGE_READ
} from './actionTypes';

const setConversations = conversations => ({
  type: SET_CONVERSATIONS,
  conversations
});

const clearConversations = () => ({
  type: CLEAR_CONVERSATIONS
});

const addConversation = conversation => ({
  type: ADD_CONVERSATION,
  conversation
});

const addPaticipants = (_id, participants) => ({
  type: ADD_PARTICIPANTS,
  _id,
  participants
});

const addMessage = (_id, message) => ({
  type: ADD_MESSAGE,
  _id,
  message
});

const updateLastMessageRead = (_id, lastMessageRead) => ({
  type: UPDATE_LAST_MESSAGE_READ,
  _id,
  lastMessageRead
});

export const getConversations = () => {
  return async dispatch => {
    try {
      const res = await axios.get(
        '/api/conversations/',
        { withCredentials: true }
      );

      const username = store.getState().auth.username;

      const conversations = res.data.map(conversation => ({
        ...conversation,
        participants: conversation.participants.filter(
          participant => participant !== username
        ).sort()
      }));
      dispatch(setConversations(conversations));
    } catch (err) {
      console.log(err);
    }
  };
};

export const clearConversationsWrapper = () => {
  return dispatch => dispatch(clearConversations());
};


export const addConversationToServer = async participants => {
  try {
    // Request server to add new conversatoin.
    await axios.post(
      '/api/conversations', 
      participants,
      { withCredentials: true }
    );

  } catch (err) {
    console.log(err);
  }
};

export const addConversationWrapper = conversation => {
  return dispatch => dispatch(addConversation(conversation));
};

export const addMessageToServer = async (_id, message) => {
  try {
    const data = { _id, message };

    await axios.post(
      '/api/conversations/messages', 
      data,
      { withCredentials: true }
    );

  } catch (err) {
    console.log(err);
  }
};

export const addMessageWrapper = (_id, message) => {
  return dispatch => dispatch(addMessage(_id, message));
};

export const updateLastMessageReadToServer = (_id, lastMessageRead) => {
  return async dispatch => {
    try {
      dispatch(updateLastMessageRead(_id, lastMessageRead));

      const data = { _id, lastMessageRead };
      await axios.put(
        '/api/users/conversations',
        data,
        { withCredentials: true }
      );
      
    } catch (err) {
      console.log(err);
    }
  };
};