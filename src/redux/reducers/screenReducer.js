const SET_OPACITY = 'SET_OPACITY';

const initialState = {
  screenOpacity: false,
};

export const setOpacity = (state) => ({
  type: SET_OPACITY,
  state: state,
});

const ScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPACITY: {
      return {...state, screenOpacity: action.state};
    }
    default:
      return state;
  }
};

export default ScreenReducer;
