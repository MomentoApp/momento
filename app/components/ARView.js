import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
} from 'react-native';
import Camera from 'react-native-camera';

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

class ARView extends Component {
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
        <View style={styles.webViewWrap}>
          <WebView
            style={styles.webView}
            source={{ html: html }}
          />
        </View>
      </View>
    );
  }
}

module.exports = ARView;



















