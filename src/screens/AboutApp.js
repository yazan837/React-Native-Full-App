import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import reacttotron from '../redux/Reactotron';
import Page from '../components/Page';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import theme from '../theme';
import actions from '../redux/actions';
import {withNavigation} from 'react-navigation';
const {fetchAbout} = actions;

class AboutUs extends React.Component {
  componentDidMount() {
    this.props.fetchAbout();
  }
  renderItem = ({item}) => {
    let photo = item.image.replace('********', '********');
    return (
      <View style={{alignItems: 'center'}}>
        <View>
          <Image
            source={require('../../assets/images/AboutAppLogo.png')}
            resizeMode="center"
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#808080', textAlign: 'center'}}>
            {item.summary}
          </Text>
        </View>
        <View style={{marginTop: 20 * theme.consts.BW}}>
          <Image
            source={{uri: photo}}
            resizeMode="contain"
            style={{
              height: 300 * theme.consts.BW,
              width: 380 * theme.consts.BW,
            }}
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <Page
        isLoading={this.props.isFethingAbout}
        isError={this.props.isFethingAboutError}
        contentStyle={{backgroundColor: '#fff'}}>
        <FlatList
          data={this.props.about.slice(1)}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  isFethingAbout: state.home.isFethingAbout,
  isFethingAboutError: state.home.isFethingAboutError,
  about: state.home.about,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchAbout}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(AboutUs));
