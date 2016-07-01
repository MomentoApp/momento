import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VideoList from './VideoList';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Profile = ({ store }) => (
  <VideoList store={store} />
);

Profile.propTypes = {
  store: React.PropTypes.object,
};

module.exports = Profile;
