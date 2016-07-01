import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import VideoList from '../components/VideoList';
import VideoMap from '../components/VideoMap';
import CameraView from '../components/CameraView';
import VideoPlayer from '../components/VideoPlayer';
import Submit from '../components/SubmitView';
import Profile from '../components/Profile';


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
});


class TabView extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
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

        {this.props.name === 'videoPlayerForList' &&
          <VideoPlayer store={this.store} mode={MODE_WATCH} />
        }

        {this.props.name === 'list' &&
          <VideoList store={this.props.store} />
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
