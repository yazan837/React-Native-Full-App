import React from 'react';
import { withNavigation } from 'react-navigation';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../theme';

const HeaderMenuIcon = ({ navigation, tintColor }) => (
  <TouchableOpacity
    onPress={() => {
      navigation.openDrawer();
    }}>
    <View style={styles.container}>
      <Image
        style={[
          styles.image,
          { tintColor },

        ]}
        source={require('../../assets/images/menu.png')}
        resizeMode="contain"
      />
    </View>
  </TouchableOpacity>
);

export default withNavigation(HeaderMenuIcon);

const styles = StyleSheet.create({
  container: {
    marginStart: 10 * theme.consts.BW,
  },
  image: {
    height: 30 * theme.consts.BW,
    tintColor: '#fff',
  },
});
