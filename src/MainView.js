import React from 'react';
import {connect} from 'react-redux';

import LoginScreen from './screens/LoginScreen';
import {BaseBottomTabNavigation as RootScreen} from './navigation/BaseNavigation';

const MainView = (props) => {
  return <>{props.isLogged ? <RootScreen /> : <LoginScreen />}</>;
};

const mapStatetoProps = (state) => ({
  isLogged: state.LoginReducer.isLogged,
});

export default connect(mapStatetoProps)(MainView);
