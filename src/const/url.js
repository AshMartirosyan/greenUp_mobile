const BASE_URL = 'http://192.168.1.3:3000';

export const URL = {
  AUTH: `${BASE_URL}/auth`,
  GET_HARDWARES_LIST: `${BASE_URL}/user/get/hardwares`,
  CHANGE_ONE: `${BASE_URL}/user/post/multipleValveState`,
  CHANGE_ALL: `${BASE_URL}/user/post/allValveState`,
  GET_CONFIGS_LIST: `${BASE_URL}/user/get/configs`,
  CHANGE_HARDWARE_CONFIG: `${BASE_URL}/user/post/changeHardwareConfig`,
  ADD_NEW_CONFIG: `${BASE_URL}/user/put/addNewConfig`,
  DELETE_CONFIG: `${BASE_URL}/user/delete/deleteConfig`,
  UPDATE_CONFIG_LIST: `${BASE_URL}/user/post/updateConfigInList`,
};
