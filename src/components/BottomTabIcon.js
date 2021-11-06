import React from 'react';
import { Image, StyleSheet } from 'react-native';

import theme from '../theme';

export default ({ source, tintColor }) => (
  <Image
    resizeMode={'contain'}
    source={source}
    style={[styles.image, { tintColor }]}
  />
);

const styles = StyleSheet.create({
  image: {
    marginBottom: 1 * theme.consts.BW,
    resizeMode: 'center',
    marginTop: 15 * theme.consts.BW,
  },
});
