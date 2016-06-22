import { combineReducers } from 'redux';
import position from './position';
import camera from './camera';

const rootReducer = combineReducers({
  camera,
  position,
});

module.exports = rootReducer;
