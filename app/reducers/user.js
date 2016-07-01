import { STORE_USER_CREDENTIALS, DELETE_USER_CREDENTIALS } from '../constants';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_CREDENTIALS:
      return Object.assign({}, state, { credentials: action.data.credentials });
    case DELETE_USER_CREDENTIALS: {
      const newState = Object.assign({}, state);
      delete newState.credentials;
      return newState;
    }
    default:
      return state;
  }
};

module.exports = userReducer;
