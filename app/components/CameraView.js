import React, { Component } from 'React';
import {
  View, 
  Text,
  TouchableHighlight,
  Dimensions,
  StyleSheet
} from 'react-native';
import Camera from 'react-native-camera';

class CameraView extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {cameraType: Camera.constants.Type.back};
  // }

  // getInitialState() {
  //   return {
  //     cameraType: Camera.constants.Type.back
  //   }
  // }


 render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});



module.exports = CameraView;