import {
  SAVE_CLIP_DATA,
} from '../constants/constants';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_CLIP_DATA:
      return Object.assign({}, state, { currentVideo: action.data });
    default:
      return state;
  }
}

