import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Scene, Actions, Router } from 'react-native-router-flux';
// import Entry from './app/components/Entry';
import CameraView from './app/components/CameraView';
import ARView from './app/components/ARView';
import VideoPlayer from './app/components/VideoPlayer';
import SubmitView from './app/components/SubmitView';
import VideoList from './app/components/VideoList';

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
  <Scene key="root" hideNavBar>
    <Scene key="camera" component={CameraView} title="Camera" hideNavBar />
    <Scene key="ar" component={ARView} title="AR" hideNavBar />
    <Scene key="videoPlayer" component={VideoPlayer} title="Video player" hideNavBar />
    <Scene key="submit" component={SubmitView} title="Submit" hideNavBar />
    <Scene key="videoList" component={VideoList} title="Video list" initial hideNavBar />
  </Scene>
);

const momento = () => (
  <Provider store={store}>
    <Router scenes={scenes} store={store} />
  </Provider>
);

AppRegistry.registerComponent('momento', () => momento);
