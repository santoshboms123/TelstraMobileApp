import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import { Provider, connect } from "react-redux";
import { StackNavigator, NavigationActions, addNavigationHelpers  } from "react-navigation";
import AppStateListener from "react-native-appstate-listener";
//import MapView from "react-native-maps";
import PropTypes from "prop-types";
// import Map from "./Map";
// import Address from "./Address";
//import RelatedHelpButton from './RelatedHelpButton.js'
const { func } = PropTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center"
  }
});

// constructor (props){
//   super(props);
// }

class Offer extends Component {
  static navigationOptions = {
    title: "Offer"
  };

  async componentDidMount() {

  }

  onPress = (r) => {
    debugger;
    switch (r) {
      case "Map":
        //this.props.onNavigateToMap();
        // const url = "https://www.google.com.au/maps/@-33.856169,151.2044273,14z";
        // Linking.openURL(url);
        this.props.navigation.navigate("Map");
        break;
      case "Address":
        //this.props.onNavigateToAddress();
        //dispatch(NavigationActions.navigate({ routeName: "Address" }))
       //NavigationActions.navigate({ routeName: "Address" });
        this.props.navigation.navigate("Address");
        break;
    }
  };

  render() {
    gotoMaps = () => {
      alert("Maps");
    }
    //const { ContactInfo, service, props, address, map, dispatch } = this.props;
    return (
      <View style={styles.container}>
            <Text>Offer</Text>
            <Text>
              Upgrade your modem for free Hi Customer name To avoid being affected
              by network outages again, we are offering you an upgrade to the
              Telstra Gateway Frontier for free. With hybrid technology, the
              all-in one modem combines the power of Telstra’s home and mobile
              networks for a more reliable connection. If the broadband network
              experiences and outage the modem will automatically switch to our 4G
              network.
            </Text>
        <Button
              raised
              backgroundColor="#397af8"
              style={{ marginBottom: 8 }}
              onPress={this.gotoMaps}
              title="Collect from a nearby store"
            />
      </View>
    );
  }
}


const mapStateToProps = state => {
  debugger;
  return {
    ContactInfo: state.ContactInfo
  };
};

const mapDispatchToProps = dispatch => ({
   map: () => dispatch(NavigationActions.navigate({ routeName: "Map" })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
