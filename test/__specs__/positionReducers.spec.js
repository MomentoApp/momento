import * as constants from '../../app/constants';
import reducer from '../../app/reducers/position';

describe('Position reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(
      {
        latitude: 100,
        longitude: 200,
      }
    );
  });

  it('should handle UPDATE_COORDINATS', () => {
    expect(
      reducer({}, {
        type: constants.UPDATE_COORDINATS,
        latitude: 123.21231,
        longitude: 99.000123,
      })
    ).to.deep.equal(
      {
        latitude: 123.21231,
        longitude: 99.000123,
      }
    );
  });

});
