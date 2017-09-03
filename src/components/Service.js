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

const Service = () => (
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
    <Text>Service!!!</Text>
    <FlatList
  data={[{key: 'a'}, {key: 'b'}]}
  renderItem={({item}) => <Text>{item.key}</Text>}
/>
    <Button
    raised
    backgroundColor="#397af8"
    style={{marginBottom: 8}}
    title='Related help and support' />
  <Text>Copyright 2017</Text>
  <Text>Telstra and Salesforce POC</Text>
  </View></View>
  </View>

);

Service.navigationOptions = {
  title: 'Service',
};

export default Service;
