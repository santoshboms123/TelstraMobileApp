import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

const window = Dimensions.get("window");
const uri = "../../Telstra.png";
import AuthButton from "./AuthButton";
import AboutButton from "./AboutButton";
import RoamingButton from "./RoamingButton";
import OutageButton from "./OutageButton";
import BillingButton from "./BillingButton";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import Hr from "react-native-hr";

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "white",
    padding: 20
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
  },
  name: {
    position: "absolute",
    left: 70,
    top: 20
  },
  item: {
    fontSize: 22,
    fontWeight: "300",
    paddingTop: 5,
    marginBottom:8,
  }
});

function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        {/* <Image
          style={styles.avatar}
          source={{ uri }}
        /> */}
        <Image source={require("../../Telstra.png")} style={styles.image} />
        <Text style={styles.name}>Your name</Text>
      </View>
      <Text onPress={() => onItemSelected("Roaming")} style={styles.item}>
        Travel Pass
      </Text>
      <Text onPress={() => onItemSelected("Billing")} style={styles.item}>
        My bills
      </Text>
      <Text onPress={() => onItemSelected("About")} style={styles.item}>
        Service help and support
      </Text>
      <Hr lineColor="#b3b3b3" textColor="steelblue" />
      <View style={marginTop=23}>
        <View>
          <Text>© Copyright 2017</Text>
          <Text>Telstra and Salesforce</Text>
          <Text>POC Version 3.4</Text>
        </View>
      </View>
    </ScrollView>
  );
}
function g() {
  () => onItemSelected("Contacts");
  _gS = "Contacts";
}
Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  about: PropTypes.func.isRequired
};

// AboutButton.propTypes = {
//   about: PropTypes.func.isRequired,
// };

const mapStateToProps = state => ({
  //isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  about: () => dispatch(NavigationActions.navigate({ routeName: "About" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
