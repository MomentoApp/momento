import * as constants from '../../app/constants';
import reducer from '../../app/reducers/videos';

describe('Videos reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      videosLoaded: false,
      currentVideo: {},
    };
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState);
  });

  it('should handle SET_CURRENT_VIDEO', () => {
    expect(
      reducer({}, {
        type: constants.SET_CURRENT_VIDEO,
        data: {},
      })
    ).to.deep.equal({ currentVideo: {} });
  });

  it('should handle SET_VIDEO_TITLE', () => {
    expect(
      reducer({}, {
        type: constants.SET_VIDEO_TITLE,
        title: 'best video title',
      })
    ).to.deep.equal({ currentVideo: { title: 'best video title' } });
  });

  it('should not overwrite current video object when setting title', () => {
    expect(
      reducer({ currentVideo: { title: 'old title', url: 'google.com' } }, {
        type: constants.SET_VIDEO_TITLE,
        title: 'best video title',
      })
    ).to.deep.equal({ currentVideo: { title: 'best video title', url: 'google.com' } });
  });

  it('should handle UPDATE_VIDEO_LIST', () => {
    const ds = 'some datasource';
    const videos = [{ video1: 'videodata' }, { video2: 'videodata' }];
    expect(
      reducer({}, {
        type: constants.UPDATE_VIDEO_LIST,
        videos,
        dataSource: ds,
      })
    ).to.deep.equal({ videos, dataSource: ds, videosLoaded: true });
  });
});
