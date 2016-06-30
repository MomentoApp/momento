import Camera from 'react-native-camera';
import {
  START_RECORDING,
  STOP_RECORDING,
  CHANGE_CAMERA_TYPE,
  CHANGE_FLASH_MODE,
  CHANGE_CAMERA_VISIBILITY_FLAG,
  SWITCH_CAMERA_AR_OR_VIDEO,
  VIDEO,
} from '../constants';

const initialState = {
  aspect: Camera.constants.Aspect.fill,
  captureTarget: Camera.constants.CaptureTarget.disk,
  type: Camera.constants.Type.back,
  orientation: Camera.constants.Orientation.auto,
  flashMode: Camera.constants.FlashMode.auto,
  recording: false,
  visibilityFlag: false,
  ARorVideo: VIDEO,
};

const cameraReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_RECORDING:
      return Object.assign({}, state, { recording: true });
    case STOP_RECORDING:
      return Object.assign({}, state, { recording: false });
    case CHANGE_CAMERA_TYPE:
      return Object.assign({}, state, { type: action.viewType });
    case CHANGE_FLASH_MODE:
      return Object.assign({}, state, { flashMode: action.mode });
    case CHANGE_CAMERA_VISIBILITY_FLAG:
      return Object.assign({}, state, { visibilityFlag: action.visibilityFlag });
    case SWITCH_CAMERA_AR_OR_VIDEO:
      return Object.assign({}, state, { ARorVideo: action.mode });
    default:
      return state;
  }
};

module.exports = cameraReducer;
