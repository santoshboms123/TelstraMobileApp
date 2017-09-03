import React from "react";
import { StyleSheet, View, Image, Text, Linking } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import MapView from "react-native-maps";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column"
  }
});
const url = `http://maps.apple.com/?daddr=${address}`;
Linking.openURL(url);
const Map = () => (
  <MapView
    style={{ width: (width - 20) / 2, height: (width - 20) / 2 }}
    initialRegion={region}
    region={region}
    onPress={this.onNavigate}
  >
    <MapView.Marker coordinate={{ latitude, longitude }} />
  </MapView>
);

Map.navigationOptions = {
  title: "Map"
};

export default Map;
