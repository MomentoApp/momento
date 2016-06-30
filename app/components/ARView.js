import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Camera from 'react-native-camera';
import Nav from './Nav';
import WebViewBridge from 'react-native-webview-bridge';
import THREE_JS_RENDER from '../lib/render.js';
import LocationMath from '../lib/locationMath.js';
import HANDLE_ORIENTATION from '../lib/orientationHandler.js';
import { updateCoordinats } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 52,
  },
  webViewWrap: {
    position: 'absolute',
    top: 0,
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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  developerWrap: {
    position: 'absolute',
    top: 30,
    left: 10,
    right: 0,
    bottom: 0,
  },
  developerText: {
    color: 'red',
    backgroundColor: 'transparent',
  },
});

const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8>
    <title>My first Three.js app</title>
    <style>
      body { margin: 0; }
      canvas { width: 100%; height: 100% }
      .output { color: red; }
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
      // Message is an array of all of the pins we want to display,
      // where x and z on each pin is the relative location to the
      // device in feet.
      var message = JSON.parse( message );

      mesh.visible = false;
      message.locs.forEach( function( loc, i ) {
        meshes[i] = mesh.clone();
        meshes[i].visible = true;
        scene.add(meshes[i]);
        meshes[i].position.x = loc.x;
        meshes[i].position.z = loc.z;
      });
    };
  });
`;

let testObj = [
  {
    "id": 1,
    "url": "https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13448244_1764286310482288_2066918794_n.mp4",
    "point": {
      "type": "Point",
      "coordinates": [
        37.783832002659196,
        -122.40910136324729
      ]
    },
    "createdAt": "2016-06-17T05:17:34.996Z",
    "updatedAt": "2016-06-17T05:17:34.996Z",
    "UserId": 1
  },
  {
    "id": 2,
    "url": "https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13448244_1764286310482288_2066918794_n.mp4",
    "point": {
      "type": "Point",
      "coordinates": [
        37.7847912966740586,
        -122.40713522122437
      ]
    },
    "createdAt": "2016-06-17T05:17:34.996Z",
    "updatedAt": "2016-06-17T05:17:34.996Z",
    "UserId": 1
  },
  {
    "id": 3,
    "url": "https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13448244_1764286310482288_2066918794_n.mp4",
    "point": {
      "type": "Point",
      "coordinates": [
        37.7428727,
        -122.4861611
      ]
    },
    "createdAt": "2016-06-17T05:17:34.996Z",
    "updatedAt": "2016-06-17T05:17:34.996Z",
    "UserId": 1
  }
];

class ARView extends Component {
  constructor(props) {
    super(props);
    // const { store } = this.context;
    this.store = this.props.store;
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

  calculateLocations(currentLocation, locObj) {
    const locations = [];
    locObj.forEach(loc => {
      locations.push(LocationMath.relativeLocsInFeet(currentLocation, loc));
    });

    return locations;
  }

  sendLocsToBridge(coordinates) {
    const message = {};
    message.locs = this.calculateLocations(coordinates, testObj);
    this.refs.webviewbridge.sendToBridge(JSON.stringify(message));
  }


  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        />
        <View style={styles.developerWrap}>
          <Text style={styles.developerText}>
            Latitude: {this.store.getState().position.latitude}
          </Text>
          <Text style={styles.developerText}>
            Longitude: {this.store.getState().position.longitude}
          </Text>
        </View>
        <View style={styles.webViewWrap}>
          <WebViewBridge
            ref="webviewbridge"
            onBridgeMessage={this.onBridgeMessage.bind(this)}
            injectedJavaScript={injectScript}
            style={styles.webView}
            source={{ html }}
          />
        </View>
        <Nav currentPage="ar" />
      </View>
    );
  }
}

export default ARView;
