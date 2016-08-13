import React, { Component } from 'react';
import { StyleSheet, MapView, View, StatusBar } from 'react-native';
import { updateCoordinats } from '../actions';

const style = StyleSheet.create({
  container: {
    flex: 1,
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
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const region = {
      latitude: this.store.getState().position.latitude,
      longitude: this.store.getState().position.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    // const markers = [
    //   {
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     title: 'My marker',
    //     description: 'This is description for marker',
    //   },
    // ];

    const TestMarkers = this.store.getState().videos.videos.map(video => (
      {
        latitude: video.point.coordinates[0],
        longitude: video.point.coordinates[1],
        title: video.title || 'no title available',
        description: 'Description for the marker',
      }
    ));

    console.log(TestMarkers);

        // followUserLocation
        // followUserLocation
    return (
      <View style={style.container}>
        <StatusBar barStyle="light-content" hidden={false} />
        <MapView
          style={style.map}
          region={region}
          annotations={TestMarkers}
          showsUserLocation
        />
      </View>
    );
  }
}

VideoMap.propTypes = {
  store: React.PropTypes.object,
};

module.exports = VideoMap;
