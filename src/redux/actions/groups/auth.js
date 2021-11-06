import {createAction} from '../creators';

export default {
  ...createAction('LOG_IN', 'formData'),
  ...createAction('FORGET_PASSWORD', 'formData'),
  ...createAction('COMPLETE_FORGET_PASSWORD'),
  ...createAction('VERFIY_PASSWORD', 'formData'),
  ...createAction('COMPLETE_VERFIY_PASSWORD', 'token'),
  ...createAction('CONFIRM_PASSWORD', 'formData'),
  ...createAction('COMPLETE_CONFIRM_PASSWORD'),
  ...createAction('COMPLETE_LOG_IN', 'formData'),
  ...createAction('SIGN_UP', 'formData'),
  ...createAction('COMPLETE_SIGN_UP', 'formData'),
  ...createAction('LOG_OUT'),
  ...createAction('INIT_AUTH'),
  ...createAction('INIT_TOKEN', 'token'),

  ...createAction('START_UP'),
  ...createAction('START_UP_DONE', 'data'),
};
