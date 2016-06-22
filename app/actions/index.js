import {
  UPDATE_COORDINATS,
  STOP_RECORDING,
  START_RECORDING,
  CHANGE_CAMERA_TYPE,
  CHANGE_FLASH_MODE,
} from '../constants/constants';

export const updateCoordinats = (latitude, longitude) => (
  {
    type: UPDATE_COORDINATS,
    latitude,
    longitude,
  }
);

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
