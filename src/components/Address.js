import React from 'react';
import { StyleSheet, View, Image, Text, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
//import RelatedHelpButton from './RelatedHelpButton.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
});

const About = () => (
  <View style={styles.container} >
    <View><Text>Your billing address:
@address from SF
Use a different address for delivery.</Text></View>
<Button
    raised
    backgroundColor="#397af8"
    style={{marginBottom: 8}}
    title='Confirm' /> 
  </View>

);

About.navigationOptions = {
  title: 'Service status',
};

export default About;
