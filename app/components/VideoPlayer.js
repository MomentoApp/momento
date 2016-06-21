import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AlertIOS,
  Text,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import { RNS3 } from 'react-native-aws3';
import { saveVideo } from '../utils/queries';
import AMAZON_S3 from '../config/apiKeys';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
// Later on in your styles..
// const styles = StyleSheet.create({
//   backgroundVideo: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   video: {
//     position: 'absolute',
//     top: 0, left: 0, right: 0, bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },

  // playButtonWrap: {
  //   position: 'absolute',
  //   backgroundColor: 'transparent',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   left: 0,
  //   right: 0,
  //   borderRadius: 50,
  //   padding: 6,
  // },

  // roundButton: {
  //   backgroundColor: 'transparent',
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  //   borderColor: 'white',
  //   borderWidth: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  playButtonWrap: {
    backgroundColor: 'transparent',
  },

  playButton: {
    backgroundColor: 'transparent',
  },

  togglePlayButton: {
    backgroundColor: 'transparent',
  },

  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300,
  },
  ctrlBtn: {
    // backgroundColor: 'red',
    borderWidth: 3,
    borderRadius: 35,
    borderColor: 'white',
    padding: 12,
    marginLeft: 10,
    marginRight: 10,

  },
  ctrlBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "400",
  },
  ctrlBtnWrap: {
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
});


// class VideoPlayer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       response: { headers: { location: 'waiting' } },
//     };
//   }

//   componentDidMount() {
//     // TODO: USER REDUX AND REFACTOR
//     // if (!navigator.geolocation) { console.log('geoloaction not available'); }
//     // if (navigator.geolocation) { console.log('geoloaction available'); }
//     // navigator.geolocation.getCurrentPosition(
//     //   (initialPosition) => {
//     //     console.log('initial position is', initialPosition);
//     //     this.setState({ initialPosition });
//     //   },
//     //   (error) => alert('error trying to find initial position', error.message),
//     //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     // );

//     // this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
//     //   // if we want function on position change, it should go here
//     //   // this.state.changePosFunction(lastPosition);

//     //   console.log('lastPosition', lastPosition);
//     //   this.setState({ latitude: lastPosition.coords.latitude });
//     //   this.setState({ longitude: lastPosition.coords.longitude });
//     // });

//     // const file = {
//     //   uri: this.props.data.path,
//     //   name: `${this.props.data.size}.mov`,
//     //   type: 'video/quicktime',
//     // };

//     // const options = {
//     //   keyPrefix: 'uploads/',
//     //   bucket: AMAZON_S3.BUCKET,
//     //   region: AMAZON_S3.REGION,
//     //   accessKey: AMAZON_S3.ACCESS_KEY,
//     //   secretKey: AMAZON_S3.SECRET_KEY,
//     //   successActionStatus: 201,
//     // };

//     // const context = this;
//     // RNS3.put(file, options)
//     //   .then(response => {
//     //     if (response.status !== 201) {
//     //       throw new Error('Failed to upload image to S3');
//     //     }
//     //     const video = {
//     //       url: response.headers.Location,
//     //       point: {
//     //         type: 'Point',
//     //         coordinates: [
//     //           context.state.initialPosition.coords.latitude,
//     //           context.state.initialPosition.coords.longitude,
//     //         ],
//     //       },
//     //       UserId: 2,
//     //     };
//     //     saveVideo(video, () => {});
//     //     context.setState({ response });
//     //     console.log(JSON.stringify('RESPONSE', response));
//     //   })
//     //   .catch((e) => console.log(e))
//     //   .progress((e) => console.log(e.loaded / e.total));
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Video
//           source={{ uri: this.props.data.path }}
//           style={styles.backgroundVideo}
//           rate={1}
//           paused={false}
//           volume={1}
//           muted={false}
//           resizeMode="contain"
//           repeat={false}
//       />
//       </View>
//     );
//   }
// }

// VideoPlayer.propTypes = {
//   data: React.PropTypes.object,
// };


// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.



//**********************************************

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.tryToPause = this.tryToPause.bind(this);
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      controls: true,
      paused: true,
      repeat: false,
    };
  }

  playButtonStyle() {
    return this.state.paused
      ? { opacity: 1 }
      : { opacity: 0 };
  }

  togglePlay() {
    console.log('toggling play');
    this.setState({ paused: !this.state.paused });
    this.setState({ buttonText: this.state.buttonText === 'Play' ? 'Pause' : 'Play' });
    console.log('STYLES:', JSON.stringify(styles.playButtonWrap));
  }

  tryToPause() {
    if (!this.state.paused) {
      this.setState({ paused: true });
    }
  }

  renderControlButtons() {
    return (
      <View style={styles.ctrlBtnWrap}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={Actions.camera}>
          <Text style={styles.ctrlBtnText}>
            Go Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => {}}>
          <Text style={styles.ctrlBtnText}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const videoStyle = this.state.skin === 'embed' ? styles.nativeVideoControls : styles.fullScreen;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={this.tryToPause}>
          <Video
            source={{ uri: 'https://s3.amazonaws.com/momentotest/uploads/4230947.mov' }}
            style={videoStyle}
            rate={1}
            paused={this.state.paused}
            volume={1}
            muted={false}
            resizeMode="contain"
            onEnd={() => { AlertIOS.alert('Done!'); }}
            repeat={this.state.repeat}
            controls={false}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButtonWrap} onPress={this.togglePlay}>
          <Icon
            style={[styles.playButton, this.playButtonStyle()]}
            name="play-circle"
            size={100}
            color="white"
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {this.renderControlButtons()}
            </View>
          </View>
        </View>

      </View>
    );
  }
}


module.exports = VideoPlayer;



//**********************************************




















