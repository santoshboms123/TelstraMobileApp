import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import AboutButton from './AboutButton';
import RoamingButton from './RoamingButton';
import OutageButton from './OutageButton';
import BillingButton from './BillingButton';
import { Button } from 'react-native-elements';

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

const MainScreen =  ({ dispatch }) => (
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
      <Text style={styles.textTitle}>Welcome @username</Text>
  </View>
  </View>
  <RoamingButton style={styles.buttons}/>
  <OutageButton style={styles.buttons}/>
  <BillingButton style={styles.buttons}/>
  <AboutButton style={styles.buttons}/>
  <View style={styles.display}>
  <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 22
    }}>
  <Text>© Copyright 2017</Text>
  <Text>Telstra and Salesforce</Text>
  <Text>POC Version 3</Text>
  </View></View>
  </View>
);

MainScreen.navigationOptions = {
  title: 'Telstra',
};

export default MainScreen;
