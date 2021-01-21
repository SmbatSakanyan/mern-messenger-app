import { SET_ERROR, CLEAR_ERROR } from '../actions/actionTypes';

const defaultState = { message: null };

const error = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { message: action.message };
    case CLEAR_ERROR:
      return { message: null };
    default:
      return state;
  }
};

export default error;