import {fetchData, patchData, fileUpload} from './api';

export const fetchProfile = (formData) => fetchData('********');
export const patchProfile = (formData) => patchData('********', formData);
export const uploadProfilePhoto = (formData) => fileUpload(formData);
