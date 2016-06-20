import React, { Component } from 'react';
import {
  StyleSheets,
  View,
  TouchableHighlight,
} from 'react-native';

class UploadView extends Component {
  render() {
    return (
      <View>
        <Text>Uploading...</Text>
        <TouchableHighlight>
        Go Back
        </TouchableHighlight>

      </View>
    );
  }
}

module.exports = UploadView;
