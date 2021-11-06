import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import theme from '../theme';

const HeaderBackImage = ({ navigation, handleBack }) => (
  <TouchableOpacity
    onPress={() => {
      handleBack ? handleBack() : navigation.goBack();
    }}>
    <View style={styles.container}>
      <Image
        style={styles.image}
        // source={require('../../assets/images/back.png')}
        resizeMode="contain"
      />
    </View>
  </TouchableOpacity>
);
export default withNavigation(HeaderBackImage);

const styles = StyleSheet.create({
  container: {
    margin: 20 * theme.consts.BW,
  },
  image: {
    height: 30 * theme.consts.BW,
    tintColor: theme.colors.primaryColor,
  },
});
