import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
} from 'react-native';

import Nav from './Nav';
import { getVideos } from '../utils/queries';
import { updateVideoList, updateCoordinats } from '../actions';
import VideoEntry from './VideoEntry';
import { getVideoDistanceInKm } from '../utils/orientation';



const style = StyleSheet.create({
  list: {
    flex: 9,
  },
});

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.renderItem = this.renderItem.bind(this);
    getVideos( (videos) => {
      this.store.dispatch(updateVideoList(videos));
    });
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() =>
      this.forceUpdate()
    );

    if (!navigator.geolocation) { console.log('geoloaction not available'); }
    if (navigator.geolocation) { console.log('geoloaction available'); }
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        this.store.dispatch(
          updateCoordinats(initialPosition.coords.latitude, initialPosition.coords.longitude)
        );
      },
      (error) => alert('error trying to find initial position', error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );


    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      // if we want function on position change, it should go here
      // this.state.changePosFunction(lastPosition);
      this.store.dispatch(
        updateCoordinats(lastPosition.coords.latitude, lastPosition.coords.longitude)
      );
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    navigator.geolocation.clearWatch(this.watchID);
  }


  showLoadedVids() {
    if (this.store.getState().videos.videosLoaded) {
      return (<ListView
        style={style.list}
        dataSource={this.store.getState().videos.dataSource}
        renderRow={this.renderItem}
      />);
    }
    return (<Text>Loading</Text>);
  }

  renderItem(video) {
    const lat1 = video.point.coordinates[0];
    const lng1 = video.point.coordinates[1];
    const lat2 = this.store.getState().position.latitude;
    const lng2 = this.store.getState().position.longitude;
    // <View>
      // <Text>{getDistanceInKm(lat1, lng1, lat2, lng2)}URL:{video.url} LAT: {video.point.coordinates[0]}</Text>
    
    // </View>
    const kmAway = getVideoDistanceInKm(video, this.store.getState().position);
    const vid = Object.assign({}, { userName: 'awesomeUser', title: 'Some awesome title', kmAway });
    

    return (
      <View>
        <VideoEntry video={vid} />
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.showLoadedVids()}
        <Nav />
      </View>
    );
  }

}

module.exports = VideoList;

///////////////////////////////////////////

////////////////////////////////////////////

