import {
  UPDATE_COORDINATS,
  STOP_RECORDING,
  START_RECORDING,
  CHANGE_CAMERA_TYPE,
  CHANGE_FLASH_MODE,
  INCREASE_RECORDING_TIME,
  CLEAR_RECORDING_TIME,
  SAVE_CLIP_DATA,
  UPDATE_VIDEO_LIST,
} from '../constants';

import { ListView } from 'react-native';
// position
export const updateCoordinats = (latitude, longitude) => (
  {
    type: UPDATE_COORDINATS,
    latitude,
    longitude,
  }
);
// camera
export const stopRecording = () => (
  {
    type: STOP_RECORDING,
  }
);

export const startRecording = () => {
  console.log('here');
  return {
    type: START_RECORDING,
  };
};

export const changeCameraType = (viewType) => (
  {
    type: CHANGE_CAMERA_TYPE,
    viewType,
  }
);

export const changeFlashMode = (mode) => (
  {
    type: CHANGE_FLASH_MODE,
    mode,
  }
);

export const increaseRecordingTime = (recordingTime) => (
  {
    type: INCREASE_RECORDING_TIME,
    recordingTime,
  }
);

export const clearRecordingTime = () => (
  {
    type: CLEAR_RECORDING_TIME,
  }
);
// videos
export const saveClipData = (data) => (
  {
    type: SAVE_CLIP_DATA,
    data,
  }
);
// update video list from database
export const updateVideoList = (videos) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return {
    type: UPDATE_VIDEO_LIST,
    dataSource: ds.cloneWithRows(videos),
    videos,
  };
};
