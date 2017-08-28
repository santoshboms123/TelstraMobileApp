import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    padding: 8
  },
  textTitle: {
    fontSize: 32,
    color: 'black'
  },
  bodyTitle: {
    fontSize: 20,
    color: 'black'
  }
});

const Roaming = () => (
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
      alignItems: 'center'
    }}>
   <Text style={styles.textTitle}>International Day Pass</Text>
  </View>
  </View>
  <View>
    <Text style={styles.bodyTitle}>Your Current status of International Daily Pass Disabled</Text>
    <Text style={styles.bodyTitle}>New Zealand $5</Text>
    <Text style={styles.bodyTitle}>Other Country</Text>
    <Button
    raised
    backgroundColor="#397af8"
    style={{marginBottom: 8}}
    title='Activate International Day Pass' />

    <Text style={styles.textTitle}>International Roaming</Text>
    <Text style={styles.bodyTitle}>Your Current status of International Roaming is Enabled</Text>
    <Button
    raised
    backgroundColor="#397af8"
    style={{marginBottom: 8}}
    title='Deactivate International Day Pass' />

  </View>
  <Button
    raised
    backgroundColor="#397af8"
    style={{marginBottom: 8}}
    title='Data Usage' />
  </View>

);

Roaming.navigationOptions = {
  title: 'Travel Pass',
};

export default Roaming;
