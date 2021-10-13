import {
  changeOneEpic,
  changeAllEpic,
  getHardwaresList,
  changeHardwareConfig,
} from '../../Epic/hardwareEpic';

const FETCHED_HARDWARES_LIST = 'FETCHED_HARDWARES_LIST';
const CHANGED_ONE = 'CHANGED_ONE';
const CHANGED_ALL = 'CHANGED_ALL';

const initialState = {
  hardwares: [
    {
      id: '601153c202e9d241473b4ed1',
      moistureValue: '20',
      valveState: '0',
      location: 'YEREVAN',
      auto: true,
      config: {
        type: 'Ցորեն',
        normal: '70',
        min: '20',
      },
    },
  ],
  isAllTurnedOn: false,
};

//----------------------MidleWhere Actions--------------------------//

export const fetchHardwaresAction = (token) => {
  return async function (dispatch) {
    return await getHardwaresList(token).then((hardwares) => {
      dispatch(fetchedHardwaresAction(hardwares));
    });
  };
};

export const changeOne = (fetchedData) => {
  return async function (dispatch) {
    return await changeOneEpic(fetchedData).then((data) => {
      dispatch(changedOne(data));
    });
  };
};

export const changeAll = (fetchedData) => {
  return async function (dispatch) {
    return await changeAllEpic(fetchedData).then((data) => {
      dispatch(changedAll(data));
    });
  };
};

export const changeConfig = (token, body) => {
  return async function (dispatch) {
    return await changeHardwareConfig(token, body).then((data) => {
      dispatch(changedOne(data));
    });
  };
};

//-----------------------------------------------------------------//

//----------------------Reducers Actions--------------------------//

const changedOne = (data) => ({
  type: CHANGED_ONE,
  payload: {
    hardware: data,
  },
});

const fetchedHardwaresAction = (data) => ({
  type: FETCHED_HARDWARES_LIST,
  payload: {
    hardwares: data,
  },
});

const changedAll = (data) => ({
  type: CHANGED_ALL,
  payload: {
    hardwares: data,
  },
});

const isAllTurnedOn = (hardwares) => {
  const turnedOff = hardwares.filter((hardware) => hardware.valveState === 1);
  return turnedOff.length === 0 ? true : false;
};

//-----------------------------------------------------------------//

const HardwareReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_HARDWARES_LIST: {
      return {
        ...state,
        hardwares: action.payload.hardwares,
        isAllTurnedOn: isAllTurnedOn(action.payload.hardwares),
      };
    }

    case CHANGED_ONE: {
      const newHardware = action.payload.hardware;
      const hardwares = state.hardwares.map((hardware) => {
        if (hardware._id === newHardware._id) {
          return newHardware;
        }
        return hardware;
      });

      return {
        ...state,
        hardwares: hardwares,
        isAllTurnedOn: isAllTurnedOn(hardwares),
      };
    }

    case CHANGED_ALL: {
      return {
        ...state,
        hardwares: action.payload.hardwares,
        isAllTurnedOn: isAllTurnedOn(action.payload.hardwares),
      };
    }

    default:
      return state;
  }
};

export default HardwareReducer;
