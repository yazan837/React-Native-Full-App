import auth from './groups/auth';
import general from './groups/general';
import profile from './groups/profile';
import home from './groups/home';
import fields from './groups/fields';

export default {
  ...auth,
  ...fields,
  ...general,
  ...profile,
  ...home,
};
