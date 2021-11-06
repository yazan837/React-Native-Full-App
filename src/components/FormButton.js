import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';

import theme from '../theme';


export default ({ style, titleStyle, title, onClick, isLoading }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => onClick()}>
    {isLoading ? (
      <ActivityIndicator size="large" color={theme.colors.primaryColor} />
    ) : (
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20 * theme.consts.BW,
    height: 50 * theme.consts.BW,
    minWidth: 100 * theme.consts.BW,
    width: 'auto',
    paddingHorizontal: 10 * theme.consts.BW,
    backgroundColor: theme.colors.button,
    borderColor: theme.colors.secondaryColor,
    // borderWidth: 1 * theme.consts.BW,
    borderRadius: 15 * theme.consts.BW,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18 * theme.consts.BW,
  },
});
