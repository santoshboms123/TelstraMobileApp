import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import AboutButton from './AboutButton';
import RoamingButton from './RoamingButton';
import OutageButton from './OutageButton';
import BillingButton from './BillingButton';
import OfferButton from './OfferButton';
import { Button } from 'react-native-elements';
import { Provider, connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between'
  },
  buttons: {
    marginBottom: 12
  },
  textTitle: {
      fontSize: 32,
      color: 'black'
    },
});

const MainScreen =  ({ dispatch, ContactInfo }) => (
  <View style={styles.container} >
  <View style={styles.display}>
  <View style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image
          source={require('../../Telstra.png')}
          style={styles.image}>
      </Image>
      <Text style={styles.textTitle}>Hello {(ContactInfo.ContactInfo) ? ContactInfo.ContactInfo.Name : " "}</Text>
  </View>
  </View>
  <RoamingButton style={styles.buttons}/>
  <BillingButton style={styles.buttons}/>
  <OutageButton style={styles.buttons}/>
  <OfferButton style={styles.buttons}/>
  <AboutButton style={styles.buttons}/>
  <View style={styles.display}>
  <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 22
    }}>
  <Text>© Copyright 2017</Text>
  <Text>Telstra and Salesforce</Text>
  <Text>POC Version 1.3.9</Text>
  </View></View>
  </View>
);

MainScreen.navigationOptions = {
  title: 'Telstra',
};

const mapStateToProps = state => {
  return {
    ContactInfo: state.ContactInfo
  };
};

const mapDispatchToProps = dispatch => ({
  // onNavigateToService: () => {
  //   dispatch(NavigationActions.navigate({ routeName: "Service" }));
  // },
  //service: () => dispatch(NavigationActions.navigate({ routeName: "Service" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);


//export default MainScreen;
