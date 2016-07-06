import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from '../../custom_modules/react-native-router-flux';
import { setCurrentVideo } from '../actions';
import { MODE_WATCH } from '../constants';
import thumbPlaceholder from '../assets/images/desert4.jpg';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
  thumbnail: {
    width: screenWidth / 3 - 1,
    height: screenWidth / 3 - 1,
    // flex: 0.33333,
    // backgroundColor: 'blue',
  },
  thumbWrap: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  playIcon: {
    position: 'absolute',
    top: 47,
    left: 47,
  },
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
  }

          // <Icon
          //   style={style.pin}
          //   name="play-circle"
          //   size={50}
          //   color="black"
          // />
    // previous list version
    //       return (
    //   <TouchableHighlight
    //     style={style.wrap}
    //     onPress={() => {
    //       this.store.dispatch(setCurrentVideo(this.props.video));
    //       Actions.videoPlayerForList({ mode: MODE_WATCH });
    //     }
    //     }
    //   >
    //     <View style={[style.container, style.friend, style.target]}>
    //       <Image source={{ uri: this.props.video.thumbnail }} style={style.pin} />
    //       <View style={style.left}>
    //         <Text style={[style.text, style.friendText, style.targetText]}>
    //           {this.props.video.title}
    //         </Text>
    //         <Text style={[style.friendName, style.targetText]}>
    //           {this.props.video.userName}
    //         </Text>
    //       </View>
    //       <View style={style.right}>
    //         <Text style={[style.distance, style.targetText]}>
    //           {this.props.video.kmAway} km
    //         </Text>
    //       </View>
    //     </View>
    //   </TouchableHighlight>
    // );

  render() {
    const thumb = this.props.video.thumbnail !== null
    ? { uri: this.props.video.thumbnail }
    : thumbPlaceholder;
    return (
      <TouchableHighlight
        onPress={() => {
          this.store.dispatch(setCurrentVideo(this.props.video));
          Actions.videoPlayerForList({ mode: MODE_WATCH });
        }
        }
      >
        <View style={styles.thumbWrap}>
          <Image source={thumb} style={styles.thumbnail} />
          <Icon
            style={styles.playIcon}
            name="play-circle-o"
            size={36}
            color="rgba(255,255,255,0.46)"
          />
        </View>
      </TouchableHighlight>
    );
  }
}

VideoEntry.propTypes = {
  video: React.PropTypes.object,
  store: React.PropTypes.object,
};

module.exports = VideoEntry;
