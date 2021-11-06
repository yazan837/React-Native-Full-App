export const URL = '*************';
import store from '../store';
import reactotron from 'reactotron-react-native';
import axios from 'axios';

const getToken = () => store.getState().auth.token;

export const buildHeaders = () => {
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'x-client': '****',
  };
  const token = getToken();

  if (token != null) {
    return {
      ...headers,
      'x-access-token': token,
    };
  }

  return headers;
};

const patchData = async (endpoint, body) => {
  const url = `${URL}${endpoint}`;
  const headers = buildHeaders();

  return fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => processResponse(res))
    .then((res) => {
      return {
        networkSuccess: res.statusCode == 200,
        formData: res.data,
      };
    })

    .catch((e) => ({networkSuccess: false}));
};

const fetchData = async (endpoint, body) => {
  const url = `${URL}${endpoint}`;
  const headers = buildHeaders();

  return fetch(url, {
    method: 'GET',
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res != null) {
        return {networkSuccess: true, formData: res};
      } else {
        return {networkSuccess: false, ...res};
      }
    })
    .catch((e) => ({networkSuccess: false}));
};

const postData = async (endpoint, body, auth, passwordSetup) => {
  const url = `${URL}${endpoint}`;
  const headers = buildHeaders();

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => processResponse(res, auth, passwordSetup))
    .then((res) => {
      return {
        networkSuccess: res.statusCode == 200,
        formData: res.data,
        token: auth ? res.token : '',
      };
    })

    .catch((e) => ({networkSuccess: false}));
};

function processResponse(response, auth, passwordSetup) {
  const statusCode = response.status;

  if (passwordSetup) {
    return Promise.all([statusCode, {}, '']).then((res) => ({
      statusCode: res[0],
      data: res[1],
      token: res[2],
    }));
  }

  const data = statusCode != 200 ? {} : response.json();
  let token = auth ? response.headers.get('x-access-token') : '';

  return Promise.all([statusCode, data, token]).then((res) => ({
    statusCode: res[0],
    data: res[1],
    token: res[2],
  }));
}

const fileUpload = async (data, setPercentCompleted) => {
  reactotron.log('datadatadata', data);
  let res = null;
  const headers = buildHeaders();

  try {
    res = await axios.post('*******', data, {
      headers,
    });
  } catch (error) {
    reactotron.log('error', error);
    res = null;
  }
  return res;
};

export {fetchData, postData, fileUpload, patchData};
