import {combineReducers} from 'redux';
import LoginReducer from './loginReducer';
import HardwareReducer from './hardwareReducer';
import DialogReducer from './dialogReducer';
import ConfigReducer from './configReducer';
import ScreenReducer from './screenReducer';

const Reducers = {
  LoginReducer,
  DialogReducer,
  HardwareReducer,
  ConfigReducer,
  ScreenReducer,
};

export default combineReducers(Reducers);
