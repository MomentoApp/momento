import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const styles = {
  navWrap: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // top: 20,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  nav: {
    fontWeight: '300',
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
  },
};

class Nav extends Component {
  navStyle(page) {
    return this.props.currentPage === page
      ? { fontWeight: '800' }
      : { fontWeight: '300' };
  }

  render() {
    return (
      <View style={styles.navWrap}>
        <Text style={[styles.nav, this.navStyle('camera')]} onPress={Actions.camera}>Video</Text>
        <Text style={[styles.nav, this.navStyle('ar')]} onPress={Actions.ar}>AR</Text>
      </View>
    );
  }
}

Nav.propTypes = {
  currentPage: React.PropTypes.string,
};

module.exports = Nav;
