import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  Keyboard,
  Alert,
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Page from '../components/Page';
import reacttotron from '../redux/Reactotron';
import FormButton from '../components/FormButton';

import theme from '../theme';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from '../redux/actions';
const {signUp} = actions;
import User from '../../assets/images/user.svg';
import Password from '../../assets/images/password.svg';
import Logo from '../../assets/images/login_logo.svg';
import reactotron from 'reactotron-react-native';
class SignUp extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      keyboardHeight: new Animated.Value(0),
    };
  }

  componentDidMount() {
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
      let regEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!regEmail.test(dataForm.email)) {
        Alert.alert('', 'Email address is incorrect');
        return false;
      }
      if (dataForm.password !== dataForm.passwordConfirmation) {
        Alert.alert('', 'Passwords does not match');
        return false;
      }
      if (dataForm.password.length < 6) {
        Alert.alert('', 'Password is too weak');
        return false;
      }
      return true;
    } else {
      Alert.alert('', 'All fields are required');
      return false;
    }
  };

  _signUp = (dataForm) => {
    if (this.validForm(dataForm)) {
      this.props.signUp({
        formData: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          passwordConfirmation: this.state.passwordConfirmation,
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
          style={{marginTop: 50 * theme.consts.BW}}
          contentContainerStyle={{alignItems: 'center'}}>
          <View>
            <Logo style={styles.logoimage} />
          </View>
          <View style={styles.container}>
            <View style={styles.textinput}>
              <User style={styles.inputImage} />
              <TextInput
                style={styles.input}
                placeholder={'First Name'}
                id="login"
                onChangeText={(firstName) =>
                  this.setState({firstName: firstName.trim()})
                }
              />
            </View>
            <View style={styles.textinput}>
              <User style={styles.inputImage} />
              <TextInput
                style={styles.input}
                placeholder={'Last Name'}
                id="login"
                onChangeText={(lastName) =>
                  this.setState({lastName: lastName.trim()})
                }
              />
            </View>
            <View style={styles.textinput}>
              <Image
                resizeMode="contain"
                style={styles.icon}
                source={require('../../assets/images/s3.png')}
              />
              <TextInput
                // caretHidden={true}
                style={styles.input}
                placeholder={'Email'}
                id="email"
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
            <View style={styles.textinput}>
              <Password style={styles.inputImage} />
              <TextInput
                style={styles.input}
                placeholder={'Confirm Password'}
                id="rePassword"
                secureTextEntry
                onChangeText={(passwordConfirmation) =>
                  this.setState({
                    passwordConfirmation: passwordConfirmation.trim(),
                  })
                }
              />
            </View>
          </View>
          <View style={{paddingTop: 50 * theme.consts.BW}}>
            <FormButton
              style={styles.button}
              isLoading={this.props.isSigningUp}
              title={'Sign up'}
              onClick={() => {
                this._signUp({
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  email: this.state.email,
                  password: this.state.password,
                  passwordConfirmation: this.state.passwordConfirmation,
                });
              }}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 20 * theme.consts.BW}}>
            <Text style={{color: '#808080', fontSize: 18 * theme.consts.BW}}>
              Back to{' '}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={{color: '#004987', fontSize: 18 * theme.consts.BW}}>
                Login?
              </Text>
            </TouchableOpacity>
          </View>
          <Animated.View style={{height: this.state.keyboardHeight}} />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  isSigningUp: state.auth.isSigningUp,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      signUp,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 350 * theme.consts.BW,
    marginTop: 50 * theme.consts.BW,
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
    marginTop: 50 * theme.consts.BW,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: theme.colors.first,
    width: 22 * theme.consts.BW,
    height: 36 * theme.consts.BW,
    margin: 10 * theme.consts.BW,
  },
});
