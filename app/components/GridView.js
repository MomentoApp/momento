import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import VideoList from './VideoList';
import coverImage from '../assets/images/momento.jpg';
import redHeart from '../assets/images/btnRedHeart.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAllVideos } from '../utils/queries.js';
import getHeaders from '../utils/helpers';
import { updateAllVideosList } from '../actions';
import { Actions } from '../../custom_modules/react-native-router-flux';
import { updateCurrentPosition } from '../utils/navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(246,246,246)',
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginTop: 50,

  },
  coverImage: {
    height: 208,
    resizeMode: 'contain',
  },
  textWrap: {
    flex: 1,
    backgroundColor: 'rgba(25,25,25,0.7)',
    alignItems: 'center',
  },
  momentsNearby: {
    color: 'rgb(255,255,255)',
    fontSize: 18,
    letterSpacing: 1,
    marginTop: 35,
  },
  momentCount: {
    color: 'rgb(255,255,255)',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
  },
  momentText: {
    color: 'rgb(255,255,255)',
    fontSize: 16,
    opacity: 0.7,
  },
  refreshIcon: {
    // position: 'absolute',
    color: 'rgb(235,235,235)',
    backgroundColor: 'transparent',
  },
  refreshWrap: {
    position: 'absolute',
    right: 20,
    top: 45,
  },
  mapIcon: {
    color: 'rgb(235,235,235)',
    backgroundColor: 'transparent',
  },
  mapWrap: {
    position: 'absolute',
    left: 20,
    top: 45,
  },
  statusBar: {
    color: 'rgb(255,255,255)',
  },
  filtersWrap: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    // backgroundColor: 'blue',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstFilterWrap: {
    flex: 0.3333333,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  secondFilterWrap: {
    flex: 0.3333333,
    // backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  thirdFilterWrap: {
    flex: 0.3333333,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  redHeart: {
    height: 18,
    resizeMode: 'contain',
  },
});

class GridView extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.updateVideos = this.updateVideos.bind(this);
  }


  componentWillMount() {
    this.updateVideos();
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateVideos() {
    updateCurrentPosition(this.store, () =>
      getAllVideos(getHeaders(this.store), this.store.getState().position,
        (videos) => { this.store.dispatch(updateAllVideosList(videos)); }));
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" hidden={false} />
        <Image style={styles.coverImage} source={coverImage} >
          <View style={styles.textWrap}>
            <Text style={styles.momentsNearby}>
              Moments nearby
            </Text>
            <Text style={styles.momentCount}>
              {this.store.getState().videos.videos.length}
            </Text>
            <Text style={styles.momentText}>
              {this.store.getState().videos.userVideos.length === 1 ? 'Moment' : 'Moments'}
            </Text>
          </View>
        </Image>
        <TouchableOpacity style={styles.refreshWrap} onPress={this.updateVideos}>
          <Icon
            style={styles.refreshIcon}
            name="undo"
            size={24}
            color="rgb(255,255,255)"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapWrap} onPress={Actions.map}>
          <Icon
            style={styles.mapIcon}
            name="map-o"
            size={24}
            color="rgb(255,255,255)"
          />
        </TouchableOpacity>
        <View style={styles.filtersWrap}>
          <View style={styles.firstFilterWrap}>
            <TouchableOpacity>
              <Image style={styles.redHeart} source={redHeart} />
            </TouchableOpacity>
          </View>
          <View style={styles.secondFilterWrap}>
            <TouchableOpacity>
              <Icon
                name="clock-o"
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.thirdFilterWrap}>
            <TouchableOpacity>
              <Icon
                name="list-ul"
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
        <VideoList mode="all" store={this.store} />
      </View>
    );
  }
}

GridView.propTypes = {
  store: React.PropTypes.object,
};

module.exports = GridView;
