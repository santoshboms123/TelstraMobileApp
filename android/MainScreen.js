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
    flexDirection: 'column',
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
  </View>
  </View>
  <RoamingButton style={{marginBottom: 8}}/>
  <OutageButton style={{marginBottom: 8}}/>
  <BillingButton style={{marginBottom: 8}}/>
  <AboutButton style={{marginBottom: 8}}/>
  <View style={styles.display}>
  <View style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
  <Text>Copyright 2017</Text>
  <Text>Telstra and Salesforce POC</Text>
  </View></View>
  </View>
);

MainScreen.navigationOptions = {
  title: 'Telstra',
};

export default MainScreen;
