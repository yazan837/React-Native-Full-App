import React, {Component} from 'react';

import {withNavigation} from 'react-navigation';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import theme from '../theme';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon} from 'react-native-elements';
import actions from '../redux/actions';
import reactotron from 'reactotron-react-native';
const {logOut} = actions;
import Profile from '../../assets/images/profile.svg';
import Active from '../../assets/images/past.svg';
import Vendor from '../../assets/images/vendorss.svg';
import AboutApp from '../../assets/images/phone.svg';
import AboutUs from '../../assets/images/AboutSideMenu.svg';
import Education from '../../assets/images/eduication.svg';
import Call from '../../assets/images/calldraw.svg';
import Setting from '../../assets/images/setting.svg';
import FaceBook from '../../assets/images/facebookIcon';
import Twiter from '../../assets/images/twiter';
import Instagram from '../../assets/images/instagram';

const URL = 'http://services.larsa.io/files/file/';
class Drawyer extends Component {
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
    return (
      <>
        <SafeAreaView
          style={{flex: 1, backgroundColor: theme.colors.backgroundColor}}>
          <View
            style={{
              backgroundColor: theme.colors.backgroundColor,
              padding: 10 * theme.consts.BW,
              paddingStart: 20 * theme.consts.BW,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.start}>
                {this.props.profile.picture ? (
                  <Image
                    style={styles.logo}
                    source={{uri: URL + this.props.profile.picture}}
                  />
                ) : (
                  <Icon
                    type="material"
                    name="person"
                    color={theme.colors.backgroundColor}
                    size={70}
                    style={styles.logo}
                  />
                )}
              </View>
              <View style={{margin: 10 * theme.consts.BW}}>
                <TouchableOpacity onPress={() => this.props.logOut()}>
                  <Text style={{color: '#fff'}}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.profile}>
              <Text style={[styles.header, styles.fontWeightBold]}>
                {this.props.profile.firstName} {this.props.profile.lastName}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14 * theme.consts.BW,
                  opacity: 0.8,
                }}>
                {this.props.profile.email}{' '}
              </Text>
            </View>
            <View
              style={{
                width: 120 * theme.consts.BW,
                backgroundColor: '#00BD50',
                borderRadius: 25 * theme.consts.BW,
                padding: 5 * theme.consts.BW,
                flexDirection: 'row',
                justifyContent: 'space-around',
                opacity: 0.8,
                marginStart: 5 * theme.consts.BW,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14 * theme.consts.BW,
                  fontWeight: 'bold',
                }}>
                {this.props.Total == 0 ? 0 : this.props.Total}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14 * theme.consts.BW,
                  marginStart: 5 * theme.consts.BW,
                }}>
                total Points
              </Text>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, backgroundColor: '#fff', height: '100%'}}>
            <View style={styles.itemsContainer}>
              {[
                {
                  icon: <Profile style={styles.icon} />,
                  route: 'Profile',
                  title: 'My Profile',
                },

                {
                  icon: <Active style={styles.icon} />,
                  route: 'PastActivites',
                  title: 'My Past Activities',
                },
                {
                  icon: <Vendor style={styles.icon} />,
                  route: 'Vendors',
                  title: 'Participating Vendors ',
                },
                {
                  icon: <AboutApp style={styles.icon} />,
                  route: 'AboutApp',
                  title: 'About the App',
                },
                {
                  icon: <AboutUs style={styles.icon} />,
                  route: 'AboutUs',
                  title: 'About us',
                },
                {
                  route: 'FAQ',
                  title: 'FAQ ',
                  icon: <Education style={styles.icon} />,
                },
                {
                  route: 'ContactUs',
                  title: 'Contact Us  ',
                  icon: <Call style={styles.icon} />,
                },
                {
                  route: 'Settings',
                  title: 'App Settings',
                  icon: <Setting style={styles.icon} />,
                },
                // {
                //   route: 'Login',
                //   title: 'Log In',
                //   icon: require('../../assets/images/log_in.png'),
                // },
              ]
                .filter(Boolean)
                .map((item, index) => (
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      width: '100%',
                      alignItems: 'flex-start',
                      borderBottomColor: '#B2B3B3',
                    }}>
                    <TouchableOpacity
                      key={index}
                      style={styles.item}
                      onPress={() => {
                        this.props.navigation.closeDrawer();
                        if (item.route !== 'LogOut') {
                          this.props.navigation.navigate(item.route);
                        } else {
                          this.props.logOut();
                        }
                      }}>
                      <Text style={styles.label}>{item.title}</Text>
                      {item.icon}
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 20 * theme.consts.BW,
                backgroundColor: '#fff',
                paddingBottom: 40 * theme.consts.BW,
              }}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://www.instagram.com/Environmentabudhabi/',
                  )
                }>
                <Instagram style={styles.social} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://www.facebook.com/EnvironmentAgencyAD',
                  )
                }>
                <FaceBook style={styles.social} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://twitter.com/EADTweets')
                }>
                <Twiter style={styles.social} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
const DrawyerComponent = withNavigation(Drawyer);

const mapStateToProps = (state) => ({
  profile: state.profile.data,
  loggedIn: state.auth.loggedIn,
  Total: state.home.totalPoints,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({logOut}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DrawyerComponent);

const styles = StyleSheet.create({
  container: {},
  scroll: {
    backgroundColor: '#fff',
  },
  logo: {
    width: 100 * theme.consts.BW,
    height: 100 * theme.consts.BW,
    borderRadius: 100 * theme.consts.BW,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignSelf: 'center',
    marginVertical: 10 * theme.consts.BW,
    width: 125 * theme.consts.BW,
    height: 125 * theme.consts.BW,
    borderRadius: 100 * theme.consts.BW,

    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsContainer: {
    padding: 6 * theme.consts.BW,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    // height: '100%',
    backgroundColor: theme.colors.primaryColor,
  },
  start: {
    alignItems: 'flex-start',
    height: 115 * theme.consts.BW,
    justifyContent: 'space-around',
  },
  item: {
    flexDirection: 'row-reverse',
    height: 60 * theme.consts.BW,

    marginHorizontal: 20 * theme.consts.BW,
    alignItems: 'center',
  },
  currentItem: {
    borderBottomColor: '#B68A35',
  },
  icon: {
    width: 20 * theme.consts.BW,
    height: 20 * theme.consts.BW,
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16 * theme.consts.BW,
    color: '#808080',
    borderTopEndRadius: 40 * theme.consts.BW,
    padding: 15 * theme.consts.BW,
  },
  header: {color: '#fff', fontSize: 18 * theme.consts.BW},
  containerHeader2: {
    margin: 10 * theme.consts.BW,
    alignItems: 'center',
    marginVertical: 15 * theme.consts.BW,
  },
  header2: {
    color: theme.colors.backgroundColor,
    fontSize: 22 * theme.consts.BW,
    fontWeight: 'bold',
  },
  profile: {
    // paddingBottom: 5 * theme.consts.BW,
    margin: 10 * theme.consts.BW,
  },
  points: {paddingBottom: 5 * theme.consts.BW, margin: 10 * theme.consts.BW},
  fontWeightBold: {fontWeight: 'bold'},
  social: {
    height: 30 * theme.consts.BW,
    width: 30 * theme.consts.BW,
    marginHorizontal: 16 * theme.consts.BW,
  },
});
