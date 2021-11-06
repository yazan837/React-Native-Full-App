import React from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '../theme';

const Card = props => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1 * theme.consts.BW,
    borderRadius: 2 * theme.consts.BW,
    borderColor: '#ddd',
    borderBottomWidth: 0 * theme.consts.BW,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1 * theme.consts.BW,
    shadowRadius: 2 * theme.consts.BW,
    elevation: 1 * theme.consts.BW,
    marginLeft: 5 * theme.consts.BW,
    marginRight: 5 * theme.consts.BW,
    marginTop: 10 * theme.consts.BW,
  },
});

export default Card;
