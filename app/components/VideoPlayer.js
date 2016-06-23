import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AlertIOS,
  Text,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';


import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },

  playButtonWrap: {
    backgroundColor: 'transparent',
  },

  playButton: {
    backgroundColor: 'transparent',
  },

  togglePlayButton: {
    backgroundColor: 'transparent',
  },

  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300,
  },
  ctrlBtn: {
    // backgroundColor: 'red',
    borderWidth: 3,
    borderRadius: 35,
    borderColor: 'white',
    padding: 12,
    marginLeft: 10,
    marginRight: 10,

  },
  ctrlBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  ctrlBtnWrap: {
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
});

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    console.log('store is ', this.store);
    this.togglePlay = this.togglePlay.bind(this);
    this.tryToPause = this.tryToPause.bind(this);
    this.goToSubmit = this.goToSubmit.bind(this);
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      controls: true,
      paused: true,
      repeat: false,
    };
  }

  playButtonStyle() {
    return this.state.paused
      ? { opacity: 1 }
      : { opacity: 0 };
  }

  togglePlay() {
    console.log('toggling play');
    this.setState({ paused: !this.state.paused });
    this.setState({ buttonText: this.state.buttonText === 'Play' ? 'Pause' : 'Play' });
    console.log('STYLES:', JSON.stringify(styles.playButtonWrap));
  }

  tryToPause() {
    if (!this.state.paused) {
      this.setState({ paused: true });
    }
  }

  goToSubmit() {
    Actions.submit();
  }

  renderControlButtons() {
    return (
      <View style={styles.ctrlBtnWrap}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={Actions.camera}>
          <Text style={styles.ctrlBtnText}>
            Go Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ctrlBtn}
          onPress={this.goToSubmit}
        >
          <Text style={styles.ctrlBtnText}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const videoStyle = this.state.skin === 'embed' ? styles.nativeVideoControls : styles.fullScreen;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={this.tryToPause}>
          <Video
            source={{ uri: this.store.getState().videos.currentVideo.path }}
            style={videoStyle}
            rate={1}
            paused={this.state.paused}
            volume={1}
            muted={false}
            resizeMode="contain"
            onEnd={() => { AlertIOS.alert('Done!'); }}
            repeat={this.state.repeat}
            controls={false}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButtonWrap} onPress={this.togglePlay}>
          <Icon
            style={[styles.playButton, this.playButtonStyle()]}
            name="play-circle"
            size={100}
            color="white"
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {this.renderControlButtons()}
            </View>
          </View>
        </View>

      </View>
    );
  }
}

VideoPlayer.propTypes = {
  store: React.PropTypes.object,
};

module.exports = VideoPlayer;
