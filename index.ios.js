import React from 'react';
import {
  StyleSheet,
  AppRegistry,
  Text,
} from 'react-native';
<<<<<<< 3ee955d0ba96328088bc6964eda45c1bea543c86
import { Scene, Actions, Router, Modal } from './custom_modules/react-native-router-flux';
import TabView from './app/containers/TabView';
=======
import { Scene, Actions, Router } from 'react-native-router-flux';
// import Entry from './app/components/Entry';
import CameraView from './app/components/CameraView';
import ARView from './app/components/ARView';
import VideoPlayer from './app/components/VideoPlayer';
import SubmitView from './app/components/SubmitView';
import VideoList from './app/components/VideoList';
>>>>>>> Basic implementation of list view

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/rootReducer.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';

const TabIcon = ({ selected, title }) => (
  <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
);

// create logger
const logger = createLogger();
// create store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promise, logger)
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

// when renaming the scenes, be aware that some of their keys
// are used in custom_modules/react-native-router-flux/src/TabBar
const scenes = Actions.create(
<<<<<<< 3ee955d0ba96328088bc6964eda45c1bea543c86
  <Scene key="modal" component={Modal} >
    <Scene key="root" hideNavBar>
      <Scene
        key="main"
        tabs
        tabBarStyle={styles.tabBarStyle}
        tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
      >
        <Scene key="videoWrap" title="Record" icon={TabIcon} hideNavBar>
          <Scene key="video" component={TabView} title="Record" icon={TabIcon} hideNavBar />
          <Scene
            key="videoPlayer"
            component={TabView}
            title="Video player"
            icon={TabIcon}
            hideNavBar
            hideTabBar
          />
          <Scene key="submit" component={TabView} title="Submit" icon={TabIcon} hideTabBar />
        </Scene>
        <Scene key="listWrap" title="Videos" initial icon={TabIcon} >
          <Scene key="list" component={TabView} title="Moments around you" icon={TabIcon} />
          <Scene
            key="videoPlayerForList"
            component={TabView}
            title="Video player"
            icon={TabIcon}
            hideNavBar
            hideTabBar
          />
        </Scene>
        <Scene key="map" component={TabView} title="Map" icon={TabIcon} />
      </Scene>
      <Scene key="error" component={Error} />
    </Scene>
=======
  <Scene key="root" hideNavBar>
    <Scene key="camera" component={CameraView} title="Camera" hideNavBar />
    <Scene key="ar" component={ARView} title="AR" hideNavBar />
    <Scene key="videoPlayer" component={VideoPlayer} title="Video player" hideNavBar />
    <Scene key="submit" component={SubmitView} title="Submit" hideNavBar />
    <Scene key="videoList" component={VideoList} title="Video list" initial hideNavBar />
>>>>>>> Basic implementation of list view
  </Scene>
);

const momento = () => (
  <Provider store={store}>
    <Router scenes={scenes} store={store} />
  </Provider>
);

AppRegistry.registerComponent('momento', () => momento);
