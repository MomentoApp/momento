import { combineReducers } from 'redux';
import position from './position';
import camera from './camera';
import videos from './videos';

const rootReducer = combineReducers({
  camera,
  position,
  videos,
});

module.exports = rootReducer;
