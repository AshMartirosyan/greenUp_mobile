import {URL} from '../const/url';
import {encode} from 'base-64';

export const authenticate = async (username, password) => {
  const loginData = `${username}:${password}`;
  const loginDataBase64 = encode(loginData);

  return fetch(URL.AUTH, {
    headers: {
      Authorization: `Basic ${loginDataBase64}`,
      device: 'mobile',
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.warn(error);
      return;
    });
};
