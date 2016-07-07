import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from '../../custom_modules/react-native-router-flux';
import {
  stopRecording,
  startRecording,
  changeFlashMode,
  changeCameraType,
  setCurrentVideo,
  setThumbnailPath,
  updateAllVideosList,
} from '../actions';

import rearCameraIcon from './../assets/camera/ic_camera_rear_white.png';
import frontCameraIcon from './../assets/camera/ic_camera_front_white.png';
import flashAutoIcon from './../assets/camera/ic_flash_auto_white.png';
import flashOnIcon from './../assets/camera/ic_flash_on_white.png';
import flashOffIcon from './../assets/camera/ic_flash_off_white.png';
import videoCameraIcon from './../assets/camera/ic_video_camera_36pt.png';
import stopCameraIcon from './../assets/camera/ic_stop_camera_36pt.png';
import { MODE_SUBMIT, VIDEO, AR } from '../constants';
import { getAllVideos } from '../utils/queries.js';
import getHeaders from '../utils/helpers';
import WebViewBridge from 'react-native-webview-bridge';
import THREE_JS_RENDER from '../lib/render.js';
import LocationMath from '../lib/locationMath.js';
import HANDLE_ORIENTATION from '../lib/orientationHandler.js';
import { updateCurrentPosition } from '../utils/navigation';


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  // AR styles
  webViewWrap: {
    position: 'absolute',
    top: -13,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  webView: {
    backgroundColor: 'transparent',
  },
  preview: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  developerWrap: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
  },
  developerText: {
    color: 'red',
    backgroundColor: 'transparent',
  },

});


// ***************************************************


const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8>
    <title>My first Three.js app</title>
    <style>
      body { margin: 0; }
      canvas { width: 100%; height: 100% }
      //.output { color: red; margin-top: 50px}
    </style>
  </head>
  <body>

    <pre class="output"></pre>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r78/three.js"></script>
    <script src="https://code.jquery.com/jquery-3.0.0.js" integrity="sha256-jrPLZ+8vDxt2FnE1zvZXCkCcebI/C8Dt5xyaQBjxQIo=" crossorigin="anonymous"></script>
    ${THREE_JS_RENDER}
    ${HANDLE_ORIENTATION}
  </body>
</html>`;

const injectScript = `
  function webViewBridgeReady(cb) {
    //checks whether WebViewBridge exists in global scope.
    if (window.WebViewBridge) {
      cb(window.WebViewBridge);
      return;
    }

    function handler() {
      //remove the handler from listener since we don't need it anymore
      document.removeEventListener('WebViewBridge', handler, false);
      //pass the WebViewBridge object to the callback
      cb(window.WebViewBridge);
    }

    //if WebViewBridge doesn't exist in global scope attach itself to document
    //event system. Once the code is being injected by extension, the handler will
    //be called.
    document.addEventListener('WebViewBridge', handler, false);
  }

  webViewBridgeReady( function (webViewBridge) {
    webViewBridge.send( "BRIDGE_READY" );
    
    webViewBridge.onMessage = function (message) {

      // Message is an array of all of the memories we want to display,
      // where x and z on each pin is the relative location to the
      // device in feet. It also holds video thumbnails
      var message = JSON.parse( message );

      message.locs.forEach( function( loc, i ) {
        geometry = new THREE.SphereGeometry( 30, 32, 32 );
        loader = new THREE.TextureLoader();
        texture = loader.load(loc.thumbnail);
        material = new THREE.MeshBasicMaterial( { map: texture } );
        meshes[i] = new THREE.Mesh( geometry, material );
        meshes[i].visible = true;
        scene.add(meshes[i]);
        meshes[i].position.x = loc.x;
        meshes[i].position.z = loc.z; 
        meshes[i].position.y = 20;
      });
    };
  });
