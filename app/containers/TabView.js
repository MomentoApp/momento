import React, { Component } from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import VideoList from '../components/VideoList';
import GridView from '../components/GridView';
import VideoMap from '../components/VideoMap';
import CameraView from '../components/CameraView';
import VideoPlayer from '../components/VideoPlayer';
import Submit from '../components/SubmitView';
import Profile from '../components/Profile';
import { updateCurrentPosition } from '../utils/navigation';
import tabBarImage from '../assets/images/bar06.png';

import { MODE_SUBMIT, MODE_WATCH } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'red',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tabBarWrap: {
    // backgroundColor: 'red',
    height: 49,
  },
  tabBarImage: {
    height: 49,
    //resizeMode: 'stretch',
  },
});

class TabView extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // note: AR is rendered manually inside react-native-router-flux TabBar
    // to avoid rendering camera two times
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        {this.props.name === 'video' &&
          <CameraView store={this.store} />
        }

        {this.props.name === 'videoPlayer' &&
          <VideoPlayer store={this.store} mode={MODE_SUBMIT} />
        }

        {this.props.name === 'videoPlayerWatch' &&
          <VideoPlayer store={this.store} mode={MODE_WATCH} />
        }


        {this.props.name === 'list' &&
          // <VideoList store={this.props.store} />
          <GridView store={this.props.store} />
        }
        {this.props.name === 'map' &&
          <VideoMap store={this.props.store} />
        }

        {this.props.name === 'submit' &&
          <Submit store={this.props.store} />
        }

        {this.props.name === 'profile' &&
          <Profile store={this.props.store} />
        }

        {(this.props.name === 'list' ||
          this.props.name === 'map' ||
          this.props.name === 'profile' ||
          this.props.name === 'AR' ||
          this.props.name === 'video')
          ?
            (<View style={styles.tabBarWrap}>
              <Image source={tabBarImage} style={styles.tabBarImage} />
            </View>)
          : null
        }

      </View>
    );
  }
}

TabView.propTypes = {
  store: React.PropTypes.object,
  name: React.PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: React.PropTypes.string,
};

export default TabView;
