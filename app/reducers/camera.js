import Camera from 'react-native-camera';
import {
  START_RECORDING,
  STOP_RECORDING,
  CHANGE_CAMERA_TYPE,
  CHANGE_FLASH_MODE,
} from '../constants/constants';

const initialState = {
  aspect: Camera.constants.Aspect.fill,
  captureTarget: Camera.constants.CaptureTarget.disk,
  type: Camera.constants.Type.back,
  orientation: Camera.constants.Orientation.auto,
  flashMode: Camera.constants.FlashMode.auto,
  recording: false,
};

export default function (state = initialState, action) {
  console.log('about to create ', Object.assign({}, state, { recording: true }));
  switch (action.type) {
    case START_RECORDING:
      return Object.assign({}, state, { recording: true });
    case STOP_RECORDING:
      return Object.assign({}, state, { recording: false });
    case CHANGE_CAMERA_TYPE:
      return Object.assign({}, state, { type: action.viewType });
    case CHANGE_FLASH_MODE:
      return Object.assign({}, state, { flashMode: action.mode });
    default:
      return state;
  }
}

