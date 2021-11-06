import {createAction} from '../creators';

export default {
  ...createAction('SHOW_ALERT', 'data'),
  ...createAction('HIDE_ALERT', 'data'),
};
