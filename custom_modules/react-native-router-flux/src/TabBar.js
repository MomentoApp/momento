import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Tabs from 'react-native-tabs';
import DefaultRenderer from './DefaultRenderer';
import Actions from './Actions';
import TabbedView from './TabbedView';
import { deepestExplicitValueForKey } from './Util';
import { Text } from 'react-native';

// custom dependency
import { switchCameraAROrVideo } from '../../../app/actions';
import { VIDEO, AR } from '../../../app/constants';

import objectAssignDeep from 'object-assign-deep/objectAssignDeep';

class TabBar extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
    tabIcon: PropTypes.any,
    onNavigate: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.renderScene = this.renderScene.bind(this);
    
    const state = this.props.navigationState;
    const newTab = objectAssignDeep({}, state.children[0]);
    newTab.key ='AR';
    newTab.children[0].key = 'AR_';
    // newTab.name = 'videoWrap';
    // newTab.children[0].name = 'videoWrap';
    newTab.sceneKey ='ARScene';
    newTab.children[0].sceneKey = 'ARScene_';

    newTab.title ='AR';
    newTab.children[0].title ='AR';

    state.children.push(newTab);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(el) {
    if (!Actions[el.props.name]) {
      throw new Error(
        `No action is defined for name=${el.props.name} ` +
        `actions: ${JSON.stringify(Object.keys(Actions))}`);
    }
    this.props.navigationState.currentTabKey = el.key;
    if (el.key === 'AR') {
      el.props.store.dispatch(switchCameraAROrVideo(AR));
    } else if (el.props.name === 'videoWrap') {
      el.props.store.dispatch(switchCameraAROrVideo(VIDEO));
    }

    if (typeof el.props.onPress === 'function') {
      el.props.onPress();
    } else {
      Actions[el.props.name]();
    }
  }

  renderScene(navigationState) {
    return (
      <DefaultRenderer
        key={navigationState.key}
        onNavigate={this.props.onNavigate}
        navigationState={navigationState}
      />
    );
  }

  render() {
    const state = this.props.navigationState;
    const hideTabBar = deepestExplicitValueForKey(state, 'hideTabBar');

    return (
      <View
        style={{ flex: 1 }}
      >
        <TabbedView
          navigationState={this.props.navigationState}
          style={{ flex: 1 }}
          renderScene={this.renderScene}
        />
        {!hideTabBar && state.children.filter(el => el.icon).length > 0 &&
          <Tabs
            style={state.tabBarStyle}
            selectedIconStyle={state.tabBarSelectedItemStyle}
            onSelect={this.onSelect} {...state}
            selected={'yoScene'}
            tabNumber={state.currentTabKey}
          >
            {state.children.filter(el => el.icon || this.props.tabIcon).map(el => {
              const Icon = el.icon || this.props.tabIcon;
              return <Icon {...this.props} {...el} />;
            })}

          </Tabs>
        }
      </View>
    );
  }

}

export default TabBar;
