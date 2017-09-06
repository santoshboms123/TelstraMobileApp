import React, { Component } from "react";
import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
//import RelatedHelpButton from './RelatedHelpButton.js'
import { oauth, net } from "react-native-force";
import { Provider, connect } from "react-redux";

const promisify = fn => (...args) =>
  new Promise((resolve, reject) => fn(...args, resolve, reject));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column"
  },
  textTitle: {
      fontSize: 32,
      color: 'black'
    },
});

// async function handleService() {
//   let cEffectedExt =
//   "select Id, Title,subtitle__c, Text__c, UrlName, How_to_Video__c from faq__kav WHERE PublishStatus='online' AND language='en_US'";
//   return await new Promise(resolve =>
//     net.query(cEffectedExt, response => resolve(response.records))
//   );
// }

async function handleService() {
  let cEffectedExt =
   "select Id, Title,subtitle__c, Text__c, UrlName, How_to_Video__c from faq__kav WHERE PublishStatus='online' AND language='en_US'";
  return new Promise(resolve =>
    net.query(cEffectedExt, response => {
      console.log(response);
      debugger;
      resolve(response.records);
     // this.setState({ response: cEffectedExt});
    })
  );
}
// let k = handleService();
// console.log(k);



class Service extends Component {
  constructor(props) {
    super(props);
   // this.onMapPress = this.onMapPress.bind(this);
  }
  async componentDidMount() {
  //  let k = await handleService();
    
    //alert(k);
    
    //console.log(cred);
   // const servicess = await handleService();
    //this.setState({ ContactInfo: servicess[0] });
  // this.setState({ ServiceInfo: servicess });
  }
//const Service = () => {
  debugger;
   //showHelp = "";//handleService();
   render() {
    return (<View style={styles.container}>
      <View style={styles.display}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={styles.textTitle}>Please find help information below for your {DeviceInfo.getBrand()} device.</Text>
           <View><Text>{this.props.ContactInfo.ContactInfo.serviceInfo[0].Title}
                    {/* {
                      
                      this.props.ContactInfo.ContactInfo.serviceInfo.map((y) => {
                        debugger;
                            return (<Text>{y.Title}</Text>);
                        })
                    } */}
                    </Text></View> 
                <View><Text>{this.props.ContactInfo.ContactInfo.serviceInfo[1].Title}</Text></View> 
                <View><Text>{this.props.ContactInfo.ContactInfo.serviceInfo[2].Title}</Text></View> 
                <View><Text>{this.props.ContactInfo.ContactInfo.serviceInfo[3].Title}</Text></View> 
        </View>
      </View>
      <View style={styles.display}>
        <View />
      </View>
    </View>
  );
}}
Service.navigationOptions = {
  title: "Service"
};

Service.propTypes = {
  //provider: MapView.ProviderPropType,
};
const mapStateToProps = state => {
  debugger;
  return {
    ContactInfo: state.ContactInfo,
    ServiceInfo: state.ServiceInfo
  };
};

const mapDispatchToProps = dispatch => ({
   //map: () => dispatch(NavigationActions.navigate({ routeName: "Map" })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Service);



//export default Service;
