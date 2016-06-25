import React, { Component } from 'react';
import { StyleSheet, MapView, View } from 'react-native';
import { updateCoordinats } from '../actions';
import Nav from './Nav';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapWrap: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 0,
    borderWidth: 0,
    borderColor: '#000',
    backgroundColor: 'transparent',
  },
});

class VideoMap extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() =>
      this.forceUpdate()
    );

    navigator.geolocation.getCurrentPosition((initialPosition) => {
      this.store.dispatch(
        updateCoordinats(initialPosition.coords.latitude, initialPosition.coords.longitude)
      );
    }, (error) => console.log('error trying to find initial position', error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.store.dispatch(
        updateCoordinats(lastPosition.coords.latitude, lastPosition.coords.longitude)
      );
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const region = {
      latitude: this.store.getState().position.latitude,
      longitude: this.store.getState().position.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    const markers = [
      {
        latitude: 37.78825,
        longitude: -122.4324,
        title: 'My marker',
        description: 'This is description for marker',
      },
    ];

    const TestMarkers = this.store.getState().videos.videos.map(video => {
      return {
        latitude: video.point.coordinates[0],
        longitude: video.point.coordinates[1],
        title: video.title || 'no title available',
        description: 'Description for the marker',
      };
    });

    console.log(TestMarkers);

        // followUserLocation
        // followUserLocation
    return (
      <View style={style.container}>
        <View style={style.mapWrap}>
          <MapView
            style={style.map}
            region={region}
            annotations={TestMarkers}
            showsUserLocation
          />
        </View>
        <Nav style={style.nav} currentPage="videoMap" />
      </View>

    );
  }
}


module.exports = VideoMap;
