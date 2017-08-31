import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#FFFFFF',
  },
  buttons: {
    marginBottom: 20
  }
});

const RelatedHelpButton = ({ relatedHelp }) => (
    <Button
    raised
    backgroundColor="#397af8"
    style={{marginBottom: 8}}
    onPress={relatedHelp}
    title='Related help and support' />
);

RelatedHelp.propTypes = {
    relatedHelp: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  //isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
    relatedHelp: () => dispatch(NavigationActions.navigate({ routeName: 'RelatedHelp' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(OutageButton);
