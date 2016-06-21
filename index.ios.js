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
import VideoPlayer from './app/components/VideoPlayer';
import UploadView from './app/components/UploadView';
import SubmitView from './app/components/SubmitView';

class momento extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="camera" component={CameraView} initial title="Camera" hideNavBar />
          <Scene key="ar" component={ARView} title="AR" hideNavBar />
          <Scene key="videoPlayer" component={VideoPlayer} title="Video player" hideNavBar />
          <Scene key="uploadView" component={UploadView} title="Upload" hideNavBar />
          <Scene key="submit" component={SubmitView} title="Submit" hideNavBar />
        </Scene>

      </Router>
    );
  }
}

AppRegistry.registerComponent('momento', () => momento);
