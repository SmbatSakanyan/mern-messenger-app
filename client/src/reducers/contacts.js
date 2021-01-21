import { SET_CONTACTS, CLEAR_CONTACTS, ADD_CONTACT } from '../actions/actionTypes';

const defaultState = [];

const contacts = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return action.contacts.sort();
    case CLEAR_CONTACTS:
      return [];
    case ADD_CONTACT:
      return [...state, action.contact].sort();
    default:
      return state;
  }
};

export default contacts;