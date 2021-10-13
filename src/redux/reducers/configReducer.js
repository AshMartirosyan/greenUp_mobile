import {
  getConfigsList,
  addNewConfigInList,
  editConfigInList,
  deleteConfigFromList,
} from '../../Epic/configEpic';

const UPDATE_CONFIGS_LIST = 'UPDATE_CONFIGS_LIST';

const initialState = {
  configs: [{type: 'Ցորեն', normal: '70', min: '20'}],
};

//----------------------MidleWhere Actions--------------------------//

export const fetchConfigsAction = (token) => {
  return async function (dispatch) {
    return await getConfigsList(token).then((configs) => {
      dispatch(updateConfigsAction(configs));
    });
  };
};

export const addNewConfig = (token, config) => {
  return async function (dispatch) {
    return await addNewConfigInList(token, config).then((configs) => {
      dispatch(updateConfigsAction(configs));
    });
  };
};

export const editConfig = (token, configWithID) => {
  return async function (dispatch) {
    return await editConfigInList(token, configWithID).then((configs) => {
      dispatch(updateConfigsAction(configs));
    });
  };
};

export const deleteConfig = (token, configID) => {
  return async function (dispatch) {
    return await deleteConfigFromList(token, configID).then((configs) => {
      dispatch(updateConfigsAction(configs));
    });
  };
};
//-----------------------------------------------------------------//

//----------------------Reducers Actions--------------------------//

export const updateConfigsAction = (data) => ({
  type: UPDATE_CONFIGS_LIST,
  payload: {
    configs: data,
  },
});

//-----------------------------------------------------------------//

const ConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CONFIGS_LIST: {
      return {...state, configs: action.payload.configs};
    }
    default:
      return state;
  }
};

export default ConfigReducer;
