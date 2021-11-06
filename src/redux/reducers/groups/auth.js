import actions from '../../actions';
import {combineReducers} from 'redux';
import reacttotron from '../../Reactotron';
const {
  COMPLETE_LOG_IN,
  COMPLETE_SIGN_UP,
  SIGN_UP,
  LOG_OUT,
  LOG_IN,
  START_UP_DONE,
  FORGET_PASSWORD,
  COMPLETE_FORGET_PASSWORD,
  VERFIY_PASSWORD,
  COMPLETE_VERFIY_PASSWORD,
  CONFIRM_PASSWORD,
  COMPLETE_CONFIRM_PASSWORD,
} = actions;

const loggedIn = (state = false, action) => {
  switch (action.type) {
    case COMPLETE_LOG_IN:
    case COMPLETE_SIGN_UP:
      return action.formData.status;
    case LOG_OUT:
      return false;
    case START_UP_DONE:
      return Boolean(action.data.token);
    default:
      return state;
  }
};

const isLoggingIn = (state = false, action) => {
  switch (action.type) {
    case LOG_IN:
      return true;
    case COMPLETE_LOG_IN:
      return false;
    default:
      return state;
  }
};
const isForgetPassword = (state = false, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      return true;
    case COMPLETE_FORGET_PASSWORD:
      return false;
    default:
      return state;
  }
};
const isResetPassword = (state = false, action) => {
  switch (action.type) {
    case VERFIY_PASSWORD:
      return true;
    case COMPLETE_VERFIY_PASSWORD:
      return false;
    default:
      return state;
  }
};
const isConfirmPassword = (state = false, action) => {
  switch (action.type) {
    case CONFIRM_PASSWORD:
      return true;
    case COMPLETE_CONFIRM_PASSWORD:
      return false;
    default:
      return state;
  }
};
const isSigningUp = (state = false, action) => {
  switch (action.type) {
    case SIGN_UP:
      return true;
    case COMPLETE_SIGN_UP:
      return false;
    default:
      return state;
  }
};

const token = (state = null, action) => {
  switch (action.type) {
    case COMPLETE_LOG_IN:
    case COMPLETE_SIGN_UP:
      return action.formData.token;
    case COMPLETE_VERFIY_PASSWORD:
      return action.token;
    case START_UP_DONE:
      return action.data.token;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  loggedIn,
  isLoggingIn,
  isSigningUp,
  token,
  isForgetPassword,
  isResetPassword,
  isConfirmPassword,
});
