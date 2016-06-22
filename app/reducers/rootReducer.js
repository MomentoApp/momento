import { combineReducers } from 'redux';
import position from './position';

const rootReducer = combineReducers({
  position,
});

module.exports = rootReducer;
