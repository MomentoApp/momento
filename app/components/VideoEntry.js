import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { setCurrentVideo } from '../actions';
import { MODE_WATCH } from '../constants';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 6,
  },
  wrap: {
    borderRadius: 0,
    margin: 6,
  },
  left: {
    flex: 5,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  right: {
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: 22,
  },
  friend: {
    backgroundColor: 'lightblue',
  },
  friendName: {
    justifyContent: 'flex-start',
  },
  target: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.15)',
    borderRadius: 0,
  },
  targetText: {
    color: 'black',
  },
  distance: {
    fontSize: 19,
    fontStyle: 'italic',
  },
  pin: {
    flex: 1,
    alignSelf: 'center',
    height: 50,
  }
});

    // <View>
      // <Text>{video.title}</Text>
      // <Text>{video.userName}</Text>
      // <Text>{video.kmAway}</Text>
    // </View>

class VideoEntry extends Component {

  constructor(props) {
    super(props);
    this.store = this.props.store;
    console.log('store is', this.store);
  }
 
  render() {
    return (
      <TouchableHighlight
        style={style.wrap}
        onPress={()=>{
          this.store.dispatch(setCurrentVideo(this.props.video));
          Actions.videoPlayer({mode: MODE_WATCH});
        }
        }
      >
        <View style={[style.container, style.friend, style.target]}>
          <Icon
            style={style.pin}
            name="play-circle"
            size={50}
            color="black"
          />
          <View style={style.left}>
            <Text style={[style.text, style.friendText, style.targetText]}>
              {this.props.video.title}
            </Text>
            <Text style={[style.friendName, style.targetText]}>
              {this.props.video.userName}
            </Text>
          </View>
          <View style={style.right}>
            <Text style={[style.distance, style.targetText]}>
              {this.props.video.kmAway} km
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }




};

// class VideoEntry extends Component {
//   render() {
//     return (
//       <Text>Hey there from video entry</Text>
//     );
//   }
// }




module.exports = VideoEntry;
