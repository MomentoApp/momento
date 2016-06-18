/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import Entry from './app/components/Entry';
import CameraView from './app/components/CameraView';
import ARView from './app/components/ARView';

class momento extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="camera" component={CameraView} title="Camera" initial hideNavBar />
          <Scene key="ar" component={ARView} title="AR" hideNavBar />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('momento', () => momento);
