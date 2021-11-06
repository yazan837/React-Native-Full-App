import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import theme from '../theme';
import {withNavigation} from 'react-navigation';
import Share from 'react-native-share';
import Rate, {AndroidMarket} from 'react-native-rate';
import StarRating from 'react-native-star-rating';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rated: false,
      valueSwitch: true,
      starCount: 3.5,
    };
  }

  valueChange = async (value) => {
    this.setState({valueSwitch: value});
    // if (value) {
    //   this.props.subscribeToPush()
    // } else {
    //   this.props.unsubscribeFromPush()
    // }
  };
  share = () => {
    const url = 'https://play.google.com/store/apps/details?id=com.badr';
    const title =
      'Hello everyone! I am using BAADR App by Environment Agency Abu Dhabi - I help to protect the Environment and I get free vouchers for coffees and restaurants. I just completed this action  ' +
      this.state.TitleSelected +
      ' and gained points. It’s totally free and many exciting vendors are supporting the App. Check it out';
    const message = 'Please check this out.';
    const options = Platform.select({
      default: {
        title,
        subject: message,
        message: `${title} ${url}`,
      },
    });
    Share.open(options)
      .then((res) => {})
      .catch((err) => {
        err && console.log(err);
      });
  };
  Rat = (rating) => {
    const options = {
      AppleAppID: '2193813192',
      GooglePackageName: 'com.badr',
      AmazonPackageName: 'com.badr',
      OtherAndroidURL: 'https://www.ead.gov.ae/ar/Get-in-Touch',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'https://www.ead.gov.ae/ar/Get-in-Touch',
    };
    Rate.rate(options, (success) => {
      if (success) {
        this.setState({rated: true, starCount: rating});
      }
    });
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
        <View style={styles.white}>
          <View style={[styles.item, {marginTop: 20 * theme.consts.BW}]}>
            <Text style={styles.title}>{'App Notifications'}</Text>
            <Switch
              style={styles.switch}
              value={this.state.valueSwitch}
              onValueChange={this.valueChange}
            />
          </View>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.props.navigation.navigate('ChangePassword')}>
            <Text style={styles.title}>{'Change your Password'}</Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 0.8 * theme.consts.BW,
              borderBottomColor: 'grey',
              width: 360 * theme.consts.BW,
              margin: 25 * theme.consts.BW,
            }}
          />
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
           (   this.share())
            }>
            <Text style={styles.title}>{'Invite a friend'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              const options = {
                AppleAppID: '2193813192',
                GooglePackageName: 'com.badr',
                AmazonPackageName: 'com.badr',
                OtherAndroidURL: 'https://www.ead.gov.ae/ar/Get-in-Touch',
                preferredAndroidMarket: AndroidMarket.Google,
                preferInApp: false,
                openAppStoreIfInAppFails: true,
                fallbackPlatformURL: 'https://www.ead.gov.ae/ar/Get-in-Touch',
              };
              Rate.rate(options, (success) => {
                if (success) {
                  this.setState({rated: true});
                }
              });
            }}>
            <Text style={styles.title}>{'Rate the App'}</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.starCount}
              fullStarColor={'#00a650'}
              selectedStar={(rating) => this.Rat(rating)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => this.share()}>
            <Text style={styles.title}>{'Share the App'}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{alignItems: 'center', marginBottom: 20 * theme.consts.BW}}>
          <Text style={{color: '#808080', fontSize: 14 * theme.consts.BW}}>
            Badr App Version 1.0
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 5 * theme.consts.BW,
    paddingVertical: 15 * theme.consts.BW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 30 * theme.consts.BW,
    width: 30 * theme.consts.BW,
    marginEnd: 20 * theme.consts.BW,
    tintColor: '#888888',
  },
  title: {
    marginHorizontal: 20 * theme.consts.BW,
    fontSize: 16 * theme.consts.BW,
    color: '#888888',
  },
  switch: {
    marginEnd: 10 * theme.consts.BW,
  },
  white: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default withNavigation(Settings);
