import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AlertIOS,
  Text,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';


import { Actions } from '../../custom_modules/react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MODE_SUBMIT } from '../constants';
import { setVideoTitle, popNeeded } from '../actions';

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
    console.log('VIDEO PLAYER RECEIVED THESE PROPS', props);
    this.store = props.store;
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

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  performPop() {
    this.store.dispatch(popNeeded(false));
    Actions.pop();
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
    AlertIOS.prompt(
      'Name your moment',
      null,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: title => {
          this.store.dispatch(setVideoTitle(title));
          Actions.submit();
        } },
      ]
);
  }

  renderControls() {
    if (this.props.mode === MODE_SUBMIT) {
      return (
        <View style={styles.ctrlBtnWrap}>
          <TouchableOpacity style={styles.ctrlBtn} onPress={Actions.pop}>
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
    // } else if (this.props.mode === MODE_WATCH) {

    return (
      <View style={styles.ctrlBtnWrap}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={Actions.pop}>
          <Text style={styles.ctrlBtnText}>
            Go Back
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
            source={{ uri: this.store.getState().videos.currentVideo.url }}
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
              {this.renderControls()}
            </View>
          </View>
        </View>

      </View>
    );
  }
}

VideoPlayer.propTypes = {
  store: React.PropTypes.object,
  mode: React.PropTypes.string,
};

module.exports = VideoPlayer;
