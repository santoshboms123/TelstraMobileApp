import React from "react";
import { StyleSheet, View, Image, Text, Picker, Dimensions, TouchableOpacity } from "react-native";
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
      fontSize: 32
    },
    padder: {
      paddingBottom: 8
    }
});
// this is a new comment
const Map2 = ({ ContactInfo, service, props, map3 }) => {
  debugger;
  let w = Dimensions.get('window').width;
  let h = Dimensions.get('window').height;
  return (
    <View >
      <TouchableOpacity  onPress={map3}>
    <Image onPress={map3} style={{width: w, height: h-10}} resizeMode="contain" source={require("../assets/map2.png")} />
    </TouchableOpacity>
  </View>
  );
};

Map2.navigationOptions = {
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
  map3: () => dispatch(NavigationActions.navigate({ routeName: "Map3" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map2);
