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
});

const Outage = () => (
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
    <Text>Service Status</Text>
    <Text>Services:</Text>
    <Text>Account:</Text>
  <Text>Service:</Text>
  <Text>Status:</Text>
  <Text>Restoring:</Text>
  <Text>Hi @Name
As your service is currently interrupted we have added free extra data to your account so you can use this mobile to connect your home devices to the internet.
 </Text>
 </View></View>
 <Button
    raised
    backgroundColor="#397af8"
    style={{marginBottom: 8}}
    title='Related help and support' />
  </View>

);

Outage.navigationOptions = {
  title: 'Outage',
};

export default Outage;
