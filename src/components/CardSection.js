import React from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '../theme';

const CardSection = props => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1 * theme.consts.BW,
    padding: 5 * theme.consts.BW,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
});

export default CardSection;