`;

// ***************************************************

class CameraView extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.store = this.props.store;
    this.recordVideo = this.recordVideo.bind(this);
    this.switchType = this.switchType.bind(this);
    this.switchFlash = this.switchFlash.bind(this);
    this.updateVideos = this.updateVideos.bind(this);
    this.onBridgeMessage = this.onBridgeMessage.bind(this);
    this.state = {
      recordingTime: '00:00',
    };
  }

// *********** AR VIEW METHODS ************

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentWillMount() {
    this.updateVideos();
  }

  onBridgeMessage(message) {
    if (message === 'BRIDGE_READY') {
      this.sendLocsToBridge.call(this, this.getCurrentLocation());
    }
  }

  getCurrentLocation() {
    const currentLocation = { latitude: null, longitude: null };
    const latitude = this.store.getState().position.latitude;
    const longitude = this.store.getState().position.longitude;
    currentLocation.latitude = latitude;
    currentLocation.longitude = longitude;
    return currentLocation;
  }

  updateVideos() {
    updateCurrentPosition(this.store, () =>
      getAllVideos(getHeaders(this.store), this.store.getState().position,
        (videos) => { this.store.dispatch(updateAllVideosList(videos)); }));
  }

  calculateLocations(currentLocation, locObj) {
    const locations = [];
    locObj.forEach(loc => {
      locations.push(LocationMath.relativeLocsInFeet(currentLocation, loc));
    });

    return locations;
  }


  sendLocsToBridge(coordinates) {
    const message = {};
    message.locs = this.calculateLocations(coordinates, this.store.getState().videos.videos);
    this.refs.webviewbridge.sendToBridge(JSON.stringify(message));
  }


// ****************************************

  topBarOverlayStyle() {
    return this.store.getState().camera.recording
      ? { backgroundColor: 'rgba(255, 0, 0, 0.4)' }
      : { backgroundColor: 'rgba(0, 0, 0, 0.4)' };
  }

  runTimer(mode) {
    const context = this;
    if (mode) {
      const startDate = new Date();
      this.setState({ timer: setInterval(() => {
        const timeNow = new Date();
        let seconds = Math.floor((timeNow - startDate) / 1000);
        if (seconds === 5) {
          context.camera.capture({ mode: Camera.constants.CaptureMode.still })
            .then(data => context.store.dispatch(setThumbnailPath(data.path)));
        }
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
    const context = this;
    if (this.camera) {
      if (!this.store.getState().camera.recording) {
        console.log('about to start ', this.store.getState().camera.recording);
        this.store.dispatch(startRecording());
        this.runTimer(true);
        this.camera.capture()
          .then((data) => {
            if (!context.store.getState().videos.currentVideo.thumbnailPath) {
              // if there is no thumbnail, take one
              context.camera.capture({ mode: Camera.constants.CaptureMode.still })
              .then(picture => context.store.dispatch(setThumbnailPath(picture.path)))
              .then(() => {
                const video = Object.assign({}, data, { url: data.path });
                delete video.path;
                context.store.dispatch(setCurrentVideo(video));
                const redirect = () => { Actions.videoPlayer({ mode: MODE_SUBMIT }); };
                redirect();
              });
            } else {
              const video = Object.assign({}, data, { url: data.path });
              delete video.path;
              context.store.dispatch(setCurrentVideo(video));
              const redirect = () => { Actions.videoPlayer({ mode: MODE_SUBMIT }); };
              redirect();
            }
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

  renderAREngine() {
    if (this.store.getState().camera.ARorVideo === AR) {
      return (
        <View
          style={styles.webViewWrap}
          onStartShouldSetResponder={(e) => {
            console.log([e.nativeEvent.pageX, e.nativeEvent.pageY]);
            const { height, width } = Dimensions.get('window');
            console.log('width and height of the screen', [width, height]);
            if (
              e.nativeEvent.pageX <= width * 0.75 &&
              e.nativeEvent.pageX >= width * 0.25 &&
              e.nativeEvent.pageY <= height * 0.75 &&
              e.nativeEvent.pageY >= height * 0.25
            ) {
              this.store.dispatch(setCurrentVideo(this.store.getState().videos.videos[this.store.getState().videos.videos.length - 1]));
              Actions.videoPlayerWatch();
            }
          }}
        >
          <WebViewBridge
            ref="webviewbridge"
            onBridgeMessage={this.onBridgeMessage}
            injectedJavaScript={injectScript}
            style={styles.webView}
            source={{ html }}
          />
        </View>
      );
    }
    return null;
  }

  renderARDevWrap() {
   if (this.store.getState().camera.ARorVideo === AR) {
     return (
       <View style={styles.developerWrap}>
         <Text style={styles.developerText}>
           Latitude: {this.store.getState().position.latitude}
         </Text>
         <Text style={styles.developerText}>
           Longitude: {this.store.getState().position.longitude}
         </Text>
       </View>
     );
   }
   return null;
 }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
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

        {this.renderAREngine()}

      </View>
    );
  }
}
        // {this.renderARDevWrap()}


CameraView.propTypes = {
  store: React.PropTypes.object,
};

module.exports = CameraView;






