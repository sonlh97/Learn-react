import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './saga';
import history from '../helpers/history';
import { routerMiddleware } from 'connected-react-router';

const configPersistRoot = {
  key: 'config-root',
  storage,
  blacklist: ['router', 'login'] // loai tru reducer router ko luu vao local storage cua redux persist
}

const rootPersistReducer = persistReducer(configPersistRoot, rootReducer(history));

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const configStore = (loadStore = {}) => {
  const store = createStore(
    rootPersistReducer,
    loadStore,
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      logger
    )
  )
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor, history }
}
export default configStore;