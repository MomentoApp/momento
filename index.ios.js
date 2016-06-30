import React from 'react';
import {
  StyleSheet,
  AppRegistry,
  Text,
} from 'react-native';
import { Scene, Actions, Router, Modal } from './custom_modules/react-native-router-flux';
import TabView from './app/containers/TabView';

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
  </Scene>
);

const momento = () => (
  <Provider store={store}>
    <Router scenes={scenes} store={store} />
  </Provider>
);

AppRegistry.registerComponent('momento', () => momento);
