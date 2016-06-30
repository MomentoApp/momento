import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from '../../custom_modules/react-native-router-flux';
import {
  stopRecording,
  startRecording,
  changeFlashMode,
  changeCameraType,
  setCurrentVideo } from '../actions';

import rearCameraIcon from './../assets/camera/ic_camera_rear_white.png';
import frontCameraIcon from './../assets/camera/ic_camera_front_white.png';
import flashAutoIcon from './../assets/camera/ic_flash_auto_white.png';
import flashOnIcon from './../assets/camera/ic_flash_on_white.png';
import flashOffIcon from './../assets/camera/ic_flash_off_white.png';
import videoCameraIcon from './../assets/camera/ic_video_camera_36pt.png';
import stopCameraIcon from './../assets/camera/ic_stop_camera_36pt.png';
import { MODE_SUBMIT, VIDEO } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 52,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 20,
  },
  redBorderWrap: {
    flex: 1,
    padding: 6,
    backgroundColor: 'rgba(223,70,70,1)',
    borderRadius: 50,
  },
  captureButton: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  timeWrap: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    top: 20,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  time: {
    color: 'white',
    fontWeight: '300',
    fontSize: 20,
  },
});


class CameraView extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.store = this.props.store;
    this.recordVideo = this.recordVideo.bind(this);
    this.switchType = this.switchType.bind(this);
    this.switchFlash = this.switchFlash.bind(this);
    this.state = {
      recordingTime: '00:00',
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

  topBarOverlayStyle() {
    return this.store.getState().camera.recording
      ? { backgroundColor: 'rgba(255, 0, 0, 0.4)' }
      : { backgroundColor: 'rgba(0, 0, 0, 0.4)' };
  }

  runTimer(mode) {
    if (mode) {
      const startDate = new Date();
      this.setState({ timer: setInterval(() => {
        const timeNow = new Date();
        let seconds = Math.floor((timeNow - startDate) / 1000);
        seconds = seconds % 60 < 10 ? `0${(seconds % 60)}` : seconds % 60;
        let minutes = Math.floor(seconds / 60);
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        this.setState({ recordingTime: `${minutes}:${seconds}` });
      }, 1000) });
    } else {
      this.setState({ recordingTime: '00:00' });
      clearInterval(this.state.timer);
    }
  }

  recordVideo() {
    if (this.camera) {
      if (!this.store.getState().camera.recording) {
        console.log('about to start ', this.store.getState().camera.recording);
        this.store.dispatch(startRecording());
        this.runTimer(true);
        this.camera.capture()
          .then((data) => {
            const video = Object.assign({}, data, { url: data.path });
            delete video.path;
            this.store.dispatch(setCurrentVideo(video));
            const redirect = () => { Actions.videoPlayer({ mode: MODE_SUBMIT }); };
            redirect();
          })
          .catch(err => console.error(err));
      } else {
        this.store.dispatch(stopRecording());
        this.runTimer(false);
        this.camera.stopCapture();
      }
    }
  }

  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.store.getState().camera.type === back) {
      newType = front;
    } else if (this.store.getState().camera.type === front) {
      newType = back;
    }

    this.store.dispatch(changeCameraType(newType));
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;
    if (this.store.getState().camera.type === back) {
      icon = rearCameraIcon;
    } else if (this.store.getState().camera.type === front) {
      icon = frontCameraIcon;
    }
    return icon;
  }

  switchFlash() {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.store.getState().camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.store.getState().camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.store.getState().camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.store.dispatch(changeFlashMode(newFlashMode));
  }


  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.store.getState().camera.flashMode === auto) {
      icon = flashAutoIcon;
    } else if (this.store.getState().camera.flashMode === on) {
      icon = flashOnIcon;
    } else if (this.store.getState().camera.flashMode === off) {
      icon = flashOffIcon;
    }

    return icon;
  }

  renderTopVideoBar() {
    if (this.store.getState().camera.ARorVideo === VIDEO) {
      return (
        <View style={[styles.overlay, styles.topOverlay, this.topBarOverlayStyle()]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  renderBottomVideoBar() {
    if (this.store.getState().camera.ARorVideo === VIDEO) {
      return (
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity
            style={styles.redBorderWrap}
            onPress={this.recordVideo}
          >
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.recordVideo}
            >
              {!this.store.getState().camera.recording
                ? <Image source={videoCameraIcon} />
                : <Image source={stopCameraIcon} />
              }
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  renderVideoTime() {
    if (this.store.getState().camera.ARorVideo === VIDEO) {
      return (
        <View style={styles.timeWrap}>
          <Text style={styles.time}>{this.state.recordingTime}</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.store.getState().camera.aspect}
          captureTarget={this.store.getState().camera.captureTarget}
          type={this.store.getState().camera.type}
          flashMode={this.store.getState().camera.flashMode}
          captureMode={Camera.constants.CaptureMode.video}
          defaultTouchToFocus
        />
        {this.renderTopVideoBar()}

        {this.renderBottomVideoBar()}

        {this.renderVideoTime()}

      </View>
    );
  }
}

CameraView.propTypes = {
  store: React.PropTypes.object,
};

module.exports = CameraView;

