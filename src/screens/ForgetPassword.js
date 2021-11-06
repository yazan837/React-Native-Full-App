import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  Keyboard,
  Alert,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  ActivityIndicator,
  Animated,
  ScrollView,
} from 'react-native';
import FormButton from '../components/FormButton';
import theme from '../theme';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import actions from '../redux/actions';
const {verfiyPassword, forgetPassword, confirmPassword} = actions;
import User from '../../assets/images/user.svg';
import Password from '../../assets/images/password.svg';
import Logo from '../../assets/images/login_logo.svg';
class ForgetPassword extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailTitle: '',
      newPassword: '',
      newpasswordconfirmation: '',
      code: '',
      MainScreen: true,

      keyboardHeight: new Animated.Value(0),
    };
  }
  async componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    Animated.timing(this.state.keyboardHeight, {
      toValue: e.endCoordinates.height,
      duration: 100,
    }).start();
  };

  _keyboardDidHide = () => {
    Animated.timing(this.state.keyboardHeight, {
      toValue: 0,
      duration: 100,
    }).start();
  };
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

    this.setState({MainScreen: !this.state.MainScreen});
  };
  validForm = (dataForm, password) => {
    if (
      Object.values(dataForm).indexOf('') === -1 &&
      Object.values(dataForm).indexOf(undefined) === -1 &&
      Object.values(dataForm).indexOf(null) === -1
    ) {
      if (password && dataForm.password != dataForm.confirmPassword) {
        Alert.alert('Sorry', 'Passwords does not match');
        return false;
      }
      return true;
    }
    Alert.alert(' ', 'All fields are required');
    return false;
  };

  _Confirm = (dataForm) => {
    Keyboard.dismiss();
    if (this.validForm(dataForm)) {
      this.props.forgetPassword({
        formData: {
          email: dataForm.email,
        },
      }),
        this.setState({MainScreen: false});
    }
    return;
  };
  _Verfiy = (dataForm) => {
    Keyboard.dismiss();
    if (this.validForm(dataForm)) {
      this.props.verfiyPassword({
        formData: {
          email: dataForm.emailTitle,
          code: dataForm.code,
        },
      });
    }
    return;
  };

  _ConfirmPassword = (dataForm) => {
    Keyboard.dismiss();
    if (this.validForm(dataForm, 'password')) {
      this.props.confirmPassword({
        formData: {
          password: dataForm.newPassword,
          passwordConfirmation: dataForm.newpasswordconfirmation,
        },
      });
    }
    return;
  };

  render() {
    return (
      <ImageBackground
        style={styles.cover}
        source={require('../../assets/images/LoginBackground.png')}
        resizeMode="cover">
        <Animatable.View useNativeDriver={true} animation="zoomIn" delay={50}>
          {this.props.stage === 'verfiy' ? (
            <ScrollView
              contentContainerStyle={{alignItems: 'center'}}
              style={{marginTop: 40 * theme.consts.BW}}>
              <View>
                <Logo style={styles.logoimage} />
              </View>
              <View style={{margin: 20 * theme.consts.BW}}>
                <Text style={{textAlign: 'center', color: '#808080'}}>
                  Enter Your Password Here Please
                </Text>
              </View>
              <View style={styles.container}>
                <View style={styles.textinput}>
                  <User style={styles.inputImage} />
                  <TextInput
                    caretHidden={true}
                    style={styles.input}
                    placeholder={'Your Email'}
                    id="emailTitle"
                    onChangeText={(emailTitle) =>
                      this.setState({emailTitle: emailTitle.trim()})
                    }
                  />
                </View>
                <View style={styles.textinput}>
                  <Password style={styles.inputImage} />
                  <TextInput
                    style={styles.input}
                    placeholder={'Code'}
                    id="Code"
                    onChangeText={(code) => this.setState({code: code.trim()})}
                  />
                </View>
              </View>
              <View style={styles.btnView}>
                <View>
                  <FormButton
                    isLoading={this.props.isResetPassword}
                    style={styles.button}
                    title={'Confirm'}
                    onClick={() => {
                      this._Verfiy({
                        emailTitle: this.state.emailTitle,
                        code: this.state.code,
                      });
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', margin: 15}}></View>
              </View>
              <Animated.View style={{height: this.state.keyboardHeight}} />
            </ScrollView>
          ) : this.props.stage === 'password' ? (
            <ScrollView
              contentContainerStyle={{alignItems: 'center'}}
              style={{marginTop: 40 * theme.consts.BW}}>
              <View>
                <Logo style={styles.logoimage} />
              </View>
              <View style={{margin: 20 * theme.consts.BW}}>
                <Text style={{textAlign: 'center', color: '#808080'}}>
                  Enter your new password
                </Text>
              </View>
              <View style={styles.container}>
                <View style={styles.textinput}>
                  <Password style={styles.inputImage} />
                  <TextInput
                    caretHidden={true}
                    style={styles.input}
                    placeholder={'New password'}
                    secureTextEntry
                    id="newpassword"
                    onChangeText={(value) =>
                      this.setState({newPassword: value.trim()})
                    }
                  />
                </View>
                <View style={styles.textinput}>
                  <Password style={styles.inputImage} />
                  <TextInput
                    style={styles.input}
                    placeholder={'New password confirmation'}
                    id="newpasswordconfirmation"
                    secureTextEntry
                    onChangeText={(value) =>
                      this.setState({newpasswordconfirmation: value.trim()})
                    }
                  />
                </View>
              </View>
              <View style={styles.btnView}>
                <View>
                  <FormButton
                    isLoading={this.props.isConfirmPassword}
                    style={styles.button}
                    title={'Confirm'}
                    onClick={() => {
                      this._ConfirmPassword({
                        newPassword: this.state.newPassword,
                        newpasswordconfirmation: this.state
                          .newpasswordconfirmation,
                      });
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', margin: 15}}></View>
              </View>
              <Animated.View style={{height: this.state.keyboardHeight}} />
            </ScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={{alignItems: 'center'}}
              style={{marginTop: 40 * theme.consts.BW}}>
              <View>
                <Logo style={styles.logoimage} />
              </View>
              <View style={{margin: 20 * theme.consts.BW}}>
                <Text style={{textAlign: 'center', color: '#808080'}}>
                  You will Recive Active Code on Your Email Please
                </Text>
              </View>
              <View style={styles.container}>
                <View style={styles.textinput}>
                  <User style={styles.inputImage} />
                  <TextInput
                    caretHidden={true}
                    style={styles.input}
                    placeholder={'Email'}
                    id="Email"
                    onChangeText={(email) =>
                      this.setState({email: email.trim()})
                    }
                  />
                </View>
              </View>
              <View style={styles.btnView}>
                <View>
                  <FormButton
                    isLoading={this.props.isForgetPassword}
                    style={styles.button}
                    title={'Send Code'}
                    onClick={() => {
                      this._Confirm({
                        email: this.state.email,
                      });
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', margin: 15}}></View>
              </View>
              <Animated.View style={{height: this.state.keyboardHeight}} />
            </ScrollView>
          )}
        </Animatable.View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  isForgetPassword: state.auth.isForgetPassword,
  isResetPassword: state.auth.isResetPassword,
  isConfirmPassword: state.auth.isConfirmPassword,
  stage: state.fields.forgetPasswordStage,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      verfiyPassword,
      forgetPassword,
      confirmPassword,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 250 * theme.consts.BW,
  },
  input: {
    color: '#000',
    width: '80%',
    textAlign: 'auto',
       fontFamily: Platform.OS =='android' ? 'GothamLight' : 'Feather',
  },
  inputImage: {
    width: 30 * theme.consts.BW,
    height: 40 * theme.consts.BW,
    margin: 10 * theme.consts.BW,
  },
  logoimage: {
    width: 175 * theme.consts.BW,
    height: 100 * theme.consts.BW,
  },
  button: {
    minWidth: 350 * theme.consts.BW,
    height: 60 * theme.consts.BW,
    borderRadius: 0 * theme.consts.BW,
    backgroundColor: '#107ae3',
  },
  cover: {height: '100%', width: '100%'},
  textinput: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomLeftRadius: 20 * theme.consts.BW,
    justifyContent: 'center',
    margin: 10 * theme.consts.BW,
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: 'grey',
  },
  btnView: {
    minHeight: 200 * theme.consts.BW,
    marginTop: 15 * theme.consts.BW,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
