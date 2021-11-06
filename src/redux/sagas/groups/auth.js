import {put, takeLatest, call, takeEvery} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {
  fetchLogIn,
  fetchSignUp,
  fetchResetPassword,
  fetchVerifyCode,
  fetchConfirmPassword,
} from '../../network/authorization';
import {fetchActivity} from '../../network/General';
import reacttotron from '../../Reactotron';
import {info} from '../../../services/alert';
import {Alert} from 'react-native';
import NavigatorService from '../../../services/navigator';
import SplashScreen from 'react-native-splash-screen';

import actions from '../../actions';
const {
  completeSignUp,
  SIGN_UP,
  completeLogIn,
  LOG_IN,
  FORGET_PASSWORD,
  completeForgetPassword,
  LOG_OUT,
  INIT_AUTH,
  START_UP,
  startUpDone,
  completeFetchActivity,
  VERFIY_PASSWORD,
  completeVerfiyPassword,
  setField,
  resetField,
  CONFIRM_PASSWORD,
  completeConfirmPassword,
} = actions;
//forgetPasswordStage
function* performSignup({formData}) {
  try {
    const result = yield call(fetchSignUp, formData);
    reacttotron.log('result', result);
    if (result.networkSuccess) {
      yield call(
        AsyncStorage.setItem,
        'profile',
        JSON.stringify(result.formData),
      );

      yield put(
        completeSignUp({
          formData: {
            status: true,
            profile: result.formData,
            token: result.token,
          },
        }),
      );
      yield call(AsyncStorage.setItem, 'token', result.token);
      NavigatorService.replace('TabNavigator');
    } else {
      yield put(
        completeSignUp({formData: {status: false, profile: {}, token: {}}}),
      );
      Alert.alert('Sorry', 'Wrong email or password please try again');
    }
  } catch {
    yield put(
      completeSignUp({formData: {status: false, profile: {}, token: {}}}),
    );
    Alert.alert(' ', 'catch errorr');
    return;
  }
}

export function* watchSignup() {
  yield takeLatest(SIGN_UP, performSignup);
}

function* performLogIn({formData}) {
  try {
    const result = yield call(fetchLogIn, formData);
    reacttotron.log('result', result);
    if (result.networkSuccess) {
      yield call(
        AsyncStorage.setItem,
        'profile',
        JSON.stringify(result.formData),
      );
      yield call(AsyncStorage.setItem, 'token', result.token);
      yield put(
        completeLogIn({
          formData: {
            status: true,
            profile: result.formData,
            token: result.token,
          },
        }),
      );
      NavigatorService.replace('App');
    } else {
      yield put(
        completeLogIn({formData: {status: false, profile: {}, token: {}}}),
      );
      Alert.alert(' ', 'Wrong Email or Password');
    }
  } catch {
    yield put(
      completeLogIn({formData: {status: false, profile: {}, token: {}}}),
    );
    Alert.alert('Sorry', 'Something went wrong please try again');
    return;
  }
}

export function* watchLogIn() {
  yield takeLatest(LOG_IN, performLogIn);
}
// forget password
function* performForgetPassword({formData}) {
  try {
    const result = yield call(fetchResetPassword, formData);
    yield put(completeForgetPassword());
    reacttotron.log('result', result);
    if (result.networkSuccess) {
      yield put(setField({name: 'forgetPasswordStage', value: 'verfiy'}));
    } else {
      Alert.alert('Sorry', 'The email address doesn’t exist');
    }
  } catch {
    yield put(completeForgetPassword());
    Alert.alert('Sorry', 'Something went wrong please try again');
    return;
  }
}

export function* watchForgetPassword() {
  yield takeLatest(FORGET_PASSWORD, performForgetPassword);
}
// verify code
function* performVerfiyPassword({formData}) {
  try {
    const result = yield call(fetchVerifyCode, formData);
    reacttotron.log('result', result);
    if (result.networkSuccess) {
      yield call(AsyncStorage.setItem, 'token', result.formData.token);
      yield put(
        completeVerfiyPassword({
          token: result.formData.token,
        }),
      );
      yield put(setField({name: 'forgetPasswordStage', value: 'password'}));
    } else {
      yield put(
        completeVerfiyPassword({
          token: '',
        }),
      );
      Alert.alert('Sorry', 'You have entered wrong code, Please try again');
    }
  } catch {
    yield put(
      completeVerfiyPassword({
        token: '',
      }),
    );
    Alert.alert('Sorry', 'Something went wrong please try again');
    return;
  }
}

export function* watchVerfiyPassword() {
  yield takeLatest(VERFIY_PASSWORD, performVerfiyPassword);
}

function* performConfirmPassword({formData}) {
  try {
    const result = yield call(fetchConfirmPassword, formData);
    reacttotron.log('result', result);
    if (result.networkSuccess) {
      yield put(completeConfirmPassword());
      NavigatorService.replace('Login');

      yield put(resetField({name: 'forgetPasswordStage'}));
    } else {
      yield put(completeConfirmPassword());
      Alert.alert('Sorry', 'Something went wrong please try again');
    }
  } catch {
    yield put(completeConfirmPassword());
    Alert.alert('Sorry', 'Something went wrong please try again');
    return;
  }
}

export function* watchConfirmPassword() {
  yield takeLatest(CONFIRM_PASSWORD, performConfirmPassword);
}

// Log out
function* performLogOut({formData}) {
  reacttotron.log('log out');
  try {
    NavigatorService.replace('Login');
    yield AsyncStorage.removeItem('profile');
    yield AsyncStorage.removeItem('token');
  } catch (error) {}
}

export function* watchLogOut() {
  yield takeLatest(LOG_OUT, performLogOut);
}
function* performInit() {
  const token = yield AsyncStorage.getItem('token');
  if (token) {
    yield put(actions.initToken(token));
  }
}
export function* watchInit() {
  yield takeEvery(INIT_AUTH, performInit);
}

function* performStartUp() {
  const token = yield call(AsyncStorage.getItem, 'token');
  const profile = yield call(AsyncStorage.getItem, 'profile');

  reacttotron.log('token', token);
  reacttotron.log('profile', profile);

  if (token) {
    yield put(startUpDone({data: {token, profile: JSON.parse(profile)}}));

    yield call(() => NavigatorService.replace('App'));
  } else {
    yield call(() => NavigatorService.replace('Auth'));
  }

  yield call(SplashScreen.hide);
}

export function* watchStartUp() {
  yield takeLatest(START_UP, performStartUp);
}
