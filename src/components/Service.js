import React from "react";
import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
//import RelatedHelpButton from './RelatedHelpButton.js'
import { oauth, net } from "react-native-force";

const promisify = fn => (...args) =>
  new Promise((resolve, reject) => fn(...args, resolve, reject));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column"
  }
});

async function handleService() {
  let cEffectedExt =
    "select id, Title,subtitle__c, Text__c, UrlName, How_to_Video__c from faq__kav WHERE PublishStatus='online'";
  return await new Promise(resolve =>
    net.query(cEffectedExt, response => resolve(response.records))
  );
}

const Service = () => {
  debugger;
  const showHelp = handleService();
  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>{DeviceInfo.getBrand()}</Text>
          <Text>{showHelp}</Text>
        </View>
      </View>
      <View style={styles.display}>
        <View />
      </View>
    </View>
  );
};

Service.navigationOptions = {
  title: "Service"
};

export default Service;
