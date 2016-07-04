import * as constants from '../constants';

import { ListView } from 'react-native';
// position
export const updateCoordinats = (latitude, longitude) => (
  {
    type: constants.UPDATE_COORDINATS,
    latitude,
    longitude,
  }
);
// camera
export const stopRecording = () => (
  {
    type: constants.STOP_RECORDING,
  }
);

export const startRecording = () => (
  {
    type: constants.START_RECORDING,
  }
);

export const changeCameraType = (viewType) => (
  {
    type: constants.CHANGE_CAMERA_TYPE,
    viewType,
  }
);

export const changeFlashMode = (mode) => (
  {
    type: constants.CHANGE_FLASH_MODE,
    mode,
  }
);

export const increaseRecordingTime = (recordingTime) => (
  {
    type: constants.INCREASE_RECORDING_TIME,
    recordingTime,
  }
);

export const clearRecordingTime = () => (
  {
    type: constants.CLEAR_RECORDING_TIME,
  }
);

export const changeCameraVisibilityFlag = (visibilityFlag) => (
  {
    type: constants.CHANGE_CAMERA_VISIBILITY_FLAG,
    visibilityFlag,
  }
);

export const switchCameraAROrVideo = (mode) => (
  {
    type: constants.SWITCH_CAMERA_AR_OR_VIDEO,
    mode,
  }
);

// videos
export const setCurrentVideo = (data) => (
  {
    type: constants.SET_CURRENT_VIDEO,
    data,
  }
);

export const setThumbnailPath = (path) => (
  {
    type: constants.SET_THUMBNAIL_PATH,
    path,
  }
);

export const setVideoTitle = (title) => (
  {
    type: constants.SET_VIDEO_TITLE,
    title,
  }
);

// update all videos list from database
export const updateAllVideosList = (videos) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return {
    type: constants.UPDATE_ALL_VIDEOS_LIST,
    dataSource: ds.cloneWithRows(videos),
    videos,
  };
};


// user

// update user videos list from database
export const updateUserVideosList = (videos) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return {
    type: constants.UPDATE_USER_VIDEOS_LIST,
    dataSource: ds.cloneWithRows(videos),
    videos,
  };
};

export const storeUserCredentials = (data) => (
  {
    type: constants.STORE_USER_CREDENTIALS,
    data,
  }
);

export const deleteUserCredentials = () => (
  {
    type: constants.DELETE_USER_CREDENTIALS,
  }
);

export const setUserNameEmail = (name, email) => (
  {
    type: constants.SET_USER_NAME_EMAIL,
    name,
    email,
  }
);

export const setUserPicture = (token) => (
  {
    type: constants.SET_USER_PICTURE,
    pictureUrl: `https://graph.facebook.com/v2.6/me/picture?&height=200&width=200&access_token=${token}`,
  }
);
