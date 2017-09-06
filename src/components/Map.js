import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Image, Text,
  TouchableOpacity,BackHandler,PermissionsAndroid } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import MapView from "react-native-maps";
import { Provider, connect } from "react-redux";
import flagPinkImg from '../assets/flag-pink.png';
import mapper from '../assets/map.png';


const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
const SPACE = 0.01;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      alert("Ok Granted")
    } else {
      alert("Denied")
    }
  } catch (err) {
    console.warn(err)
  }
}
class Map extends Component {
  constructor(props) {
    super(props);
    this.onMapPress = this.onMapPress.bind(this);
  }

  componentDidMount() {
    //requestCameraPermission();
    navigator.geolocation.getCurrentPosition(
          (position) => {
              this.setState({
                  region: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      latitudeDelta: 0.0462,
                      longitudeDelta: 0.0261,
                  },
              });
          },
          (error) => alert(JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
}

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
        },
      ],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.props.region}
          onPress={this.onMapPress}
        >
        </MapView>
        {/* <Image source={require(mapper)} style={styles.image} /> */}
      </View>
    );
  }
}

Map.navigationOptions = {
  title: "Map"
};

Map.propTypes = {
  provider: MapView.ProviderPropType,
};
// const mapStateToProps = state => {
//   debugger;
//   return {
//     ContactInfo: state.ContactInfo
//   };
// };

// const mapDispatchToProps = dispatch => ({
//    //map: () => dispatch(NavigationActions.navigate({ routeName: "Map" })),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Map);

//export default Map;

module.exports = Map;
