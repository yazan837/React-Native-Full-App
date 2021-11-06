import actions from '../../actions';
import {combineReducers} from 'redux';
const {SHOW_ALERT, HIDE_ALERT} = actions;

const alertIsShown = (state = false, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return true;
    case HIDE_ALERT:
      return false;
    default:
      return state;
  }
};

const alertData = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {title: action.data.title, message: action.data.message};
    default:
      return state;
  }
};

export default combineReducers({
  alertIsShown,
  alertData,
});
