require('es6-promise').polyfill();
require('fetch-everywhere');
import { updateCoordinats } from '../actions';

const updateCurrentPosition = (store, cb) => {
  navigator.geolocation.getCurrentPosition((initialPosition) => {
    store.dispatch(
      updateCoordinats(initialPosition.coords.latitude, initialPosition.coords.longitude)
    );
    cb();
  }, (error) => console.log('error trying to find initial position', error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
};

module.exports.updateCurrentPosition = updateCurrentPosition;
