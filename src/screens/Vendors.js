import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native'
import theme from '../theme'
import Page from '../components/Page'
import reacttotron from '../redux/Reactotron'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import actions from '../redux/actions'
const {fetchVendors} = actions
import MapIcon from '../../assets/images/map.svg'
class Vendors extends React.Component {
  componentDidMount () {
    this.props.fetchVendors()
  }
  render () {
    const data = this.props.vendors
    return (
      <Page
        isLoading={this.props.isFethingVendors}
        isError={this.props.isFethingVendorsError}>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            margin: 10 * theme.consts.BW,
            marginTop: 30 * theme.consts.BW,
          }}>
          <Text
            style={{
              color: '#808080',
              // fontWeight: 'bold',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            Please find here below the list of participating Vendors
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            {data.map(item => {
              const scheme = Platform.select({
                ios: 'maps:0,0?q=',
                android: 'geo:0,0?q=',
              })
              const latLng = `${item.long},${item.lat}`
              const label = 'Custom Label'
              const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`,
              })
              return (
                <View style={styles.containerStyle}>
                  <View style={styles.battelcontainer}>
                    <Image
                      source={{
                        uri: item.image.replace(
                          'http://localhost:3030/file/',
                          'http://services.larsa.io/files/file/',
                        ),
                      }}
                      resizeMode='contain'
                      style={{
                        height: 50 * theme.consts.BW,
                        width: 50 * theme.consts.BW,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                    }}>
                    <Text style={{color: '#808080'}} numberOfLines={2}>
                      {item.title}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(url)}
                    style={styles.mapcontainer}>
                    <MapIcon style={styles.mapstyle} />
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>
        </ScrollView>
      </Page>
    )
  }
}
const mapStateToProps = state => ({
  isFethingVendors: state.home.isFethingVendors,
  isFethingVendorsError: state.home.isFethingVendorsError,
  vendors: state.home.vendors,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({fetchVendors}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Vendors)

const styles = StyleSheet.create({
  text: {
    fontSize: 20 * theme.consts.BW,
    color: '#808080',
  },
  image: {
    height: 30 * theme.consts.BW,
    tintColor: '#fff',
  },
  containerStyle: {
    borderWidth: 0.5 * theme.consts.BW,
    borderRadius: 2 * theme.consts.BW,
    borderColor: '#8CC6FF',

    // shadowColor: '#000',
    // shadowOpacity: 1 * theme.consts.BW,
    // shadowRadius: 2 * theme.consts.BW,
    elevation: 1 * theme.consts.BW,
    marginTop: 30 * theme.consts.BW,
    flexDirection: 'row',
    width: 380 * theme.consts.BW,
    height: 80 * theme.consts.BW,
    flex: 1,
    justifyContent: 'space-between',
    padding: 10 * theme.consts.BW,
  },
  battelcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapstyle: {height: 40 * theme.consts.BW, width: 40 * theme.consts.BW},
  mapcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60 * theme.consts.BW,
    backgroundColor: '#f2f2f2',
    borderWidth: 0.5,
    borderColor: 'grey',
  },
})

const rewards = [
  {
    image: require('../../assets/images/vendorstest.png'),
    text: 'You get a cup of coffee ',
    points: <MapIcon style={styles.mapstyle} />,
  },
  {
    image: require('../../assets/images/vendorstest.png'),
    text: 'You get a cup of coffee ',
    points: <MapIcon style={styles.mapstyle} />,
  },
  {
    image: require('../../assets/images/vendorstest.png'),
    text: 'You get a cup of coffee ',
    points: <MapIcon style={styles.mapstyle} />,
  },
  {
    image: require('../../assets/images/vendorstest.png'),
    text: 'You get a cup of coffee ',
    points: <MapIcon style={styles.mapstyle} />,
  },
  {
    image: require('../../assets/images/vendorstest.png'),
    text: 'You get a cup of coffee ',
    points: <MapIcon style={styles.mapstyle} />,
  },
  {
    image: require('../../assets/images/vendorstest.png'),
    text: 'You get a cup of coffee ',
    points: <MapIcon style={styles.mapstyle} />,
  },
  {
    image: require('../../assets/images/vendorstest.png'),
    text: 'You get a cup of coffee ',
    points: <MapIcon style={styles.mapstyle} />,
  },
]
