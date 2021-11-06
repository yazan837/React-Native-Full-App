import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import theme from '../theme/index';
import Swiper from 'react-native-swiper';
import ImageTour from '../../assets/images/TourImage.svg';
import ImageTour2 from '../../assets/images/TourImage2.svg';
import ImageTour3 from '../../assets/images/TourImage3.svg';
import ImageTour4 from '../../assets/images/TourImage4.svg';
import ImageTour5 from '../../assets/images/TourImage5.svg';
import ImageTour6 from '../../assets/images/TourImage6.svg';
export default class Tour extends React.Component {
  static navigationOptions = () => {
    return {
      header: () => null,
    };
  };
  constructor(props) {
    super(props);
    this.state = {isLoading: true, activeSlide: 0};
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    await AsyncStorage.getItem('isShowTour').then((value) => {
      if (value === 'true') {
        this.props.navigation.replace('Login');
      }
    });
    this.setState({isLoading: false});
  }

  _onDone = () => {
    AsyncStorage.setItem('isShowTour', 'true').then(() => {
      this.setState({screen: 0});
      this.props.navigation.replace('Login');
    });
  };

  render() {
    if (this.state.isLoading)
      return (
        <ActivityIndicator
          size={'large'}
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
          }}
          color={theme}
        />
      );

    return (
      <ImageBackground
        style={styles.cover}
        source={require('../../assets/images/LoginBackground.png')}
        resizeMode="cover">
        <Swiper
          scrollEnabled={true}
          loop={false}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100 * theme.consts.BW,
          }}
          onIndexChanged={(index) => this.setState({activeSlide: index})}
          activeDotColor={'#107AE3'}
          dotColor={'#10A1E3'}>
          {datatype.map((slide) => (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {slide.icon}
                <View style={{marginHorizontal: 15 * theme.consts.BW}}>
                  <Text style={{textAlign: 'center', color: '#808080'}}>
                    {slide.content}
                  </Text>
                </View>
              </View>
            </>
          ))}
        </Swiper>
        <View
          style={{
            alignItems: 'center',
            margin: 20 * theme.consts.BW,
            justifyContent: 'center',
          }}>
          <Text
            onPress={() => this._onDone()}
            style={{color: '#366EAE', fontSize: 20 * theme.consts.BW}}>
            {this.state.activeSlide !== 5 ? 'SKIP' : 'DONE'}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {height: '100%', width: '100%'},
  logoView: {
    width: 80 * theme.consts.BW,
    height: 80 * theme.consts.BW,
    alignSelf: 'center',
    marginTop: 50 * theme.consts.BW,
  },
  logo: {
    width: 80 * theme.consts.BW,
    height: 80 * theme.consts.BW,
    resizeMode: 'center',
  },
  imagee: {
    width: 75 * theme.consts.BW,
    height: 75 * theme.consts.BW,
  },
  slide: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textView: {
    flex: 1,
  },
  button: {
    color: '#000',
    fontSize: 50,
  },
});

const datatype = [
  {
    icon: (
      <ImageTour height={450 * theme.consts.BW} width={250 * theme.consts.BW} />
    ),
    content:
      ' Create a new account with a username and password, or sign-in to your existing one. To use the App is free!',
  },
  {
    icon: (
      <ImageTour2
        height={450 * theme.consts.BW}
        width={400 * theme.consts.BW}
      />
    ),
    content: ' Select one of the many environmental actions',
  },
  {
    icon: (
      <ImageTour3
        height={450 * theme.consts.BW}
        width={400 * theme.consts.BW}
      />
    ),
    content:
      'Completing an action is very simple, just follow the instructions. Each action has a number of points assigned to it: complete the action to collect points',
  },
  {
    icon: (
      <ImageTour4
        height={450 * theme.consts.BW}
        width={400 * theme.consts.BW}
      />
    ),
    content:
      ' Redeem your points at a participating Outlet or Vendor, based on points you have collected and rewards value',
  },
  {
    icon: (
      <ImageTour5
        height={450 * theme.consts.BW}
        width={500 * theme.consts.BW}
      />
    ),
    content:
      ' Take another action and keep accumulating points! There are also targets for you to reach that will award you extra points. ',
  },
  {
    icon: (
      <ImageTour6
        height={300 * theme.consts.BW}
        width={200 * theme.consts.BW}
        // style={{
        //   width: 500 * theme.consts.BW,
        //   height: 450 * theme.consts.BW,
        //   resizeMode: 'center',
        // }}
      />
    ),
    content:
      ' BAADR is a behavioral-change initiative based on fair behavior by its users. Users are required to upload real-time authentic pictures at the moment of performing the actions. Uploading multiple time the same picture is not allowed. BAADR will be monitoring users behavior. In case a user is not respecting the ‘fair behavior’ policy a first warning will be sent. In case of further non-fair behavior the account will be terminated ',
  },
];
