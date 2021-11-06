import React from 'react';
import { StyleSheet, Text } from 'react-native';
import theme from '../theme';

export default ({ style, ...props }) => {
  let currentStyle = [styles.defaultTextStyle, { color: theme.colors.textColor }];
  if (Array.isArray(style)) {
    currentStyle = [...currentStyle, ...style];
  } else {
    currentStyle = [...currentStyle, style];
  }
  currentStyle = [
    ...currentStyle,
  ];
  return <Text style={currentStyle} {...props} />;
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    fontSize: 20 * theme.consts.BW,
    color: theme.colors.textColor,
  },
});
