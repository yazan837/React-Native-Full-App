import React from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Text,
} from 'react-native'
import theme from '../theme'

export default class Page extends React.Component {
  render () {
    const {children, contentStyle, isLoading, isError} = this.props

    if (isError) {
      return (
        <ImageBackground
          // source={require('../../assets/images/backgroundNoConnection.png')}
          resizeMode='contain'
          style={styles.backgroundImage}>
          <Text style={styles.backgroundLabel}>GENERAL CONNECTION ERROR</Text>
        </ImageBackground>
      )
    }

    return isLoading ? (
      <View style={[styles.loading, contentStyle]}>
        <ActivityIndicator color={theme.colors.backgroundColor} size='large' />
      </View>
    ) : (
      <View style={styles.page}>
        <View style={[styles.defaultContentStyle, contentStyle]}>
          {children}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  defaultContentStyle: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backgroundLabel: {
    fontSize: 25 * theme.consts.BW,
    color: '#79818B',
  },
})
