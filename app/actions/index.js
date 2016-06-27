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

export const startRecording = () => {
  return {
    type: constants.START_RECORDING,
  };
};

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
// videos
export const saveClipData = (data) => (
  {
    type: constants.SAVE_CLIP_DATA,
    data,
  }
);

export const setVideoTitle = (title) => (
  {
    type: constants.SET_VIDEO_TITLE,
    title,
  }
);

// update video list from database
export const updateVideoList = (videos) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return {
    type: constants.UPDATE_VIDEO_LIST,
    dataSource: ds.cloneWithRows(videos),
    videos,
  };
};
