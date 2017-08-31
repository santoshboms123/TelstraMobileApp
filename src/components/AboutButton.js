import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Button } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

const AboutButton = ({ about }) => (
    <Button
    raised
    backgroundColor="#397af8"
    style={{marginBottom: 8}}
    onPress={about}
    title='Service help and support' />
);

AboutButton.propTypes = {
  about: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  //isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  about: () => dispatch(NavigationActions.navigate({ routeName: 'About' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutButton);
