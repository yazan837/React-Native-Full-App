import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';

import theme from '../theme';


export default ({ style, title, onClick, isLoading }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => onClick()}>
    {isLoading ? (
      <ActivityIndicator size="large" color={theme.colors.primaryColor} />
    ) : (
        <Text style={styles.title}>{title}</Text>
      )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50 * theme.consts.BW,
    minWidth: 100 * theme.consts.BW,
    width: 125,
    backgroundColor: '#ededed',
    borderRadius: 15 * theme.consts.BW,
  },
  title: {
    color: '#FFFFFF',
  },
});
