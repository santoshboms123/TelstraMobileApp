import React from "react";
import { StyleSheet, View, Image, Text, Picker } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import { Provider, connect } from "react-redux";
import { StackNavigator, NavigationActions } from "react-navigation";
import Hr from "react-native-hr";

const promisify = fn => (...args) =>
  new Promise((resolve, reject) => fn(...args, resolve, reject));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    padding: 8
  },
  display: {
    backgroundColor: "white",
  },
  title: {
    backgroundColor: "black",
  },
  textTitle: {
      fontSize: 32,
      color:'black'
    },
    textTitle2: {
      fontSize: 24,
      color:'black'
    },
    padder: {
      fontSize: 16,
      paddingBottom: 8,
      color:'grey'
    }
});
// this is a new comment
const Offer = ({ ContactInfo, service, props, map }) => {
  debugger;
  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <View>
          <Text style={styles.textTitle}>Offer</Text>
          <Hr lineColor="#b3b3b3" textColor="steelblue" />
          <View >
        <Image source={require("../assets/offer.png")}/>
      </View>
          <Hr lineColor="#b3b3b3" textColor="steelblue" />
          <View>
            <Text style={styles.textTitle2}>Upgrade your modem for free</Text> 
          </View>
          <View>
            <Text style={styles.padder}>Hi {(ContactInfo.ContactInfo) ? ContactInfo.ContactInfo.Name : " "} </Text>
          </View>
          <View>
          <Text style={styles.padder}>To avoid being affected
            by network outages again, we are offering you an upgrade to the
            Telstra Gateway Frontier for free. </Text>
          </View>
          <View>
            <Text style={styles.padder}>With hybrid technology, the
            all-in one modem combines the power of Telstra’s home and mobile
            networks for a more reliable connection.</Text> 
          </View>
          <View>
            <Text style={styles.padder}>If the broadband network
            experiences and outage the modem will automatically switch to our 4G
            network.</Text>
          </View>
        </View>
      </View>
      <Button
          raised
          backgroundColor="#397af8"
          style={{ marginBottom: 8 }}
          onPress={map}
          title="Collect from a nearby store"
        />
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
