import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

import theme from '../theme';

export default () => (
  <ActivityIndicator
    style={styles.overlay}
    size="large"
    color={theme.colors.primaryColor}
  />
);

const styles = StyleSheet.create({
  overlay: {
    marginTop: 100 * theme.consts.BW,
  },
});
