import {take, put, call, fork, cancel, cancelled} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as actions from '../actions/index';
import * as types from '../actions/types';
import { loginApi } from '../../../services/login';

function* loginSaga(user, pass) {
  try {
    yield put(actions.loginStart(true));
    const response = yield call(loginApi, user, pass);
    if(response.hasOwnProperty('code') && response['code'] === 200){
      yield put(actions.loginSuccess(response));
      yield put(actions.saveTokenLogin(response.token_user));
      yield put(actions.loginStart(false));
      // quay ve trang home
      yield put(push('/home'));
    } else {
      yield put(actions.loginFailure({
        code: 404,
        message: 'can not login'
      }));
      yield put(actions.loginStart(false));
    }
   
  } catch (e) {
    yield put(actions.loginFailure(e));
    yield put(actions.loginStart(false));
  } finally {
    if( yield cancelled()){
      yield put(actions.loginCancelled({
        code: 505,
        message: 'sync cancelled'
      }));
      yield put(actions.loginStart(false));
    }
  }
}

export default function* loginSagaFlow() {
  while(true) {
    const { user, pass } = yield take(types.LOGIN_REQUEST);
    const task = yield fork(loginSaga, user, pass);
    const action = yield take([types.LOGOUT, types.LOGIN_FAILURE]);
    if(action.type === types.LOGOUT || action.type === types.LOGIN_FAILURE){
      yield cancel(task);
      yield put(actions.deleteTokenLogin(null));
    }
  }
}