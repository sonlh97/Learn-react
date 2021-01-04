import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import productReducer from '../pages/home/reducers/home-reducer';
import { cartReducer } from '../pages/cart/reducers/cart-reducer';
import tokenReducer from '../pages/login/reducers/token-reducer';
import loginReducer from '../pages/login/reducers/login-reducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { connectRouter } from 'connected-react-router';

const configPersistProduct = {
  key: 'products-data',
  storage,
  whitelist: ['products']
}
const configPersistCart = {
  key: 'cart-data',
  storage,
  whitelist: ['dataCart', 'totalMoney', 'countItems']
}

const configTokenLoginPersist = {
  key: 'token-login-persist',
  storage,
  whitelist: ['token']
}

const rootReducer = (history) => combineReducers({
  product: persistReducer(configPersistProduct,productReducer),
  cart: persistReducer(configPersistCart, cartReducer),
  router: connectRouter(history),
  token: persistReducer(configTokenLoginPersist, tokenReducer),
  login: loginReducer
});
export default rootReducer;