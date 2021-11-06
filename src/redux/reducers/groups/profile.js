import actions from '../../actions';
import {combineReducers} from 'redux';
const {
  GET_PROFILE,
  GET_PROFILE_DONE,
  SET_PROFILE_USER,
  PATCH_PROFILE_USER,
  UPDATE_PROFILE_USER,

  COMPLETE_LOG_IN,
  COMPLETE_SIGN_UP,
  LOG_OUT,
  START_UP_DONE,
} = actions;

const isLoading = (state = true, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return true;
    case GET_PROFILE_DONE:
      return false;
    default:
      return state;
  }
};

const data = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_DONE:
      return action.data;
    case COMPLETE_LOG_IN:
    case COMPLETE_SIGN_UP:
      return action.formData.profile;
    case START_UP_DONE:
      return action.data.profile;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_PROFILE_USER:
      return {...(action.user || {})};
    case PATCH_PROFILE_USER:
      return {...state, [action.param]: action.value};
    default:
      return state;
  }
};

const isUploadingPhoto = (state = true, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_USER:
      return Boolean(action.data);
    case GET_PROFILE_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isLoading,
  data,
  user,
  isUploadingPhoto,
});
