import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';


const VideoEntry = ({ video }) =>
  (
    <View>
      <Text>{video.title}</Text>
      <Text>{video.userName}</Text>
      <Text>{video.kmAway}</Text>
    </View>
  );

// class VideoEntry extends Component {
//   render() {
//     return (
//       <Text>Hey there from video entry</Text>
//     );
//   }
// }

module.exports = VideoEntry;
