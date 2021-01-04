import { call, put, cancel, cancelled, fork, take, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as actions from '../actions/index';
import * as types from '../actions/types';
import { loginApi } from '../../../services/login';

function* logoutSaga() {
  try {
    yield put(actions.logoutSuccess('logout'));
    yield put(actions.deleteTokenLogin(null));
    yield put(push('/login'));
  } catch (e) {
   console.log(e);
  }
}

function* loginSaga(user, pass) {
  try {
    // bat dau call api
    yield put(actions.loginStart(true));
    const response = yield call(loginApi, user, pass);
    if(response){
      if(response.hasOwnProperty('code') && response['code'] === 200){
        yield put(actions.loginSuccess(response));
        // luu token
        yield put(actions.saveTokenLogin(response.token_user));
        yield put(actions.loginStart(false));
        // cho quay vao trang home
        yield put(push('/home'));
      } else {
        yield put(actions.loginFailure({
          code: 501,
          message: 'username or password invalid'
        }));
      }
    } else {
      yield put(actions.loginFailure({
        code: 505,
        message: 'can not login'
      }));
    }
  } catch (e) {
    yield put(actions.loginFailure(e));
  } finally {
    if(yield cancelled()){
      // thuc su redux saga no khong the call data tu api ve
      yield put(actions.loginCancelled({
        code: 500,
        message: 'sync cancelled'
      }))
    }
  }
}

export function* logoutSagaFlow() {
  yield takeLatest(types.LOGOUT, logoutSaga);
}

export default function* loginSagaFlow() {
  while (true) {
    // thuc su theo doi loginSaga khi co actions loginRequest cua nguoi dung
    const { user, pass } = yield take(types.LOGIN_REQUEST);
    // theo doi loginSaga
    const tasks = yield fork(loginSaga, user, pass);
    // lay ra hanh dong log-out hay login bi loi
    const act = yield take([types.LOGOUT, types.LOGIN_FAILURE]);
    if(act.type === types.LOGOUT || act.type === types.LOGIN_FAILURE){
      yield put(actions.loginStart(false));
      yield cancel(tasks);
      // xoa bo token
      yield put(actions.deleteTokenLogin(null));
      // tu dong quay lai dung trang login
      yield put(push('/login'));
    }
  }
}