import {createAction} from '../creators';

export default {
  ...createAction('GET_PROFILE'),
  ...createAction('GET_PROFILE_DONE', 'data'),

  ...createAction('SET_PROFILE_USER', 'user'),
  ...createAction('PATCH_PROFILE_USER', 'param', 'value'),
  ...createAction('UPDATE_PROFILE_USER', 'field', 'data'),
};
