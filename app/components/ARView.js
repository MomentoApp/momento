import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Text,
} from 'react-native';

import Camera from 'react-native-camera';
import Nav from './Nav';
import { getVideos } from '../utils/queries';

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
    <script>
     
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setClearColor( 0x000000, 0 ); // the default
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      var geometry = new THREE.BoxGeometry(1,1,1);
      var material = new THREE.MeshBasicMaterial({color:0x00ff00});
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      function render() {
        requestAnimationFrame(render);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      render();

    </script>
  </body>
</html>`;




// this is a temporary test object that mimics the JSON that will be received from the db
let testObj = [
  {
    "id": 1,
    "url": "https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13448244_1764286310482288_2066918794_n.mp4",
    "point": {
      "type": "Point",
      "coordinates": [
        37.7837221,
        -122.4091839
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
        37.7847912,
        -122.40713522
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
        37.74267,
        -122.48634
      ]
    },
    "createdAt": "2016-06-17T05:17:34.996Z",
    "updatedAt": "2016-06-17T05:17:34.996Z",
    "UserId": 1
  }
]


class ARView extends Component {
  constructor(props) {
    super(props);
    // load settings from props otherwise use defaults
    this.state = {};
  }

  componentDidMount() {
    console.log('test before', testObj);
    getVideos('http://localhost:3000', (videos) => {
      console.log('got vids', videos);
      testObj = videos;
    });
    if (!navigator.geolocation) { console.log('geoloaction not available'); }
    if (navigator.geolocation) { console.log('geoloaction available'); }
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        console.log('initial position is', initialPosition);
        this.setState({ initialPosition });
      },
      (error) => alert('error trying to find initial position', error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      // if we want function on position change, it should go here
      // this.state.changePosFunction(lastPosition);

      console.log('lastPosition', lastPosition);
      this.setState({ latitude: lastPosition.coords.latitude });
      this.setState({ longitude: lastPosition.coords.longitude });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    console.log('test after',testObj);
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
            var latitude = Number(Number(this.state.latitude).toFixed(3));
            var longitude = Number(Number(this.state.longitude).toFixed(3));

            return testObj.map(function(data) {
              var lat = Number(Number(data.point.coordinates[0]).toFixed(3));
              var longt = Number(Number(data.point.coordinates[1]).toFixed(3));
              if ( (latitude === lat) && (longitude === longt) )  {
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
        })()}
        
        <Nav currentPage="ar" />
      </View>
    );
  }
}

module.exports = ARView;
