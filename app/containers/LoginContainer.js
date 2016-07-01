import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FBLogin } from 'react-native-facebook-login';
import { storeUserCredentials, deleteUserCredentials } from '../actions/index.js';
import { Actions } from '../../custom_modules/react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LoginContainer = ({ store }) => (
  <View style={styles.container}>
    <FBLogin
      style={{ marginBottom: 10 }}
      onLogin={data => { store.dispatch(storeUserCredentials(data)); Actions.main(); }}
      onLogout={() => store.dispatch(deleteUserCredentials())}
      onLoginFound={data => {
        store.dispatch(storeUserCredentials(data));
        // Actions.main();
      }}
      onLoginNotFound={() => console.log('Login not found')}
      onError={err => console.log('Error', err)}
      onCancel={() => console.log('user cancelled')}
      onPermissionsMission={data => console.log('Permissions missing', data)}
    />
  </View>
);

LoginContainer.propTypes = {
  store: React.PropTypes.object,
};

module.exports = LoginContainer;
