import {
  SET_CURRENT_VIDEO,
  UPDATE_ALL_VIDEOS_LIST,
  UPDATE_USER_VIDEOS_LIST,
  SET_VIDEO_TITLE,
} from '../constants';

const initialState = {
  videosLoaded: false,
  userVideosLoaded: false,
  currentVideo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_VIDEO:
      return Object.assign({}, state, { currentVideo: action.data });
    case SET_VIDEO_TITLE: {
      const newState = Object.assign({}, state);
      newState.currentVideo = newState.currentVideo || {};
      newState.currentVideo.title = action.title;
      return newState;
    }
    case UPDATE_ALL_VIDEOS_LIST:
      return Object.assign(
        {}, state, { videos: action.videos, dataSource: action.dataSource, videosLoaded: true }
      );
    case UPDATE_USER_VIDEOS_LIST:
      return Object.assign(
        {},
        state,
        { userVideos: action.videos, userDataSource: action.dataSource, userVideosLoaded: true }
      );
    default:
      return state;
  }
}
