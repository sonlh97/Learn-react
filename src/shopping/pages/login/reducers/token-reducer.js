import * as types from '../actions/types';

const initialState = {
  token: null
}

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_TOKEN:
      return {...state, token: action.token }
    case types.DELETE_TOKEN:
      return { ...state, token: action.token }
    default:
      return state;
  }
}
export default tokenReducer;