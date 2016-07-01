import { combineReducers } from 'redux';
import position from './position';
import camera from './camera';
import videos from './videos';
import user from './user';

const rootReducer = combineReducers({
  camera,
  position,
  videos,
  user,
});

module.exports = rootReducer;
