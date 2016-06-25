import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  RecyclerViewBackedScrollView,
} from 'react-native';

import Nav from './Nav';
import { getVideos } from '../utils/queries';
import { updateVideoList, updateCoordinats } from '../actions';
import VideoEntry from './VideoEntry';
import { getVideoDistanceInKm } from '../utils/orientation';



const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 3,
  },
  status: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left:0,
    right:0,
    height: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 0,
  },
  text: {
    fontSize: 26,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  videoList: {
    marginTop: 70,
    flex:1,
    marginBottom: 60,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
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

  _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  showLoadedVids() {
    if (this.store.getState().videos.videosLoaded) {
      return (
        <ListView
        style={style.list}
        automaticallyAdjustContentInsets={false}
        dataSource={this.store.getState().videos.dataSource}
        initialListSize={9}
        renderRow={this.renderItem}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        renderSeparator={this._renderSeperator}
      />);


    }
    return (
      <View style={style.loading}>
        <Text>Loading...</Text>
      </View>
    );
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
        <View style={style.status}>
          <View style={style.title}>
            <Text style={style.text}>Moments nearby</Text>
          </View>
        </View>
        <View style={style.videoList}>
        {this.showLoadedVids()}
        </View>
        <View style={style.navbar}>
          <Nav currentPage="videoList" />
        </View>
      </View>
    );
  }

}

module.exports = VideoList;

///////////////////////////////////////////

////////////////////////////////////////////

