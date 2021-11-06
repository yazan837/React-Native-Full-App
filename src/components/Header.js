import React from 'react';

import theme from '../theme/index';

import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  Platform,
} from 'react-native';
import Back from './Back';
import MenuIcon from './HeaderMenuIcon';

import {withNavigation} from 'react-navigation';
import HeaderLogo from '../../assets/images/HaderLogo.svg';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.didFocused = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle(this.getBarStyle());
    });
  }

  getBarStyle = () => {
    return theme.colors.statusBarStyle;
  };

  componentWillUnmount() {
    this.didFocused.remove();
  }

  render() {
    let StartSideElement = () =>
      this.props.backButton ? (
        <Back handleBack={this.props.handleBack} />
      ) : (
        <MenuIcon />
      );

    if (this.props.leftDraw) {
      return (
        <SafeAreaView style={styles.leftDrawHeader}>
          <StatusBar
            backgroundColor={theme.colors.backgroundColor}
            barStyle={theme.colors.statusBarStyle}
          />
          <View style={styles.headerSide}>
            <MenuIcon color={'#5A5A5A'} />
          </View>

          <View style={styles.titleView}>
            <Text style={styles.titleText}> {this.props.title} </Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.header}>
        <StatusBar
          backgroundColor={theme.colors.backgroundColor}
          barStyle={theme.colors.statusBarStyle}
        />
        <View style={[styles.headerSide]}>
          <StartSideElement />
        </View>
        <View style={styles.titleView}>
          <HeaderLogo
            height={40 * theme.consts.BW}
            width={90 * theme.consts.BW}
          />
          <Text style={styles.title}> {this.props.title} </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  leftDrawHeader: {
    flexDirection: 'row',
    paddingLeft: 10 * theme.consts.BW,
    paddingTop: 10 * theme.consts.BW,
    marginRight: 10 * theme.consts.BW,
    marginBottom: 10 * theme.consts.BW,
  },
  header: {
    height:
      Platform.OS == 'ios' ? 150 * theme.consts.BW : 100 * theme.consts.BW,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundColor,
    paddingHorizontal: 2 * theme.consts.BW,
  },
  headerSide: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5 * theme.consts.BW,
  },

  icon: {
    tintColor: '#fff',
    resizeMode: 'center',
  },
  title: {
    color: theme.colors.primaryColor,
    fontSize: 24 * theme.consts.BW,
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: 10 * theme.consts.BW,
  },
  titleText: {
    color: theme.colors.primaryColor,
    fontSize: 25 * theme.consts.BW,
    alignItems: 'center',
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingEnd: 50 * theme.consts.BW,
  },
});
