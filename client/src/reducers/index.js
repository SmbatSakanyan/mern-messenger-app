import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import contacts from './contacts';
import conversations from './conversations';
import currentConversation from './currentConversation';

export default combineReducers({
  auth,
  error,
  contacts,
  conversations,
  currentConversation
});