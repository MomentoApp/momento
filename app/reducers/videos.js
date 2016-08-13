import {
  SET_CURRENT_VIDEO,
  UPDATE_ALL_VIDEOS_LIST,
  UPDATE_USER_VIDEOS_LIST,
  SET_VIDEO_TITLE,
  SET_THUMBNAIL_PATH,
  SET_THUMBNAIL_URL,
  SET_PREVIEW_VIDEO,
} from '../constants';

const initialState = {
  videosLoaded: false,
  userVideosLoaded: false,
  currentVideo: {},
  userVideos: [],
  videos: [],
};

export default function (state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_CURRENT_VIDEO: {
      newState = Object.assign({}, state);
      newState.currentVideo = newState.currentVideo || {};
      let currentVideo = Object.assign(newState.currentVideo, action.data);
      if (Object.keys(action.data).length === 0) currentVideo = action.data;
      newState.currentVideo = currentVideo;
      return newState;
    }
    case SET_VIDEO_TITLE: {
      newState = Object.assign({}, state);
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
    case SET_THUMBNAIL_PATH: {
      newState = Object.assign({}, state);
      newState.currentVideo = newState.currentVideo || {};
      newState.currentVideo.thumbnailPath = action.path;
      return newState;
    }
    case SET_PREVIEW_VIDEO:
      return Object.assign(
        {}, state, { previewVideo: action.video }
      );
    case SET_THUMBNAIL_URL: {
      newState = Object.assign({}, state);
      newState.currentVideo = newState.currentVideo || {};
      newState.currentVideo.thumbnailUrl = action.url.url;
      return newState;
    }
    default:
      return state;
  }
}
