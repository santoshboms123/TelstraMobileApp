import React, { Component } from "react";
import { StyleSheet, View, Image, Text, FlatList, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
//import RelatedHelpButton from './RelatedHelpButton.js'
import { oauth, net } from "react-native-force";
import { Provider, connect } from "react-redux";
import Hr from "react-native-hr";

const promisify = fn => (...args) =>
  new Promise((resolve, reject) => fn(...args, resolve, reject));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    alignSelf: 'stretch',
    padding: 8
  },
  textTitle: {
      fontSize: 32,
      color: 'black',
      alignSelf: 'stretch',
      padding: 8
    },
    textTitle2: {
      fontSize: 22,
      color: 'grey',
      alignSelf: 'stretch',
      padding: 8
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
   //w = Dimensions.get('window').width;
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
        <View style={styles.avatarContainer}>
        <Image source={require("../../Telstra.png")} style={styles.image} />
      </View>
          <Text style={styles.textTitle}>Please find help information below for your {DeviceInfo.getBrand()} device.</Text>
           <View>
             <Text style={{width: Dimensions.get('window').width}} >INFORMATION</Text>
             <Text style={styles.textTitle2}>{this.props.ContactInfo.ContactInfo.serviceInfo[0].Title}</Text>
             <Hr lineColor="#b3b3b3" textColor="steelblue" />
             <Text style={styles.textTitle2}>{this.props.ContactInfo.ContactInfo.serviceInfo[0].subtitle__c}</Text>
             <Hr lineColor="#b3b3b3" textColor="steelblue" />
             <Text style={styles.textTitle2}>{this.props.ContactInfo.ContactInfo.serviceInfo[0].Text__c}</Text>
             <Hr lineColor="#b3b3b3" textColor="steelblue" />
             <Text style={styles.textTitle2}>{this.props.ContactInfo.ContactInfo.serviceInfo[0].UrlName}</Text>
             <Hr lineColor="#b3b3b3" textColor="steelblue" />
             {/* <Text style={styles.textTitle2}>{this.props.ContactInfo.ContactInfo.serviceInfo[0].How_to_Video__c}</Text> */}
                    {/* {
                      
                      this.props.ContactInfo.ContactInfo.serviceInfo.map((y) => {
                        debugger;
                            return (<View><Text>{y.Title}</Text><Text>{y.Text__c}</Text></View>);
                        })
                    } */}
                    </View> 
                {/* <View><Text>{this.props.ContactInfo.ContactInfo.serviceInfo[1].Title}</Text></View> 
                <View><Text>{this.props.ContactInfo.ContactInfo.serviceInfo[2].Title}</Text></View> 
                <View><Text>{this.props.ContactInfo.ContactInfo.serviceInfo[3].Title}</Text></View>  */}
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
