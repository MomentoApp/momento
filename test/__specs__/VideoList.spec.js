// import React from 'react';
// import { shallow } from 'enzyme';

// import VideoList from '../../app/components/VideoList';
// import { createStore } from 'redux';
// import rootReducer from '../../app/reducers/rootReducer.js';
// const store = createStore(
//   rootReducer
// );

// describe('<VideoList />', () => {
//   // store.dispatch(updateVideoList([{},{}]));
//   it('should render children when supplied the items prop', () => {
//     let mockData = [
//       { name: 'test' },
//       { name: 'test' },
//     ];
//     let wrapper = shallow(<VideoList store={store} />);
//     let items = wrapper.findWhere((component) => {
//       return component.props().children === 'test';
//     });
//     expect(2).to.equal(2);
//   });

// });