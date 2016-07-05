import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';

import VideoList from './VideoList';
import coverImage from '../assets/images/desert3.jpg';
import redHeart from '../assets/images/btnRedHeart.png';
import Icon from 'react-native-vector-icons/FontAwesome';


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
  userName: {
    color: 'rgb(255,255,255)',
    fontSize: 16,
    letterSpacing: 1,
    marginTop: 10,
  },
  momentCount: {
    color: 'rgb(255,255,255)',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,

  },
  momentText: {
    color: 'rgb(255,255,255)',
    fontSize: 12,
    opacity: 0.7,


  },
  refreshIcon: {
    // position: 'absolute',
    position: 'absolute',
    right: 20,
    top: 45,
    color: 'rgb(235,235,235)',
    backgroundColor: 'transparent',
  },
  mapIcon: {
    // position: 'absolute',
    position: 'absolute',
    left: 20,
    top: 45,
    color: 'rgb(235,235,235)',
    backgroundColor: 'transparent',
  },
  statusBar: {
    color: 'rgb(255,255,255)',
  },
  filtersWrap: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    // backgroundColor: 'blue',
    height: 38,
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
    height: 14.5,
    resizeMode: 'contain',
  },
});

const Profile = ({ store }) => (
  <View style={styles.container}>
    <StatusBar
      barStyle="light-content"
    />
    <Image style={styles.coverImage} source={coverImage} >
      <View style={styles.textWrap}>
        <Image style={styles.avatar} source={{ uri: store.getState().user.pictureUrl }} />
        <Text style={styles.userName}>
          {store.getState().user.name}
        </Text>

        <Text style={styles.momentCount}>
          35
        </Text>
        <Text style={styles.momentText}>
          Moments
        </Text>
      </View>
    </Image>
    <Icon
      style={styles.refreshIcon}
      name="undo"
      size={24}
      color="rgb(255,255,255)"
    />
    <Icon
      style={styles.mapIcon}
      name="map-o"
      size={24}
      color="rgb(255,255,255)"
    />
    <View style={styles.filtersWrap}>
      <View style={styles.firstFilterWrap}>
        <Image style={styles.redHeart} source={redHeart} />
      </View>
      <View style={styles.secondFilterWrap}>
        <Icon
          name="clock-o"
          size={20}
        />
      </View>
      <View style={styles.thirdFilterWrap}>
        <Icon
          name="list-ul"
          size={20}
        />
      </View>
    </View>
    <VideoList mode="user" store={store} />
  </View>
);

Profile.propTypes = {
  store: React.PropTypes.object,
};

module.exports = Profile;
