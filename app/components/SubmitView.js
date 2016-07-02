import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { saveToS3 } from '../utils/s3Interface';
import { saveVideo } from '../utils/queries';
import { Actions } from '../../custom_modules/react-native-router-flux';
import secret from '../config/secret';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressWrap: {
    // backgroundColor: 'red',
    borderWidth: 3,
    borderRadius: 50,
    borderColor: 'white',
    padding: 12,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  finishBtnWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishBtn: {
    borderWidth: 3,
    borderRadius: 35,
    borderColor: 'white',
    padding: 12,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  finishBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
});

class SubmitView extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.goBack = this.goBack.bind(this);
    console.log('THIS IS THE PROPS OF SUBMIT VIEW', this.store);
    this.state = {
      response: { headers: { location: 'waiting' } },
      progress: 0,
    };
  }

  componentDidMount() {

    const file = {
      uri: this.store.getState().videos.currentVideo.url,
      name: `${this.store.getState().videos.currentVideo.size}.mov`,
      type: 'video/quicktime',
    };

    const saveToDb = (response) => {
      const video = {
        // title: 'My awesome video',
        // userName: 'Awesome user'
        url: this.store.getState().videos.currentVideo.url,
        point: {
          type: 'Point',
          coordinates: [
            this.store.getState().position.latitude,
            this.store.getState().position.longitude,
          ],
        },
        UserId: 1,
        title: this.store.getState().videos.currentVideo.title,
      };

      const headers = {
        id: this.store.getState().user.userId,
        token: this.store.getState().user.token,
        secret,
      };
      saveVideo(headers, video, (resp) => {
        console.log('Received response from db after trying to save:', resp);
      });
    };

    const updateProgress = (loaded, total) => {
      const progress = loaded / total;
      this.setState({ progress });
      if (progress === 1) {
        // this.showButton();
      }
    };

    saveToS3(file, saveToDb, updateProgress);
  }

  goBack() {
    Actions.popTo('videoWrap');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Uploading...</Text>
        <View style={styles.progressWrap}>
          <Text style={styles.progressText}>
            {`${Math.floor(this.state.progress * 100)}%`}
          </Text>
        </View>

        <View style={styles.finishBtnWrap}>
          <TouchableOpacity style={styles.finishBtn} onPress={this.goBack}>
            <Text style={styles.finishBtnText}>
              Finish
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

SubmitView.propTypes = {
  store: React.PropTypes.object,
};

module.exports = SubmitView;
