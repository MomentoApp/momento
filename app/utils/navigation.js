import { updateCoordinats } from '../actions';

const getCurrentPosition = (store) => {
  navigator.geolocation.getCurrentPosition((initialPosition) => {
    store.dispatch(
      updateCoordinats(initialPosition.coords.latitude, initialPosition.coords.longitude)
    );
  }, (error) => console.log('error trying to find initial position', error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
    this.store.dispatch(
      updateCoordinats(lastPosition.coords.latitude, lastPosition.coords.longitude)
    );
  });
};
