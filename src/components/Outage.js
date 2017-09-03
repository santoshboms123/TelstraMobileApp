import React from "react";
import { StyleSheet, View, Image, Text, Picker } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import { Provider, connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column"
  }
});

const Outage = ({ ContactInfo }) => {
  console.log("----- -- " + ContactInfo);
  debugger;
  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image source={require("../../Telstra.png")} style={styles.image} />
        </View>
      </View>
      <View style={styles.display}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Service Status</Text>
          <View style={(backgroundColor = "grey")}>
            <Text>Services: {(ContactInfo.ContactInfo)?ContactInfo.ContactInfo.Id:"0003433302"}</Text>
            <Text>Account: {(ContactInfo.ContactInfo)?ContactInfo.ContactInfo.FirstName:"Mr" + "Smith"}</Text>
            {/* <Text>Account: {(ContactInfo.ContactInfo)?ContactInfo.ContactInfo.FirstName:"Mr" + (ContactInfo.ContactInfo && ContactInfo.ContactInfo.FirstName)?ContactInfo.ContactInfo.LastName:"Smith"}</Text> */}
          </View>
          <Text>Service:</Text>
          <Text>Status:</Text>
          <Text>Restoring:</Text>
          <Text>
            Hi @Name As your service is currently interrupted we have added free
            extra data to your account so you can use this mobile to connect
            your home devices to the internet.
          </Text>
          <Picker
  selectedValue={this.state.language}
  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
        </View>
      </View>
      <Button
        raised
        backgroundColor="#397af8"
        style={{ marginBottom: 8 }}
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Outage);
