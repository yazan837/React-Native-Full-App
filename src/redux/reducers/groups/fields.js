import {combineReducers} from 'redux';

import actions from '../../actions';
const {SET_FIELD, RESET_FIELD} = actions;

export default (state = {}, action) => {
  switch (action.type) {
    case SET_FIELD:
      return {...state, [action.name]: action.value};
    case RESET_FIELD:
      const fieldsSet = {...state};
      delete fieldsSet[action.name];
      return fieldsSet;
    default:
      return state;
  }
};
