import {Dimensions, Platform} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import RNRestart from 'react-native-restart'
const {width, height} = Dimensions.get('window')

const utils = {
  fill: {width: '100%', height: '100%'},
  center: {alignItems: 'center', justifyContent: 'center'},
}

const darkColors = {
  backgroundColor: '#00a650',
  first: '#312F2F',
  statusBarStyle: 'light-content',
  backgroundBarHome: 'green',
  primaryColor: '#fff',
  secondaryColor: '#312F2F',
  elementColor: '#FFFFFF',
  inactiveColor: '#E5E5E5',
  textColor: '#E7E7E7',
  refreshColor: '#312F2F',
  profileColor: '#828282',
  alertButton: '#BDBDBD',
  homePageIcon: '#828282',
  tintColor: '#312F2F',
  button: '#C03823',
}

const consts = {BW: width / 420, BH: height / 910}

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
    },
    android: {
      elevation: 1,
    },
  }),
}

const themeObject = {
  utils,
  colors: darkColors,
  currentTheme: 'dark',
  consts,
  shadow,
}

export const initTheme = async () => {
  let theme = await AsyncStorage.getItem('@theme')
  if (theme) {
    themeObject.currentTheme = theme
  }
}

export const setTheme = async theme => {
  await AsyncStorage.setItem('@theme', theme)
  RNRestart.Restart()
}

export default themeObject
