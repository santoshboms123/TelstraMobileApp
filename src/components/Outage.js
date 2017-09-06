import React from "react";
import { StyleSheet, View, Image, Text, Picker } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import { Provider, connect } from "react-redux";
import { StackNavigator, NavigationActions } from "react-navigation";

const promisify = fn => (...args) =>
  new Promise((resolve, reject) => fn(...args, resolve, reject));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center"
  },
  display: {
    backgroundColor: "white"
  },
  title: {
    backgroundColor: "grey"
  },
  textText: {
    color: "black"
  },
  textRed: {
    color: "red"
  }
});
// this is a new comment
const Outage = ({ ContactInfo, service, props }) => {
  debugger;
  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <View>
          <Text>Service Status</Text>
          <View style={styles.title}>
            <Text>
              Services:{" "}
              {ContactInfo.ContactInfo ? (
                ContactInfo.ContactInfo.Id
              ) : (
                "0003433302"
              )}
            </Text>
            <Text style={styles.textText}>
              Account:{" "}
              {ContactInfo.ContactInfo ? ContactInfo.ContactInfo.Name : " "}
            </Text>
          </View>
          <Text style={styles.textText}>Service: Home broadband</Text>
          <Text style={styles.textText}>
            Status: <Text style={styles.textRed}>Interrupted</Text>
          </Text>
          <Text style={styles.textText}>Restoring: ASAP</Text>
          <Text style={styles.textText}>
            Hi {ContactInfo.ContactInfo ? ContactInfo.ContactInfo.Name : " "} As
            your service is currently interrupted we have added free extra data
            to your account so you can use this mobile to connect your home
            devices to the internet.
          </Text>
        </View>
        <Button
          raised
          backgroundColor="#397af8"
          style={{ marginBottom: 8 }}
          onPress={service}
          title="Related help and support"
        />
      </View>
    </View>
  );
};

Outage.navigationOptions = {
  title: "Outage"
};

const mapStateToProps = state => {
  return {
    ContactInfo: state.ContactInfo
  };
};

const mapDispatchToProps = dispatch => ({
  // onNavigateToService: () => {
  //   dispatch(NavigationActions.navigate({ routeName: "Service" }));
  // },
  service: () => dispatch(NavigationActions.navigate({ routeName: "Service" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Outage);
