import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import BottomTabIcon from '../components/BottomTabIcon';
import BottomTabLabel from '../components/BottomTabLabel';
// screens
import Home from '../screens/Home';
import Activites from '../screens/Activites';
import Rewards from '../screens/Rewards';
import Profile from '../screens/Profile';
import PastActivites from '../screens/PastActivites';
import Vendors from '../screens/Vendors';
import AboutUs from '../screens/AboutUs';
import FAQ from '../screens/FAQ';
import ContactUs from '../screens/ContactUs';
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ForgetPassword from '../screens/ForgetPassword';
import Tour from '../screens/Tour';
import AboutApp from '../screens/AboutApp';
import ChangePassword from '../screens/ChangePassword';
// side menu drawer
import Drawyer from '../components/Drawyer';

import {View, SafeAreaView, Image, StyleSheet} from 'react-native';
import theme from '../theme';
import NavigatorService from '../services/navigator';
import Header from '../components/Header';
import reactotron from '../redux/Reactotron';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <BottomTabLabel style={[styles.label, {color: tintColor}]}>
            {'Dashboard'}
          </BottomTabLabel>
        ),
        tabBarIcon: ({tintColor}) => (
          <BottomTabIcon
            tintColor={tintColor}
            style={[styles.icon, {color: tintColor}]}
            source={require('../../assets/images/dashbord.png')}
          />
        ),
      },
    },
    Rewards: {
      screen: Rewards,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <BottomTabLabel style={[styles.label, {color: tintColor}]}>
            {'Rewards'}
          </BottomTabLabel>
        ),
        tabBarIcon: ({tintColor}) => (
          <BottomTabIcon
            tintColor={tintColor}
            style={[styles.icon, {color: tintColor}]}
            source={require('../../assets/images/rewards.png')}
          />
        ),
      },
    },
    Activites: {
      screen: Activites,
      navigationOptions: {
        tabBarLabel: ({tintColor}) => (
          <BottomTabLabel style={[styles.label, {color: tintColor}]}>
            {'Actions'}
          </BottomTabLabel>
        ),
        tabBarIcon: ({tintColor}) => (
          <BottomTabIcon
            tintColor={tintColor}
            style={[styles.icon, {color: tintColor}]}
            source={require('../../assets/images/activites.png')}
          />
        ),
      },
    },
  },

  {
    navigationOptions: ({navigation}) => {
      if (navigation.state.index === 0) {
        return {
          header: () => <Header title={'DASHBOARD'} MenuIcon />,
          animationEnabled: true,
        };
      } else if (navigation.state.index === 1) {
        return {
          header: () => <Header title={'REWARDS'} />,
          animationEnabled: true,
        };
      } else if (navigation.state.index === 2) {
        return {
          header: () => <Header title={'ACTIONS'} />,
          animationEnabled: true,
        };
      }
    },
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#004987',
      inactiveBackgroundColor: '#107ae3',
      inactiveTintColor: '#f2f2f2',
      style: {
        height: 75 * theme.consts.BW,
        alignItems: 'center',
      },
    },
  },
);

const AuthNavigator = createStackNavigator(
  {
    Tour: {screen: Tour},
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    ForgetPassword: {
      screen: ForgetPassword,
    },
  },
  {
    defaultNavigationOptions: {headerShown: false, animationEnabled: false},
  },
);

const AppNavigator = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
  },
  // Home: {
  //   screen: Home,
  // },
  Activites: {
    screen: Activites,
    navigationOptions: {
      header: () => <Header title={'ACTIVITIES'} />,
    },
  },
  Rewards: {
    screen: Rewards,
    navigationOptions: {
      header: () => <Header title={'REWARDS'} />,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: () => <Header title={'MY PROFILE'} backButton />,
    },
  },
  PastActivites: {
    screen: PastActivites,
    navigationOptions: {
      header: () => <Header title={'MY PAST ACTIVITIES'} backButton />,
    },
  },
  Vendors: {
    screen: Vendors,
    navigationOptions: {
      header: () => <Header title={'PARTICIPATING VENDORS'} backButton />,
    },
  },
  AboutUs: {
    screen: AboutUs,
    navigationOptions: {
      header: () => <Header title={'ABOUT US'} backButton />,
    },
  },
  AboutApp: {
    screen: AboutApp,
    navigationOptions: {
      header: () => <Header title={'ABOUT THE APP'} backButton />,
    },
  },
  FAQ: {
    screen: FAQ,
    navigationOptions: {
      header: () => <Header title={'FAQ'} backButton />,
    },
  },
  ContactUs: {
    screen: ContactUs,
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      header: () => <Header title={'APP SETTINGS'} backButton />,
    },
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      header: () => <Header title={'CHANGE PASSWORD'} backButton />,
    },
  },
});

const DrawyerNavigator = createDrawerNavigator(
  {
    AppNavigator: {screen: AppNavigator},
  },
  {
    drawerWidth: 300 * theme.consts.BW,
    contentComponent: () => <Drawyer />,
  },
);

const appNavigator = createSwitchNavigator({
  Auth: {screen: AuthNavigator},
  App: {screen: DrawyerNavigator},
});

const Navigator = createAppContainer(appNavigator);

const makeRef = (navigatorRef) => NavigatorService.setContainer(navigatorRef);
export default () => <Navigator ref={makeRef} />;

const styles = StyleSheet.create({
  headerSide: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80 * theme.consts.BW,
  },
  title: {
    color: theme.colors.primaryColor,
    fontSize: 20 * theme.consts.BW,
    marginLeft: 80 * theme.consts.BW,
    paddingTop: 20 * theme.consts.BW,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {height: 20, width: 20, tintColor: theme.colors.primaryColor},
  label: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 7,
  },
});
