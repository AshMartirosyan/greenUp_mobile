import {URL} from '../const/url';

export const getConfigsList = (token) => {
  return fetch(URL.GET_CONFIGS_LIST, {
    method: 'GET',
    headers: {
      'x-access-token': token,
      device: 'mobile',
    },
  })
    .then((res) => res.json())
    .catch((error) => console.warn(error));
};

export const addNewConfigInList = (token, config) => {
  return fetch(URL.ADD_NEW_CONFIG, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
      device: 'mobile',
    },
    body: JSON.stringify(config),
  })
    .then((res) => res.json())
    .catch((error) => console.warn(error));
};

export const editConfigInList = (token, configWithId) => {
  return fetch(URL.UPDATE_CONFIG_LIST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
      device: 'mobile',
    },
    body: JSON.stringify(configWithId),
  })
    .then((res) => res.json())
    .catch((error) => console.warn(error));
};

export const deleteConfigFromList = (token, configId) => {
  return fetch(URL.DELETE_CONFIG, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
      device: 'mobile',
    },
    body: JSON.stringify(configId),
  })
    .then((res) => res.json())
    .catch((error) => console.warn(error));
};
