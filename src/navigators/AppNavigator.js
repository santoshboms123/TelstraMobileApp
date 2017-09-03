import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import About from '../components/About';
import Roaming from '../components/Roaming';
import Outage from '../components/Outage';
import Billing from '../components/Billing';
import Service from '../components/Service';

export const AppNavigator = StackNavigator({
  Main: { screen: MainScreen },
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
  About: {screen: About, navigationOptions:{title: 'About'}},
  Roaming: {screen: Roaming},
  Outage: {screen: Outage},
  Billing: {screen: Billing},
  Service: {screen: Service}
},{ headerMode: 'none' });

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
