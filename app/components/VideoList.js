import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  RecyclerViewBackedScrollView,
} from 'react-native';


import VideoEntry from './VideoEntry';
import { getVideoDistanceInKm } from '../utils/orientation';
import { getAllVideos, getUserVideos } from '../utils/queries';
import { updateAllVideosList, updateUserVideosList, updateCoordinats } from '../actions';
import getHeaders from '../utils/helpers';
import { updateCurrentPosition } from '../utils/navigation';

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    marginBottom: 52,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    updateCurrentPosition(this.store,
    () => {
      if (this.props.mode !== 'user') {
        getAllVideos(
          getHeaders(this.store),
          this.store.getState().position,
          (videos) => { this.store.dispatch(updateAllVideosList(videos)); }
        );
      } else {
        getUserVideos(
          getHeaders(this.store),
          (videos) => { this.store.dispatch(updateUserVideosList(videos)); }
        );
      }
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

  _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          // height: adjacentRowHighlighted ? 4 : 1,
          // backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  showLoadedVids() {
    if (this.props.mode === 'user') {
      if (this.store.getState().videos.userVideosLoaded) {
        return (
          <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.store.getState().videos.userDataSource}
            initialListSize={9}
            renderRow={this.renderItem}
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
            renderSeparator={this._renderSeperator}
          />);
      }
    } else {
      if (this.store.getState().videos.videosLoaded) {
        return (
          <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.store.getState().videos.dataSource}
            initialListSize={9}
            renderRow={this.renderItem}
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
            renderSeparator={this._renderSeperator}
        />);
      }
    }



    return (
      <View style={style.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  renderItem(video) {
    // const lat1 = video.point.coordinates[0];
    // const lng1 = video.point.coordinates[1];
    // const lat2 = this.store.getState().position.latitude;
    // const lng2 = this.store.getState().position.longitude;
    // <View>
      // <Text>{getDistanceInKm(lat1, lng1, lat2, lng2)}URL:{video.url} LAT: {video.point.coordinates[0]}</Text>
    // </View>
    const kmAway = getVideoDistanceInKm(video, this.store.getState().position);
    const vid = Object.assign({}, video, { userName: 'awesomeUser', kmAway });

    return (
      <View>
        <VideoEntry video={vid} store={this.store} />
      </View>
    );
  }

  render() {
    return (
      <View style={style.container}>
        {this.showLoadedVids()}

      </View>
    );
  }

}

module.exports = VideoList;
