import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Text,
} from 'react-native';

import Camera from 'react-native-camera';
import Nav from './Nav';
import THREE_JS_RENDER from '../lib/render.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    </style>
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r78/three.js"></script>
    ${THREE_JS_RENDER}
  </body>
</html>`;


class ARView extends Component {
  constructor(props) {
    super(props);
    // load settings from props otherwise use defaults
    this.state = {
      testObj: null,
    };
  }

  componentDidMount() {
    if (!navigator.geolocation) { console.log('geoloaction not available'); }
    if (navigator.geolocation) { console.log('geoloaction available'); }
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        this.setState({ initialPosition });
      },
      (error) => alert('error trying to find initial position', error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      // if we want function on position change, it should go here
      // this.state.changePosFunction(lastPosition);
      this.setState({ latitude: lastPosition.coords.latitude });
      this.setState({ longitude: lastPosition.coords.longitude });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
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
          <Text style={styles.developerText}>Latitude: {this.state.latitude}</Text>
          <Text style={styles.developerText}>Longitude: {this.state.longitude}</Text>
        </View>


        {(() => {       
          const latitude = Number(Number(this.state.latitude).toFixed(3));
          const longitude = Number(Number(this.state.longitude).toFixed(3));
          if (this.state.testObj !== null) {
            return this.state.testObj.map(data => {
              console.log(data.point.coordinates);
              const lat = Number(Number(data.point.coordinates[0]).toFixed(3));
              const longt = Number(Number(data.point.coordinates[1]).toFixed(3));
              if ((latitude === lat) && (longitude === longt)) {
                console.log('HELOOOOO');
                return (
                  <View style={styles.webViewWrap}>
                    <WebView
                      style={styles.webView}
                      source={{ html: html }}
                    />
                  </View>
                );
              }
            });
          }
        })()}
        <Nav currentPage="ar" />
      </View>
    );
  }
}

module.exports = ARView;
