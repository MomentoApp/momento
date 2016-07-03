import {
  STORE_USER_CREDENTIALS,
  DELETE_USER_CREDENTIALS,
  SET_USER_NAME_EMAIL,
  SET_USER_PICTURE,
} from '../constants';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_CREDENTIALS:
      return Object.assign({}, state, action.data.credentials);
    case DELETE_USER_CREDENTIALS:
      return Object.assign({});
    case SET_USER_NAME_EMAIL:
      return Object.assign(
        {},
        state,
        { name: action.name, email: action.email }
      );
    case SET_USER_PICTURE:
      return Object.assign({}, state, { pictureUrl: action.pictureUrl });
    default:
      return state;
  }
};

module.exports = userReducer;
