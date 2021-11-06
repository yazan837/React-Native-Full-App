import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import theme from '../theme';
import reacttotron from '../redux/Reactotron';

import {connect} from 'react-redux';
import CardContainer from '../components/CardContainer';
import Slider from '@ptomasroos/react-native-multi-slider';
// import Slider from 'react-native-smooth-slider'
import MainRow from '../../assets/images/Row.svg';
const Tab = ({title, current, onPress, item}) => (
  <TouchableOpacity onPress={onPress} disabled={current} style={styles.tab}>
    <View
      style={[
        styles.textContainer,
        current && styles.currentTabView,
        title == 'DAY' && styles.day,
        title == 'YEAR' && styles.year,
      ]}>
      <Text style={[styles.tabText, current && styles.currentTab]}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);
class Tabs extends Component {
  state = {currentTab: 1, value: 2000};

  getData = (id) => {
    if (id === 1) {
      return <CardContainer id={'Day'} />;
    } else if (id === 2) {
      return <CardContainer id={'Month'} />;
    } else if (id === 3) {
      return <CardContainer id={'Year'} />;
    }
  };
  Tool() {
    return (
      <Image
        style={{height: 80 * theme.consts.BW, width: 80 * theme.consts.BW}}
        source={require('../../assets/images/thumbSlider.png')}
      />
    );
  }
  render() {
    const total = this.props.Total;
    return (
      <SafeAreaView>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}>
          <View style={styles.containerTabs}>
            {[
              {
                id: 1,
                title: 'DAY',
                content: 'Day',
              },
              {
                id: 2,
                title: 'MONTH',
                content: 'Month',
              },
              {
                id: 3,
                title: 'YEAR',
                content: 'Year',
              },
            ].map((item) => (
              <View
                style={[
                  item.id == 1 || item.id == 3 ? styles.sidecontainer : null,
                ]}>
                <Tab
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  current={item.id === this.state.currentTab}
                  onPress={() => {
                    this.setState({currentTab: item.id});
                  }}
                />
              </View>
            ))}
          </View>

          <View style={styles.containerData}>
            <View
              style={{
                width: 380 * theme.consts.BW,
                marginTop: 30 * theme.consts.BW,
                height: 100 * theme.consts.BW,
                alignItems: 'center',
              }}>
              <View style={{zIndex: 2}}>
                <ImageBackground
                  style={{
                    width: 380 * theme.consts.BW,
                    height: 80 * theme.consts.BW,
                  }}
                  resizeMode="contain"
                  source={require('../../assets/images/rows2.png')}>
                  <Slider
                    sliderLength={333 * theme.consts.BW}
                    values={[total == 0 ? 0 : total]}
                    onValuesChange={(values) => this.setState({values})}
                    trackStyle={styles.track}
                    selectedStyle={{backgroundColor: '#004987'}}
                    customMarker={this.Tool}
                    markerStyle={styles.tt}
                    pressedMarkerStyle={styles.tt}
                    min={0}
                    max={10000}
                    enableLabel={true}
                    enabledOne={false}
                  />
                </ImageBackground>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>POPULAR ACTIONS</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <View>{this.getData(this.state.currentTab)}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  Total: state.home.totalPoints,
  dashbord: state.home.dashbord,
});

export default connect(mapStateToProps, null)(Tabs);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  tt: {color: 'red', borderColor: 'black', borderWidth: 9},
  containerTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10 * theme.consts.BW,
  },
  sidecontainer: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  containerData: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tab: {
    flexDirection: 'row',
    marginBottom: 20 * theme.consts.BW,
    marginTop: 20 * theme.consts.BW,
  },
  tabText: {
    textAlign: 'center',
    fontSize: 16 * theme.consts.BW,
    color: '#808080',
    width: 130 * theme.consts.BW,
    height: 38 * theme.consts.BW,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b2b3b3',
    width: 130 * theme.consts.BW,
    height: 38 * theme.consts.BW,
    marginHorizontal: 5 * theme.consts.BW,
    paddingTop: 19 * theme.consts.BW,
  },
  day: {
    borderTopLeftRadius: 50 * theme.consts.BW,
    borderBottomLeftRadius: 50 * theme.consts.BW,
  },
  year: {
    borderTopRightRadius: 50 * theme.consts.BW,
    borderBottomRightRadius: 50 * theme.consts.BW,
  },
  currentTab: {
    color: theme.colors.primaryColor,
  },
  currentTabView: {
    backgroundColor: '#107ae3',
  },
  flex: {flex: 1},
  track: {
    height: 12 * theme.consts.BW,
    borderRadius: 1 * theme.consts.BW,
    backgroundColor: '#E8E9EE',
    marginTop: 16 * theme.consts.BW,
  },
  thumb: {
    width: 50 * theme.consts.BW,
    height: 50 * theme.consts.BW,
    borderRadius: 100 * theme.consts.BW,
    backgroundColor: '#004987',
  },
  text: {
    fontSize: 22 * theme.consts.BW,
    color: '#808080',
    fontFamily: Platform.OS == 'android' ? 'GothamLight' : 'Feather',
    padding: 10 * theme.consts.BW,
    fontWeight: 'bold',
  },
});
