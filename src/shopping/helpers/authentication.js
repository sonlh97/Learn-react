
import jwt from 'jsonwebtoken';
const KEY_JWT = 'vccorp_2020';

export const getTokenFromLocalStorage = () => {
  const token = localStorage['persist:token-login-persist'];
  if(token !== null && token !== undefined && token !== '') {
    const jsonToken = JSON.parse(token);
    if(jsonToken.hasOwnProperty('token')) {
      return JSON.parse(jsonToken['token']);
    }
  }
  return null;
}

export const decodeTokenFromLocalStorage = ( stringToken = null ) => {
  // stringToken : lay tu state trong store
  const token = stringToken === null ? getTokenFromLocalStorage() : stringToken;

  let decodeToken = null;
  if(token !== null && token !== undefined && token !== '') {
    decodeToken = jwt.verify(token, KEY_JWT);
  }
  return decodeToken;
}

export const getUsernameUser = (token = null) => {
  const infoUser = decodeTokenFromLocalStorage(token);
  if(infoUser !== null) {
    return infoUser['username'];
  }
  return null;
}

export const isLogin = (token = null) => {
  let auth = token === null ? getTokenFromLocalStorage() : token;
  if(auth === null || auth === '' || auth === undefined){
    return false;
  }
  return true;
}
