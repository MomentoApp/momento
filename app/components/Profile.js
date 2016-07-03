import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import VideoList from './VideoList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

const Profile = ({ store }) => (
  <View style={styles.container}>
    <Image style={styles.backgroundImage} source={{ uri: store.getState().user.pictureUrl }} />
    <Text>
      {store.getState().user.name}
    </Text>
    <VideoList mode="user" store={store} />

  </View>
);

Profile.propTypes = {
  store: React.PropTypes.object,
};

module.exports = Profile;
