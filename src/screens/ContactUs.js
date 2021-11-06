import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import theme from '../theme';
import Header from '../components/Header';
import Call from '../../assets/images/call.svg';
import Email from '../../assets/images/email.svg';
import Message from '../../assets/images/messages.svg';
class ContactUs extends React.Component {
  static navigationOptions = {
    header: () => <Header title={'CONTACT US'} backButton />,
  };
  linkPhone = () => {
    let phone = '+971 2 693 4444';
    Linking.openURL(`tel:${phone}`);
  };
  linkEmail = () => {
    let email = 'customerhappiness@ead.gov.ae';
    Linking.openURL(`mailto:${email}`);
  };
  linkWeb = () => {
    Linking.openURL('********');
  };
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f2f2f2',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30 * theme.consts.BW,
          }}>
          <Text
            style={{
              fontSize: 15 * theme.consts.BW,
              textAlign: 'center',
              color: '#808080',
            }}>
            Looking forward to hearing from you. Please select your preferred
            method to contact us from the ones below:
          </Text>
        </View>
        <View style={{marginTop: 30 * theme.consts.BW}}>
          <TouchableOpacity onPress={this.linkPhone} style={styles.box}>
            <Call
              style={{
                height: 40 * theme.consts.BW,
                width: 40 * theme.consts.BW,
              }}
            />
            <Text style={styles.text}>CALL </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.linkEmail} style={styles.box}>
            <Email
              style={{
                height: 40 * theme.consts.BW,
                width: 40 * theme.consts.BW,
              }}
            />
            <Text style={styles.text}> EMAIL SUPPORT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.larsa.org')}
            style={styles.box}>
            <Message
              style={{
                height: 40 * theme.consts.BW,
                width: 40 * theme.consts.BW,
              }}
            />
            <Text style={styles.text}>FEEDBACK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.larsa.org')}
            style={styles.box}>
            <Message
              style={{
                height: 40 * theme.consts.BW,
                width: 40 * theme.consts.BW,
              }}
            />
            <Text style={styles.text}>REPORT AN ENVIRONMENTAL VIOLATIONS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(ContactUs);
const styles = StyleSheet.create({
  box: {
    borderColor: '#8CC6FF',
    borderWidth: 1 * theme.consts.BW,
    margin: 20 * theme.consts.BW,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 380 * theme.consts.BW,
    padding: 20 * theme.consts.BW,
    alignItems: 'center',
  },
  text: {
    fontSize: 18 * theme.consts.BW,
    fontWeight: 'bold',
    color: '#808080',
    marginStart: 30 * theme.consts.BW,
  },
});
