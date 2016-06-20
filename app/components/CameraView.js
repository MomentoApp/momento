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
import Nav from './Nav';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    bottom: 65,
    // backgroundColor: 'rgba(0,0,0,0.4)',
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


export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.disk,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      recording: false,
      recordingTime: '00:00',
      videoUrl: 'url not found',
    };

    this.recordVideo = this.recordVideo.bind(this);
    this.switchType = this.switchType.bind(this);
    this.switchFlash = this.switchFlash.bind(this);
  }

  topBarOverlayStyle() {
    return this.state.recording
      ? { backgroundColor: 'rgba(255, 0, 0, 0.4)' }
      : { backgroundColor: 'rgba(0, 0, 0, 0.4)' };
  }

  runTimer(mode) {
    if (mode) {
      const startDate = new Date();
      this.setState({ timer: setInterval(() => {
        const timeNow = new Date();
        let seconds = Math.floor((timeNow - startDate) / 1000);
        seconds = seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60;
        let minutes = Math.floor(seconds / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        this.setState({ recordingTime: minutes + ':' + seconds });
      }, 1000) });
    } else {
      this.setState({ recordingTime: '00:00' });
      clearInterval(this.state.timer);
    }
  }

  recordVideo() {
    if (this.camera) {
      if (!this.state.recording) {
        this.setState({ recording: true });
        this.runTimer(true);
        this.camera.capture()
          .then((data) => {
            const redirect = () => { Actions.videoPlayer({ data }); };
            redirect();
          })
          .catch(err => console.error(err));
      } else {
        this.setState({ recording: false });
        this.runTimer(false);
        this.camera.stopCapture();
      }
    }
  }

  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('./../assets/camera/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('./../assets/camera/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash() {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('./../assets/camera/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('./../assets/camera/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('./../assets/camera/ic_flash_off_white.png');
    }

    return icon;
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
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          captureMode={Camera.constants.CaptureMode.video}
          defaultTouchToFocus
        />
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
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity
            style={styles.redBorderWrap}
            onPress={this.recordVideo}
          >
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.recordVideo}
            >
              {!this.state.recording
                ? <Image source={require('./../assets/camera/ic_video_camera_36pt.png')} />
                : <Image source={require('./../assets/camera/ic_stop_camera_36pt.png')} />
              }
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.timeWrap}>
          <Text style={styles.time}>{JSON.stringify(this.state.videoUrl)}</Text>
        </View>
          <Nav currentPage="camera" />
      </View>
    );
  }
}

