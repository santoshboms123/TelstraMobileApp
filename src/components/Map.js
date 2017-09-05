import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Image, Text, Linking } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import MapView from "react-native-maps";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column"
  }
});
// const url = 'https://www.google.com.au/maps/@-33.856169,151.2044273,14z';
// Linking.openURL(url);
class Map extends Component {
  render() {
    return (
      <MapView
        style={{ width: (width - 20) / 2, height: (width - 20) / 2 }}
        initialRegion={{
          latitude: -33.865143,
          longitude: -33.865143,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        region={{
          latitude: -33.865143,
          longitude: -33.865143,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onPress={this.onNavigate}
      >
        <MapView.Marker coordinate={{ 
          latitude: -33.865143,
          longitude: -33.865143, }} />
      </MapView>
    );
  }
}

Map.navigationOptions = {
  title: "Map"
};

export default Map;
