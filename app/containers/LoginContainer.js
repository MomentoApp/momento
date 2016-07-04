import React from 'react';
import { View, StyleSheet, Text, Image, StatusBar } from 'react-native';
import { FBLogin } from 'react-native-facebook-login';
import { storeUserCredentials, deleteUserCredentials, setUserNameEmail, setUserPicture } from '../actions';
import { Actions } from '../../custom_modules/react-native-router-flux';
import { getUserNameEmail, getUserPicture, saveUserToDb } from '../utils/queries';
import secret from '../config/secret';
import coverImage from '../assets/images/login_cover.jpg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    // padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerWrap: {
    flex: 1,
    position: 'absolute',
    top: 70,
    right: 0,
    left: 0,
    // backgroundColor: 'red',
    alignItems: 'center',
    // width: null,
    // justifyContent: 'center',
    // left: 0,
    // right: 0,
  },
  header: {
    fontFamily: 'Copperplate-Bold',
    fontSize: 66,
    color: '#F7F7F7',
    backgroundColor: 'transparent',
    // letter-spacing: 1.34px;
  },
  fbWrap: {
    flex: 1,
    position: 'absolute',
    bottom: 60,
    right: 0,
    left: 0,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  fbButton: {
  },
  // {
  //   flex:1,
  //   width:null,
  //   height: null,
  //   padding: 30,
  //   marginTop: 65,
  //   flexDirection: 'column',
  //   justifyContent: 'center'
  // },
});

const LoginContainer = ({ store }) => (

  <Image style={styles.container} source={coverImage}>
    <StatusBar hidden={true} />
    <View style={styles.headerWrap}>
      <Text style={styles.header}>
        Momento
      </Text>
    </View>
    <View style={styles.fbWrap}>
      <FBLogin
        style={styles.fbButton}
        onLogin={data => {
          console.log('get function:!!!!!!!!!!');
          store.dispatch(storeUserCredentials(data));
          // send request to FB for name and email
          getUserNameEmail(
            store.getState().user.token,
            (name, email) =>
              store.dispatch(setUserNameEmail(name, email))
          )
          // save profile picture in Redux store
          .then(() => store.dispatch(setUserPicture(store.getState().user.token)))
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
          )// save profile picture in Redux store
          .then(() => store.dispatch(setUserPicture(store.getState().user.token)));
          // Actions.main();
        }}
        onLoginNotFound={() => console.log('Login not found')}
        onError={err => console.log('Error', err)}
        onCancel={() => console.log('user cancelled')}
        onPermissionsMission={data => console.log('Permissions missing', data)}
      />
    </View>
  </Image>
);

LoginContainer.propTypes = {
  store: React.PropTypes.object,
};

module.exports = LoginContainer;
