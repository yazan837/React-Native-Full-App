import React from 'react';
import { withNavigation } from 'react-navigation';
import theme from '../theme';

import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Back = ({ navigation, handleBack }) => (
  <TouchableOpacity
    onPress={() => (handleBack && handleBack(), navigation.goBack())}>
    <Image
      source={require('../../assets/images/back.png')}
      style={[styles.icon, { transform: [{ scaleX: -1 }] }]}
      resizeMode="cover"
    />
  </TouchableOpacity>
);

export default withNavigation(Back);

const styles = StyleSheet.create({
  icon: {
    width: 25 * theme.consts.BW,
    height: 25 * theme.consts.BW,
    tintColor: '#FFFFFF',
  },
});
