import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Text,
} from 'react-native';

import Camera from 'react-native-camera';
import Nav from './Nav';
import THREE_JS_RENDER from '../lib/render.js';
import { getVideos, saveVideo } from '../utils/queries';
import { updateCoordinats } from '../actions';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  webView: {
    backgroundColor: 'transparent',
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  developerWrap: {
    position: 'absolute',
    top: 30,
    left: 10,
    right: 0,
    bottom: 0,
  },
  developerText: {
    color: 'red',
    backgroundColor: 'transparent',
  },
});

const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8>
    <title>My first Three.js app</title>
    <style>
      body { margin: 0; }
      canvas { width: 100%; height: 100% }
    </style>
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r78/three.js"></script>
    ${THREE_JS_RENDER}
  </body>
</html>`;


class ARView extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() =>
      this.forceUpdate()
    );
 
    if (!navigator.geolocation) { console.log('geoloaction not available'); }
    if (navigator.geolocation) { console.log('geoloaction available'); }
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        this.store.dispatch(updateCoordinats(initialPosition.coords.latitude, initialPosition.coords.longitude));
      },
      (error) => alert('error trying to find initial position', error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );


    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      // if we want function on position change, it should go here
      // this.state.changePosFunction(lastPosition);
      this.props.store.dispatch(updateCoordinats(lastPosition.coords.latitude, lastPosition.coords.longitude));
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        />
        <View style={styles.developerWrap}>
          <Text style={styles.developerText}>Latitude: {this.store.getState().position.latitude}</Text>
          <Text style={styles.developerText}>Longitude: {this.store.getState().position.longitude}</Text>
        </View>


        {(() => {
            var latitude = Number(Number(this.store.getState().position.latitude).toFixed(3));
            var longitude = Number(Number(this.store.getState().position.longitude).toFixed(3));
            return testObj.map(function(data) {
              var lat = Number(Number(data.point.coordinates[0]).toFixed(3));
              var longt = Number(Number(data.point.coordinates[1]).toFixed(3));
              if ( (latitude === lat) && (longitude === longt) )  {
                return (
                  <View style={styles.webViewWrap}>
                    <WebView
                      style={styles.webView}
                      source={{ html: html }}
                    />
                  </View>
                );
              }
            });
          }
        })()}
        <Nav currentPage="ar" />
      </View>
    );
  }
}

// const mapStateToProps = (state) => {
// // tells how to transform the current Redux store state into the props
// // we want to pass to a presentational component we are wrapping
//   return {
//     todos: getVisibleTodos(state.todos, state.visibilityFilter),
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateCoordinats(initialPosition.coords.latitude, initialPosition.coords.longitude)

//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id));
//     }
//   }
// }

// const VisibleARView = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ARView);


// ARView.contextTypes = {
//   store: React.PropTypes.object,
// };
// module.exports = connect()(ARView);
// export default VisibleARView;

export default ARView;
