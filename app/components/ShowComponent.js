import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  show: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class ShowComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.show}>
          Show Text
        </Text>
      </View>
    );
  }
}

module.exports = ShowComponent;
