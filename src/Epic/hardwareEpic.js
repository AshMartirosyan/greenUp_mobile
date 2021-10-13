import {URL} from '../const/url';

export const getHardwaresList = (token) => {
  return fetch(URL.GET_HARDWARES_LIST, {
    method: 'GET',
    headers: {
      'x-access-token': token,
      device: 'mobile',
    },
  })
    .then((res) => res.json())
    .catch((error) => console.warn(error));
};

export const changeHardwareConfig = (token, body) => {
  return fetch(URL.CHANGE_HARDWARE_CONFIG, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
      device: 'mobile',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((error) => console.warn(error));
};

export const changeOneEpic = (data) => {
  const body = {
    hardwareIDs: [data.id],
    valveState: data.valveState,
    auto: data.auto,
  };
  return fetch(URL.CHANGE_ONE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': data.token,
      device: 'mobile',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((error) => console.warn(error));
};

export const changeAllEpic = (data) => {
  const body = {
    valveState: data.valveState,
    auto: data.auto,
  };
  return fetch(URL.CHANGE_ALL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': data.token,
      device: 'mobile',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((error) => console.warn(error));
};
