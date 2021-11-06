import {combineReducers} from 'redux';

import auth from './groups/auth';
import general from './groups/general';
import profile from './groups/profile';
import home from './groups/home';
import fields from './groups/fields';

const appReducers = combineReducers({
  auth,
  general,
  profile,
  home,
  fields,
});

export default (state, action) => {
  return appReducers(state, action);
};
