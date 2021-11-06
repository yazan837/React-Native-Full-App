import React from 'react';
import { Text } from 'react-native';

const BottomTabLabel = ({ ...props }) => (
  <Text {...props} style={[props.style]} numberOfLines={1} />
);

export default BottomTabLabel;
