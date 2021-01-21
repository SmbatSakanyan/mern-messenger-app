import { SET_CURRENT_CONVERSATION } from './actionTypes';

export const setCurrentConversation = id => ({
  type: SET_CURRENT_CONVERSATION,
  id
});

export const setCurrentConversationWrapper = id => {
  return dispatch => dispatch(setCurrentConversation(id));
};