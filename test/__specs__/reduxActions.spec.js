import * as actions from '../../app/actions';
import * as constants from '../../app/constants';
import { ListView } from 'react-native';

describe('Redux actions:', () => {
  it('should update coordinats', () => {
    const latitude = 100;
    const longitude = 200;
    const expectedAction = {
      type: constants.UPDATE_COORDINATS,
      latitude,
      longitude,
    };
    expect(actions.updateCoordinats(latitude, longitude)).to.deep.equal(expectedAction);
  });

  it('should stop recording', () => {
    const expectedAction = {
      type: constants.STOP_RECORDING,
    };
    expect(actions.stopRecording()).to.deep.equal(expectedAction);
  });

  it('should start recording', () => {
    const expectedAction = {
      type: constants.START_RECORDING,
    };
    expect(actions.startRecording()).to.deep.equal(expectedAction);
  });

  it('should change camera type', () => {
    const viewType = 'front';
    const expectedAction = {
      type: constants.CHANGE_CAMERA_TYPE,
      viewType,
    };
    expect(actions.changeCameraType(viewType)).to.deep.equal(expectedAction);
  });

  it('should change flash mode', () => {
    const mode = 'auto';
    const expectedAction = {
      type: constants.CHANGE_FLASH_MODE,
      mode,
    };
    expect(actions.changeFlashMode(mode)).to.deep.equal(expectedAction);
  });

  it('should increase recording time', () => {
    const recordingTime = '00:01';
    const expectedAction = {
      type: constants.INCREASE_RECORDING_TIME,
      recordingTime,
    };
    expect(actions.increaseRecordingTime(recordingTime)).to.deep.equal(expectedAction);
  });

  it('should clear recording time', () => {
    const expectedAction = {
      type: constants.CLEAR_RECORDING_TIME,
    };
    expect(actions.clearRecordingTime()).to.deep.equal(expectedAction);
  });

  it('should set current video', () => {
    const data = {};
    const expectedAction = {
      type: constants.SET_CURRENT_VIDEO,
      data,
    };
    expect(actions.setCurrentVideo(data)).to.deep.equal(expectedAction);
  });

  it('should save video title', () => {
    const title = 'BEST VIDEO';
    const expectedAction = {
      type: constants.SET_VIDEO_TITLE,
      title,
    };
    expect(actions.setVideoTitle(title)).to.deep.equal(expectedAction);
  });

  it('should update video list', () => {
    const videos = [{}, {}, {}];
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const expectedAction = {
      type: constants.UPDATE_VIDEO_LIST,
      dataSource: ds.cloneWithRows(videos),
      videos,
    };
    expect(actions.updateVideoList(videos)).to.deep.equal(expectedAction);
  });
});
