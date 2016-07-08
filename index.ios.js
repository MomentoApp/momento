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
import LoginContainer from './app/containers/LoginContainer';
import VideoPlayer from './app/components/VideoPlayer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MODE_WATCH } from './app/constants';

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
    backgroundColor: 'transparent',
  },
  tabBarSelectedItemStyle: {
    // color: 'rgb(0,0,0)',
  },
});

const TabIcon = ({ selected, title }) => {
  switch (title) {
    case 'Record':
      return (<Icon name="video-camera" size={24} color={selected ? 'rgb(38,38,38)' : 'rgb(155,155,155)'} />);
    case 'User Profile':
      return (<Icon name="user" size={24} color={selected ? 'rgb(38,38,38)' : 'rgb(155,155,155)'} />);
    case 'AR':
      return (<Icon name="eye" size={24} color={selected ? 'rgb(38,38,38)' : 'rgb(155,155,155)'} />);
    case 'Map':
      return (<Icon name="map" size={24} color={selected ? 'rgb(38,38,38)' : 'rgb(155,155,155)'} />);
    case 'Videos':
      return (<Icon name="th" size={24} color={selected ? 'rgb(38,38,38)' : 'rgb(155,155,155)'} />);
    default:
      return null;
  }
};
// when renaming the scenes, be aware that some of their keys
// are used in custom_modules/react-native-router-flux/src/TabBar
const scenes = Actions.create(
  <Scene key="modal" component={Modal} >
    <Scene key="root" hideNavBar>
      <Scene key="login" title="Login" component={LoginContainer} hideNavBar hideTabBar />
      <Scene
        key="videoPlayerWatch"
        component={TabView}
        title="Video player"
        hideNavBar
        hideTabBar
      />
      <Scene
        key="main"
        tabs
        tabBarStyle={styles.tabBarStyle}
        type="replace"
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
        <Scene key="listWrap" title="Videos" icon={TabIcon} >
          <Scene key="list" component={TabView} title="List" icon={TabIcon} hideNavBar />
        </Scene>
        <Scene key="map" component={TabView} title="Map" icon={TabIcon} />
        <Scene key="profile" component={TabView} title="User Profile" icon={TabIcon} hideNavBar />
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
