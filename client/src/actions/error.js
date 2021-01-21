import { SET_ERROR, CLEAR_ERROR } from './actionTypes';

export const setError = message => ({
  type: SET_ERROR,
  message
});

export const clearError = () => ({
  type: CLEAR_ERROR
});