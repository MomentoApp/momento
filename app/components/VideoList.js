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

const styles = StyleSheet.create({
  list: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'red',
  },
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
    alignSelf: 'stretch',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    // backgroundColor: 'green',
    // height: 124,
    // width: 124,
    marginRight: 1,
    marginBottom: 1,
    // flex: 0.3333333,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
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
            contentContainerStyle={styles.list}
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
            contentContainerStyle={styles.list}
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
      <View style={styles.loading}>
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
      <View style={styles.videoContainer}>
        <VideoEntry video={vid} store={this.store} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.showLoadedVids()}

      </View>
    );
  }

}

module.exports = VideoList;
