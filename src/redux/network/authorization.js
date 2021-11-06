import {postData, fetchData} from './api';

export const fetchSignUp = (formData) => postData('----', formData, 'auth');
export const fetchLogIn = (formData) => postData('*****', formData, 'auth');
export const fetchLogout = (data) => postData('-------', data);
export const fetchResetPassword = (data) =>
  postData('********', data, null, 'passwordSetup');
export const fetchVerifyCode = (data) => postData('*****', data, 'auth');
export const fetchConfirmPassword = (data) =>
  postData('*******', data, 'auth', 'passwordSetup');

export const fetchProfile = () => postData('******');
export const fetchEditProfile = (data) => postData('//******', data);
