import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Button } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

const RoamingButton = ({ roaming }) => (
    <Button
    raised
    backgroundColor="#397af8"
    style={{marginBottom: 8}}
    onPress={roaming}
    title='Roaming' />
);

RoamingButton.propTypes = {
  roaming: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  //isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  roaming: () => dispatch(NavigationActions.navigate({ routeName: 'Roaming' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoamingButton);
