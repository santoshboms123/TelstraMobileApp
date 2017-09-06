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
    justifyContent: 'center',
  },
  display: {
    backgroundColor: "white"
  },
  title: {
    backgroundColor: "grey",
  },
  textTitle: {
      fontSize: 32,
      color: 'black'
    },
});
// this is a new comment
const Offer = ({ ContactInfo, service, props, map }) => {
  debugger;
  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <View>
          <Text style={styles.textTitle}>Offer</Text>
          <Text>
            Upgrade your modem for free Hi {(ContactInfo.ContactInfo) ? ContactInfo.ContactInfo.Name : " "} To avoid being affected
            by network outages again, we are offering you an upgrade to the
            Telstra Gateway Frontier for free. With hybrid technology, the
            all-in one modem combines the power of Telstra’s home and mobile
            networks for a more reliable connection. If the broadband network
            experiences and outage the modem will automatically switch to our 4G
            network.
          </Text>
        </View>
        <Button
          raised
          backgroundColor="#397af8"
          style={{ marginBottom: 8 }}
          onPress={map}
          title="Collect from a nearby store"
        />
      </View>
    </View>
  );
};

Offer.navigationOptions = {
  title: "Offer"
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
  map: () => dispatch(NavigationActions.navigate({ routeName: "Map" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
