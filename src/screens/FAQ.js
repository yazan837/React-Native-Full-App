import React from 'react'
import {Text, View, StyleSheet, Image, FlatList, ScrollView} from 'react-native'
import Page from '../components/Page'
import reacttotron from '../redux/Reactotron'
import theme from '../theme'
class FAQ extends React.Component {
  render () {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#FFFFFF',
          flex: 1,
          height: '100%',
        }}>
        <View style={{margin: 10 * theme.consts.BW}}>
          <View style={{padding: 10 * theme.consts.BW}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16 * theme.consts.BW,
                color: '#231F20',
                   fontFamily: Platform.OS =='android' ? 'GothamLight' : 'Feather',
                opacity: 0.7,
              }}>
              WHAT IS THE PURPOSE OF BAADR APP?
            </Text>
          </View>
          <View
            style={{
              padding: 10 * theme.consts.BW,
            }}>
            <Text
              style={{
                fontSize: 16 * theme.consts.BW,
                color: '#808080',
              }}>
              Minimise environmental impact and promote environmental
              protection.
            </Text>
          </View>
          <View
            style={{
              padding: 10 * theme.consts.BW,
            }}>
            <Text
              style={{
                fontSize: 16 * theme.consts.BW,
                color: '#808080',
              }}>
              Encourage community to adopt environmental actions and modify
              behaviour.
            </Text>
          </View>
          <View
            style={{
              padding: 10 * theme.consts.BW,
            }}>
            <Text
              style={{
                fontSize: 16 * theme.consts.BW,
                color: '#808080',
              }}>
              Promote sustainability and enhance environmental education and
              awareness to the community.
            </Text>
          </View>
          <View
            style={{
              padding: 10 * theme.consts.BW,
            }}>
            <Text
              style={{
                fontSize: 16 * theme.consts.BW,
                color: '#808080',
              }}>
              Involve private sector companies (vendors) and provide a channel
              to promote CSR achieve support of journalists, media, and
              influencers.
            </Text>
          </View>
          <View style={{padding: 10 * theme.consts.BW}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16 * theme.consts.BW,
                color: '#231F20',
                   fontFamily: Platform.OS =='android' ? 'GothamLight' : 'Feather',
                opacity: 0.7,
              }}>
              HOW CAN I USE BAADR:
            </Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>1. Create a new user account.</Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>
              2. Select one of the many actions or missions aimed at
              environmental sustainability
            </Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>
              3. Follow instruction to prove your action: e.g. Upload an image
            </Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>4. Collect the points</Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>
              5. Convert points at a participating Outlet or Vendor, based on
              points available and Reward value
            </Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>6. Start over</Text>
          </View>
          <View style={{padding: 10 * theme.consts.BW}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16 * theme.consts.BW,
                color: '#231F20',
                   fontFamily: Platform.OS =='android' ? 'GothamLight' : 'Feather',
                opacity: 0.7,
              }}>
              HOW CAN I EARN REWARDS?
            </Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>1. Create a new user account.</Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>
              2. Select one of the many actions or missions aimed
            </Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>
              3. Follow instruction to prove your action: e.g. Upload an image
            </Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>4. Collect the points</Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>
              5. Convert points at a participating Outlet or Vendor, based on
              points available and Reward value
            </Text>
          </View>
          <View
            style={{
              paddingStart: 10 * theme.consts.BW,
            }}>
            <Text style={styles.text}>6. Start over</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default FAQ
const styles = StyleSheet.create({
  box: {
    borderColor: '#8CC6FF',
    borderWidth: 1 * theme.consts.BW,
    margin: 20 * theme.consts.BW,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 350 * theme.consts.BW,
    padding: 20 * theme.consts.BW,
  },
  text: {
    fontSize: 16 * theme.consts.BW,
    color: '#808080',
    marginTop: 10 * theme.consts.BW,
  },
})
