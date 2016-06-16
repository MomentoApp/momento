import React, { Component } from 'React';
import {
  View, 
  StyleSheet
} from 'react-native';
import Camera from 'react-native-camera';

class CameraView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Camera />
    );
  }
}

module.exports = CameraView;