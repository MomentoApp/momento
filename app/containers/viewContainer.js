import React from 'react-native';
import { connect } from 'reaact-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    pins: state.pins,
    recent: state.recent,
    friends: state.friends,
  };
};

export default connect(mapStateToProps, { updateCoordinats })(ViewContainer);