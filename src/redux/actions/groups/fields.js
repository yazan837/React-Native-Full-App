import {createAction} from '../creators';

export default {
  ...createAction('SET_FIELD', 'name', 'value'),
  ...createAction('RESET_FIELD', 'name'),
};
