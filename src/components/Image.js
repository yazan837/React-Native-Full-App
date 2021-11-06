import React from 'react';

import theme from '../theme';
import Image from 'react-native';

export default ({ source, style }) => (
  <Image
    style={[theme.utils.fill, style]}
    source={source}
  />
);
