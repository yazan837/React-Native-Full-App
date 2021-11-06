import React from 'react';
import {StatusBar, View, Text, SafeAreaView} from 'react-native';

import theme from '../theme';
import reacttotron from '../redux/Reactotron';
import Tabs from './Tabs';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../redux/actions';
const {getProfile, fetchActivity, getPoints} = actions;
class HomeScreen extends React.Component {
  componentDidMount() {
    if (this.props.profile._id != null) {
      this.props.getPoints({
        userId: this.props.profile._id,
      });
    }
    this.didFocused = this.props.navigation.addListener('willFocus', () => {
      StatusBar.setBarStyle(this.getBarStyle());
    });
  }

  getBarStyle = () => {
    return 'dark-content';
  };

  render() {
    // if (this.props.profile._id != null) {
    //   this.props.fetchActivity({
    //     userId: this.props.profile._id,
    //   });
    // }
    return (
      <SafeAreaView>
        <StatusBar
          barStyle={this.getBarStyle()}
          backgroundColor={theme.colors.backgroundBarHome}
        />
        <View>
          <Tabs />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile.data,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({getProfile, fetchActivity, getPoints}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
