import { UPDATE_COORDINATS } from '../constants/constants';

export const updateCoordinats = (latitude, longitude) => (
  {
    type: UPDATE_COORDINATS,
    latitude,
    longitude,
  }
);
