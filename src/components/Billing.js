import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  textTitle: {
      fontSize: 32,
      color:'black'
    },
});

const Billing = () => (
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
  <View style={styles.display}>
  <View style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
  <Text style={styles.textTitle}>Billing TBA</Text>
  </View></View>
  </View>

);

Billing.navigationOptions = {
  title: 'Billing',
};

export default Billing;
