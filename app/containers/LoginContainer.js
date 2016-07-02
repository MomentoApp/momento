import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FBLogin } from 'react-native-facebook-login';
import { storeUserCredentials, deleteUserCredentials, setUserNameEmail, setUserPicture } from '../actions';
import { Actions } from '../../custom_modules/react-native-router-flux';
import { getUserNameEmail, getUserPicture, saveUserToDb } from '../utils/queries';
import secret from '../config/secret';

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
      onLogin={data => {
        console.log('get function:!!!!!!!!!!');
        store.dispatch(storeUserCredentials(data));
        // send request to FB for additional data
        getUserNameEmail(
          store.getState().user.token,
          (name, email, pictureUrl) =>
            store.dispatch(setUserNameEmail(name, email, pictureUrl))
        )
        // save user to DB
        .then(() => saveUserToDb(
          {
            id: store.getState().user.userId,
            token: store.getState().user.token,
            secret,
          },
          store.getState().user.name,
          store.getState().user.email,
          store.getState().user.pictureUrl,
          () => {}
        ))
        .catch((err) => console.log('error in promise', err));

        Actions.main();
      }}
      onLogout={() => store.dispatch(deleteUserCredentials())}
      onLoginFound={data => {
        store.dispatch(storeUserCredentials(data));
        // send request to FB for additional data
        getUserNameEmail(
          store.getState().user.token,
          (name, email) =>
            store.dispatch(setUserNameEmail(name, email))
        );
        Actions.main();
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
