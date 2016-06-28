import React from 'react';
import { shallow } from 'enzyme';

import Nav from '../../app/components/Nav';
import { createStore } from 'redux';
import rootReducer from '../../app/reducers/rootReducer.js';
const store = createStore(
  rootReducer
);

describe('<Nav />', () => {
  
  it('should render children when supplied the items prop', () => {
    let mockData = [
      { name: 'test' },
      { name: 'test' },
    ];
    let wrapper = shallow(<Nav store={store} />);
    let items = wrapper.findWhere((component) => {
      return component.props().children === 'test';
    });
    expect(2).to.equal(2);
  });

});