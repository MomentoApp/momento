/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Scene, Actions, Router } from 'react-native-router-flux';
// import Entry from './app/components/Entry';
import CameraView from './app/components/CameraView';
import ARView from './app/components/ARView';
import VideoPlayer from './app/components/VideoPlayer';
import UploadView from './app/components/UploadView';
import SubmitView from './app/components/SubmitView';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/rootReducer.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';

// create logger
const logger = createLogger();
// create store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promise, logger)
);

const scenes = Actions.create(
  <Scene store={store} key="root" hideNavBar>
    <Scene store={store} key="camera" component={CameraView} initial title="Camera" hideNavBar />
    <Scene store={store} key="ar" component={ARView} title="AR" hideNavBar />
    <Scene store={store} key="videoPlayer" component={VideoPlayer} title="Video player" hideNavBar />
    <Scene store={store} key="uploadView" component={UploadView} title="Upload" hideNavBar />
    <Scene store={store} key="submit" component={SubmitView} title="Submit" hideNavBar />
  </Scene>
);

const momento = () => (
  <Provider store={store}>
    <Router scenes={scenes} />
  </Provider>
);

AppRegistry.registerComponent('momento', () => momento);
