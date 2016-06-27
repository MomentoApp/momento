import React from 'react';
import { shallow } from 'enzyme';

import OurComponent from '../../app/components/our-component';

describe("<OurComponent/>", () => {
  
  it("should render children when supplied the items prop", () => {
    let mockData = [
      { name: "test" },
      { name: "test" }
    ];
    let wrapper = shallow(<OurComponent items={mockData}/>);
    let items = wrapper.findWhere((component) => {
      return component.props().children === "test";
    });
    expect(items.length).to.equal(2);
  });

});