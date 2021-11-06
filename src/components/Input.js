import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import theme from '../theme';

export default ({
  style,
  placeholder,
  autoCapitalize,
  multiline = false,
  value,
  onChange,
  textAlignVertical = 'top',
}) => (
  <TextInput
    style={[styles.container, style]}
    placeholder={placeholder}
    autoCapitalize={autoCapitalize}
    multiline={multiline}
    value={value}
    onChangeText={onChange}
    textAlignVertical={textAlignVertical}
    placeholderTextColor={theme.colors.textColor + '50'}
  />
);

const styles = StyleSheet.create({
  container: {
    textAlign: 'auto',
    color: theme.colors.textColor,
  },
});
