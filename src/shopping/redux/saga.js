import { all, call } from 'redux-saga/effects';
import watchGetDataProductSaga from '../pages/home/saga/home-saga';
import watchAddCartSaga from '../pages/cart/sagas/cart-saga';
import loginSagaFlow from '../pages/login/saga/login-saga';
import { logoutSagaFlow } from '../pages/login/saga/login-saga';

export default function* rootSaga(){
  yield all([
    call(watchGetDataProductSaga),
    call(watchAddCartSaga),
    call(loginSagaFlow),
    call(logoutSagaFlow)
  ]);
}