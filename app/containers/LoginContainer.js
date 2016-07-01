import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class LoginContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FBLogin
          style={{ marginBottom: 10 }}
          onLogin={data => console.log('You have successfully logged in', data)}
          onLogout={() => console.log('you have successfully logged out')}
          onLoginFound={data => console.log('login found', data)}
          onLoginNotFound={() => console.log('you signed out')}
          onError={err => console.log('Error', err)}
          onCancel={() => console.log('user cancelled')}
          onPermissionsMission={data => console.log('Permissions missing', data)}
        />

      </View>
    );
  }
}

module.exports = LoginContainer;
