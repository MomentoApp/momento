import { UPDATE_COORDINATS } from '../constants/constants';

const initialState = { latitude: 100, longitude: 200 };

export default function (state = initialState, action) {
  console.log('yeah im here');
  switch (action.type) {
    case UPDATE_COORDINATS:
      return Object.assign({}, { latitude: action.latitude, longitude: action.longitude });
    default:
      return state;
  }
}
