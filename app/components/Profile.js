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
    width:200,
    height: 200,
    padding: 120,
    marginTop: 65,
    justifyContent: 'center'
  },
});

const Profile = ({ store }) => (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={{ uri: `https://graph.facebook.com/v2.6/me/picture?&height=200&width=200&access_token=${store.getState().user.token}` }} />
      <Text>
        This is the USER PAGE BABY!
      </Text>
    </View>
);

Profile.propTypes = {
  store: React.PropTypes.object,
};

module.exports = Profile;
