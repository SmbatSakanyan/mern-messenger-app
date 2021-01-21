import axios from 'axios';
import { SET_CURRENT_USER, CLEAR_USER } from '../actions/actionTypes';
import { setError, clearError } from './error';

const setCurrentUser = username => ({
  type: SET_CURRENT_USER,
  username
});

const clearUser = () => ({
  type: CLEAR_USER
});

export const register = data => {
  return async dispatch => {
    try {
      const res = await axios.post('/auth/register', data);

      dispatch(setCurrentUser(res.data.username));
      dispatch(clearError());
    } catch (err) {
      dispatch(setError(`${err.response.data.message}. Please try again.`));
    }
  };
};

export const login = data => {
  return async dispatch => {
    try {
      const res = await axios.post('/auth/login', data);

      dispatch(setCurrentUser(res.data.username));
      dispatch(clearError());
    } catch (err) {
      dispatch(setError(`${err.response.data.message}. Please try again.`));
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      await axios.get(
        '/auth/logout',
        { withCredentials: true }
      );
      dispatch(clearUser());
    } catch (err) {
      console.log(err);
    }
  };
};


export const verifyUser = () => {
  return async dispatch => {
    try {
      const res = await axios.get(
        '/auth/verify',
        { withCredentials: true }
      );
      if (res.data.isAuthenticated) dispatch(setCurrentUser(res.data.username));
      else dispatch(clearUser());
    } catch (err) {
      console.log(err);
    }
  };
};