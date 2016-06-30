import * as constants from '../../app/constants';
import reducer from '../../app/reducers/camera';

describe('Camera reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      aspect: 0,
      captureTarget: 1,
      flashMode: 2,
      orientation: 0,
      recording: false,
      type: 1,
      visibilityFlag: false,
      ARorVideo: constants.VIDEO,
    };
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState);
  });

  it('should handle START_RECORDING', () => {
    expect(
      reducer({}, {
        type: constants.START_RECORDING,
      })
    ).to.deep.equal({ recording: true });
  });

  it('should handle STOP_RECORDING', () => {
    expect(
      reducer({}, {
        type: constants.STOP_RECORDING,
      })
    ).to.deep.equal({ recording: false });
  });

  it('should handle CHANGE_CAMERA_TYPE', () => {
    expect(
      reducer({}, {
        type: constants.CHANGE_CAMERA_TYPE,
        viewType: 1,
      })
    ).to.deep.equal({ type: 1 });
  });

  it('should handle CHANGE_FLASH_MODE', () => {
    expect(
      reducer({}, {
        type: constants.CHANGE_FLASH_MODE,
        mode: 0,
      })
    ).to.deep.equal({ flashMode: 0 });
  });


});
