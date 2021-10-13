import {authenticate} from '../../Epic/loginEpic';

const LOGIN_USER = 'LOGIN_USER';
const LOGGED_USER = 'LOGGED_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export const userLogin = (username, password) => {
  return async function (dispatch) {
    return await authenticate(username, password).then((data) => {
      dispatch(userLogged(data));
    });
  };
};

const userLogged = (data) => ({
  type: LOGGED_USER,
  payload: {
    token: data.token,
    isLogged: data.auth,
  },
});

export const userLogOut = () => ({
  type: LOGOUT_USER,
});

const initialState = {
  isLogged: false,
  token: 'a',
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {...state, isLogged: true};
    }
    case LOGGED_USER: {
      return {
        ...state,
        isLogged: action.payload.isLogged,
        token: action.payload.token,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isLogged: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
