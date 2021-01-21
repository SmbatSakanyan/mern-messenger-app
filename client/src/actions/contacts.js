import axios from 'axios';
import { SET_CONTACTS, CLEAR_CONTACTS, ADD_CONTACT } from './actionTypes';

const setContacts = contacts => ({
  type: SET_CONTACTS,
  contacts
});

const clearContacts = () => ({
  type: CLEAR_CONTACTS
});

const addContact = contact => ({
  type: ADD_CONTACT,
  contact
});

export const getContacts = () => {
  return async dispatch => {
    try {
      // Request server to get all contacts.
      const res = await axios.get(
        '/api/users/contacts',
        { withCredentials: true }
      );
      
      dispatch(setContacts(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const clearContactsWrapper = () => {
  return dispatch => dispatch(clearContacts());
};

export const addContactToServer = userToAdd => {
  return async dispatch => {
    try {
      
      const data = { userToAdd }
      await axios.post(
        '/api/users/contacts', 
        data,
        { withCredentials: true }
      );
      
      dispatch(addContact(userToAdd));
    } catch (err) {
      console.log(err);
    }
  };
};

export const searchUser = async username => {
  try {
    const userExists = await axios.get(`/api/users/search/${username}`);
    if(userExists) return true;
    return false;
  } catch (err) {
    return false;
  }
};