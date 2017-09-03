import React from "react";
import { StyleSheet, View, Image, Text, Picker } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import { Provider, connect } from "react-redux";

import { StackNavigator, NavigationActions } from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: 'space-between'
  },
  display: {
    backgroundColor: "white",
    color: "black"
  },
  title: {
    backgroundColor: "grey", 
    color: "white" 
  }
});

const Outage = ({ ContactInfo, service }) => {
  console.log("----- -- " + ContactInfo);
  debugger;
  return (
    <View style={styles.container}>
      {/* <View style={styles.display}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image source={require("../../Telstra.png")} style={styles.image} />
        </View>
      </View> */}
      <View style={styles.display}>
        <View>
          <Text>Service Status</Text>
          <View style={styles.title}>
            <Text>Services: {(ContactInfo.ContactInfo)?ContactInfo.ContactInfo.Id:"0003433302"}</Text>
            <Text>Account: {(ContactInfo.ContactInfo)?ContactInfo.ContactInfo.FirstName:"Mr" + "Smith"}</Text>
            {/* <Text>Account: {(ContactInfo.ContactInfo)?ContactInfo.ContactInfo.FirstName:"Mr" + (ContactInfo.ContactInfo && ContactInfo.ContactInfo.FirstName)?ContactInfo.ContactInfo.LastName:"Smith"}</Text> */}
          </View>
          <Text>Service: Home broadband</Text>
          <Text>Status: Interrupted</Text>
          <Text>Restoring: ASAP</Text>
          <Text>
            Hi @Name As your service is currently interrupted we have added free
            extra data to your account so you can use this mobile to connect
            your home devices to the internet.
          </Text>
          {/* selectedValue={this.state.language}
  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})} */}
          <Picker>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
        </View>
      </View>
      <Button
        raised
        backgroundColor="#397af8"
        style={{ marginBottom: 8 }}
        onPress={service}
        title="Related help and support"
      />
    </View>
  ); 
};

Outage.navigationOptions = {
  title: "Outage"
};

const mapStateToProps = state => {
  debugger;
  return {
    ContactInfo: state.ContactInfo
  };
};

const mapDispatchToProps = dispatch => ({
  // onNavigateToService: () => {
  //   dispatch(NavigationActions.navigate({ routeName: "Service" }));
  // },
  service: () => dispatch(NavigationActions.navigate({ routeName: 'Service' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Outage);
