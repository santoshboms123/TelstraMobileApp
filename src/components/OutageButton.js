import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Button } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

const OutageButton = ({ outage }) => (
    <Button
    raised
    backgroundColor="#397af8"
    style={{marginBottom: 8}}
    onPress={outage}
    title='Outage' />
);

OutageButton.propTypes = {
  outage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  //isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  outage: () => dispatch(NavigationActions.navigate({ routeName: 'Outage' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(OutageButton);
