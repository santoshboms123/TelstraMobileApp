import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import About from '../components/Service';
import Roaming from '../components/Roaming';
import Outage from '../components/Outage';
import Billing from '../components/Billing';
import Service from '../components/Service';
import Offer from '../components/Offer';
import Map from '../components/Map';
import Map2 from '../components/Map2';
import Map3 from '../components/Map3';
import Address from '../components/Address';

export const AppNavigator = StackNavigator({
  Main: { screen: MainScreen },
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
  About: {screen: About, navigationOptions:{title: 'About'}},
  Roaming: {screen: Roaming},
  Outage: {screen: Outage},
  Billing: {screen: Billing},
  Service: {screen: Service},
  Offer: {screen: Offer},
  Map: {screen: Map},
  Map2: {screen: Map2},
  Map3: {screen: Map3},
  Address: {screen: Address}
},{ headerMode: 'none' });

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  //Address: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
