import { SET_CURRENT_USER, CLEAR_USER } from '../actions/actionTypes';

const defaultState = {
  isAuthenticated: false,
  username: null
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!action.username,
        username: action.username
      };
    case CLEAR_USER:
      return {
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export default auth;