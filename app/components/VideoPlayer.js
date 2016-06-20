import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CameraRoll,
} from 'react-native';
import Video from 'react-native-video';
import { RNS3 } from 'react-native-aws3';
import { saveVideo } from '../utils/queries';
import AMAZON_S3 from '../config/apiKeys';

// Later on in your styles..
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

 



class VideoPlayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      response: {headers: {location: 'waiting'}},
    };
  }

  componentDidMount() {
    if (!navigator.geolocation) { console.log('geoloaction not available'); }
    if (navigator.geolocation) { console.log('geoloaction available'); }
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        console.log('initial position is', initialPosition);
        this.setState({ initialPosition });
      },
      (error) => alert('error trying to find initial position', error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      // if we want function on position change, it should go here
      // this.state.changePosFunction(lastPosition);

      console.log('lastPosition', lastPosition);
      this.setState({ latitude: lastPosition.coords.latitude });
      this.setState({ longitude: lastPosition.coords.longitude });
    });


    const file = {
      uri: this.props.data.path,
      name: this.props.data.size + '.mov',
      type: 'video/quicktime',
    };

    const options = {
      keyPrefix: 'uploads/',
      bucket: AMAZON_S3.BUCKET,
      region: AMAZON_S3.REGION,
      accessKey: AMAZON_S3.ACCESS_KEY,
      secretKey: AMAZON_S3.SECRET_KEY,
      successActionStatus: 201,
    };

      let context = this;
      RNS3.put(file, options)
        .then(response => {
          if (response.status !== 201) {
            throw new Error("Failed to upload image to S3");
          }
          const video = {
            url: response.headers.Location,
            point: {
              type: 'Point',
              coordinates: [
                context.state.initialPosition.coords.latitude,
                context.state.initialPosition.coords.longitude,
              ],
            },
            UserId: 2,
          };
          saveVideo(video, () => {});
          context.setState({response});
          console.log(JSON.stringify('RESPONSE', response));
        })
        .catch((e)=>console.log(e))
        .progress((e) => console.log(e.loaded / e.total));
  }

  render() {
    
    return (
          <Video
            source={{ uri: this.props.data.path }}
            style={styles.backgroundVideo}
            rate={1}
            paused={false}
            volume={1}
            muted={false}
            resizeMode='contain'
            repeat={false}
          />


    )
  }
}

module.exports = VideoPlayer;

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
