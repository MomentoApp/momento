import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CameraRoll,
} from 'react-native';
import Video from 'react-native-video';

// Later on in your styles..
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

 



class VideoPlayer extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    
    return (
          <Video
            source={{ uri: this.props.data.path }}
            style={styles.backgroundVideo}
            rate={1}
            paused={false}
            volume={1}
            muted={false}
            resizeMode='contain'
            repeat={false}
          />
          


    )
  }
}

module.exports = VideoPlayer;

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
