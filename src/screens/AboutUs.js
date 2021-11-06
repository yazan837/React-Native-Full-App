import React from 'react';
import {View, StyleSheet, Image, Text, Linking, ScrollView} from 'react-native';
import theme from '../theme';
import reacttotron from '../redux/Reactotron';
import AboutImage from '../../assets/images/AbouDabui.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

class AboutApp extends React.Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <AboutImage
              style={{
                width: 200 * theme.consts.BW,
                height: 200 * theme.consts.BW,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5 * theme.consts.BW,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16 * theme.consts.BW,
                color: '#808080',
                textAlign: 'center',
              }}>
              ********
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => Linking.openURL('********')}
              style={{
                padding: 10 * theme.consts.BW,
                borderRadius: 25 * theme.consts.BW,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 25 * theme.consts.BW,
                width: 250 * theme.consts.BW,
                backgroundColor: '#B2B3B3',
                opacity: 0.4,
              }}>
              <Text style={{fontSize: 18 * theme.consts.BW}}>www.ead.ae</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5 * theme.consts.BW,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20 * theme.consts.BW,
                color: '#808080',
              }}>
              OUR VISION
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5 * theme.consts.BW,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16 * theme.consts.BW,
                color: '#808080',
              }}>
              ********
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5 * theme.consts.BW,
            }}>
            <Image
              source={require('../../assets/images/borouge.png')}
              style={{
                width: 200 * theme.consts.BW,
                height: 200 * theme.consts.BW,
              }}
              resizeMode="center"
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5 * theme.consts.BW,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20 * theme.consts.BW,
                color: '#808080',
              }}>
              SPONSORS
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5 * theme.consts.BW,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16 * theme.consts.BW,
                color: '#808080',
              }}>
              ********
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => Linking.openURL('********')}
              style={{
                padding: 10 * theme.consts.BW,
                borderRadius: 25 * theme.consts.BW,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 25 * theme.consts.BW,
                width: 250 * theme.consts.BW,
                backgroundColor: '#B2B3B3',
                opacity: 0.4,
              }}>
              <Text style={{fontSize: 18 * theme.consts.BW}}>********</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default AboutApp;
