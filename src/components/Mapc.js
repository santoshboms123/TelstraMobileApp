import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  
} from 'react-native';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -37.815018;
const LONGITUDE = 144.946014;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SAMPLE_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

class Map extends React.Component {
  render() {
      return(
        // <MapView
        //   style={styles.map}
        //   initialRegion={SAMPLE_REGION}
        // />
        <Image source={require("../assets/map.png")}/>)
    }
  }

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

module.exports = Map;