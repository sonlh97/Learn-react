import * as types from './types';

export const loginRequest = (user, pass) => ({
  type: types.LOGIN_REQUEST,
  user,
  pass
});

export const loginStart = (loading) => ({
  type: types.LOGIN_START,
  loading
});

export const loginCancelled = (cancelled) => ({
  type: types.LOGIN_CANCELLED,
  cancelled
});

export const loginSuccess = (data) => ({
  type: types.LOGIN_SUCCESS,
  data
});
export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  error
});

export const logoutRequest = () => ({
  type: types.LOGOUT
});
export const logoutSuccess = (mess) => ({
  type: types.LOGOUT_SUCCESS,
  mess
});

export const saveTokenLogin = (token) => ({
  type: types.SAVE_TOKEN,
  token
});
export const deleteTokenLogin = (token) => ({
  type: types.DELETE_TOKEN,
  token
});