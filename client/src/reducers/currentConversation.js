import { SET_CURRENT_CONVERSATION } from '../actions/actionTypes';

const defaultState = null;

const currentConversation = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_CONVERSATION:
      return action.id;
    default:
      return state;
  }
};

export default currentConversation;