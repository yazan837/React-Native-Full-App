import store from '../redux/store';


import actions from '../redux/actions';
const { showAlert } = actions;

export const info = (prop1, prop2) => {
  let title, message;
  if (prop2) {
    title = prop1;
    message = prop2;
  } else {
    title = 'General Alert';
    message = prop1;
  }
  store.dispatch(showAlert({ data: { title, message } }));
};
