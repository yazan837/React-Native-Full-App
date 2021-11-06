import {postData, fetchData, fileUpload} from './api';

export const fetchActivity = (userId) =>
  fetchData(
    `*******=${encodeURIComponent(
      JSON.stringify({
        trash: {$in: false},
        createdBy: {$in: userId},
      }),
    )}`,
  );

export const fetchMyRewards = (userId) =>
  fetchData(
    `********=${encodeURIComponent(
      JSON.stringify({
        trash: {$in: false},
        createdBy: {$in: userId},
      }),
    )}`,
  );

export const fetchRewards = () => fetchData('********');
export const fetchCategory = () => fetchData('********');
export const fetchActivityCategory = () => fetchData('********');
export const fetchAllactivity = () => fetchData('********');
export const fetchDashbord = () => fetchData('********');
export const fetchVendors = () => fetchData('********');
export const fetchAbout = () => fetchData('********');
export const uploadfile = (formData) => postData('********', formData);
export const uploadPhoto = (formData) => fileUpload(formData);
export const fetchCopon = (formData) => postData('********', formData);

export const takeAward = (formData) => postData('*****', formData);
