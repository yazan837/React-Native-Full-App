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
  ActivityIndicator,
  Animated,
  ScrollView,
} from 'react-native';
import FormButton from '../components/FormButton';
import theme from '../theme';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import actions from '../redux/actions';
const {logIn} = actions;
import User from '../../assets/images/user.svg';
import Password from '../../assets/images/password.svg';
import Logo from '../../assets/images/login_logo.svg';
class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showRealApp: true,
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
  validForm = (dataForm) => {
    if (
      Object.values(dataForm).indexOf('') === -1 &&
      Object.values(dataForm).indexOf(undefined) === -1 &&
      Object.values(dataForm).indexOf(null) === -1
    ) {
      return true;
    }
    Alert.alert(' ', 'All fields are required');
    return false;
  };

  _logIn = (dataForm) => {
    Keyboard.dismiss();
    if (this.validForm(dataForm)) {
      this.props.logIn({
        formData: {
          email: dataForm.email,
          password: dataForm.password,
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
        <ScrollView
          contentContainerStyle={{alignItems: 'center'}}
          style={{marginTop: 40 * theme.consts.BW}}>
          <View>
            <Logo style={styles.logoimage} />
          </View>
          <View style={{margin: 20 * theme.consts.BW}}>
            <Text style={{textAlign: 'center', color: '#808080'}}>
              Login to your account to perform environmental actions and earn
              rewards!
            </Text>
          </View>
          <View style={styles.container}>
            <View style={styles.textinput}>
              <User style={styles.inputImage} />
              <TextInput
                // caretHidden={true}
                style={styles.input}
                placeholder={'Email'}
                id="login"
                onChangeText={(email) => this.setState({email: email.trim()})}
              />
            </View>
            <View style={styles.textinput}>
              <Password style={styles.inputImage} />
              <TextInput
                style={styles.input}
                placeholder={'Password'}
                id="password"
                secureTextEntry
                onChangeText={(password) =>
                  this.setState({password: password.trim()})
                }
              />
            </View>
          </View>
          <View style={styles.btnView}>
            <View>
              <FormButton
                isLoading={this.props.isLoggingIn}
                style={styles.button}
                title={'Sign In'}
                onClick={() => {
                  this._logIn({
                    email: this.state.email,
                    password: this.state.password,
                  });
                }}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForgetPassword')}
                style={{alignItems: 'flex-end'}}>
                <Text
                  style={{color: '#808080', fontSize: 14 * theme.consts.BW}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', margin: 15}}></View>
            <View
              style={{flexDirection: 'row', marginTop: 60 * theme.consts.BW}}>
              <Text style={{color: '#808080', fontSize: 18 * theme.consts.BW}}>
                Do not have an account ?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}>
                <Text
                  style={{color: '#004987', fontSize: 18 * theme.consts.BW}}>
                  {' '}
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Animated.View style={{height: this.state.keyboardHeight}} />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggingIn: state.auth.isLoggingIn,
  profile: state.auth.profile,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logIn,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
    height: 30 * theme.consts.BW,
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
    borderWidth: 1 * theme.consts.BW,
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
