import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const OurComponent = ({ items }) => (
  <View>
    {items.map((item) => (
      <View>
        <Text>{item.name}</Text>
      </View>
    ))}
  </View>
);

OurComponent.propTypes = {
  items: React.PropTypes.array,
};

module.exports = OurComponent;
