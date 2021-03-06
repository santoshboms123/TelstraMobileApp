/*
 * Copyright (c) 2017-present, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
  AppState
} from "react-native";

import { StackNavigator, NavigationActions } from "react-navigation";
import { oauth, net } from "react-native-force";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import SideMenu from "react-native-simple-drawer";
import AppReducer from "./src/reducers";
import AppWithNavigationState from "./src/navigators/AppNavigator";
import SideBar from "./src/components/SideBar";
import SplashScreen from "react-native-splash-screen";
import Firebase from "./src/firebase";
import Hamburger from "react-native-hamburger";
import LoginStatusMessage from "./src/components/LoginStatusMessage";
import AuthButton from "./src/components/AuthButton";
import AboutButton from "./src/components/AboutButton";
import RoamingButton from "./src/components/RoamingButton";
import OutageButton from "./src/components/OutageButton";
import BillingButton from "./src/components/BillingButton";
// import Map from './src/components/Map';
import { Button } from "react-native-elements";
import AppStateListener from "react-native-appstate-listener";
import store from "./src/store";

const promisify = fn => (...args) =>
  new Promise((resolve, reject) => fn(...args, resolve, reject));

const { func } = PropTypes;

function handleActive() {
  console.log("The application is now active!");
}

function handleBackground() {
  console.log("The application is now in the background!");
}

function handleInactive() {
  console.log("The application is now inactive!");
}

async function handleOutage(contactId) {
    let cEffectedExt = "Select id,name,mobilephone,nbn_node__c,Telstra_Service__c,(select id,name,nbn_Service_Number__c,Telstra_Service_Number__c from services__r) from Contact where Related_User_Customer__c = '"+contactId+"'";
    return await new Promise(resolve => net.query(cEffectedExt, response => resolve(response.records)));
}  

async function handleDetails(contactId) { 
    let cInfo =
      "Select id,name,mobilephone,Telstra_Service__c,(select id,name,nbn_Service_Number__c,Telstra_Service_Number__c from services__r) from Contact where Related_User_Customer__c ='" +
      contactId +
      "'";
      return await new Promise(resolve => net.query(cInfo, response => resolve(response.records)));
}

async function handleService() {
  let cEffectedExt =
  "select Id, Title,subtitle__c, Text__c, UrlName, How_to_Video__c from faq__kav WHERE PublishStatus='online' AND language='en_US'";
  return await new Promise(resolve =>
    net.query(cEffectedExt, response => resolve(response.records))
  );
}

let contactId = null;

class UserListScreen extends React.Component {
  static propTypes = {
    onNavigateToOutage: func.isRequired
  };

  store = createStore(AppReducer);

  static navigationOptions = {
    header: { visible: false }
  };

  constructor(props) {
    super(props);
    this.state = { data: [], active: false, startPage: "Main" };
  }

  async componentDidMount() {
    debugger;
    Firebase.messaging().onMessage(notification => {
      debugger;
     // console.log(notification);    
      if (notification.priority === "Outage") {
        //alert("Outage Notification is been identified");
        this.props.onNavigateToOutage();
      } 
      if (notification.priority === "Restored") {
        //alert("Outage Notification is been identified");
        this.props.onNavigateToOffer();
      } 
    });
    Firebase.messaging()
    .getInitialNotification()
    .then(notification => {
      debugger;
      console.log("Notification which opened the app: ", notification);
      if (notification.from === `/topics/${contactId}`) {
        //alert("Outage Notification is been identified");
        this.props.onNavigateToOffer();
      } 
      if (notification.from === "/topics/3000") {
        //alert("Outage Notification is been identified");
        this.props.onNavigateToOutage();
      } 
      // else if (notification.from === `/topics/${contactId}`) {
      //   alert("Service has been restored");
      //   this.props.onNavigateToOutage();
      // } else {
        //this.props.onNavigateToAbout();
        //getActionForPathAndParams('Main');
        //this.props.onNavigateToOutage(); 
     // }
      // alert(notification.from);
      // if (notification.collapse_key) {
      // }
    });  
    var that = this;
    oauth.getAuthCredentials(
      () => that.fetchData(), // already logged in
      () => {
        oauth.authenticate(
          () => that.fetchData(),
          error => console.log("Failed to authenticate:" + error)
        );
      }
    );
    const cred = await promisify(oauth.getAuthCredentials)();
    //console.log(cred);
    this.setState({ currentUserCred: cred });
    // console.log(AppState);
    // const url = Linking.getInitialURL().then(url => {
    //   if (url) {
    //     const route = url.replace(/.*?:\/\//g, "");
    //   }
    // });
    debugger;
    const contactInfo = await handleOutage(this.state.currentUserCred.userId);
    //const outageInfo =  await handleOutage(this.state.currentUserCred.userId);
    const serviceInfo = await handleService();
    // add cred to obj
    contactInfo[0].currentUserCred = this.state.currentUserCred;
    contactInfo[0].serviceInfo = serviceInfo;
    debugger;
    contactId = contactInfo[0].Id;
    this.setState({ ContactInfo: contactInfo[0] });
    this.props.onOutage(contactInfo[0]);
    // Firebase.messaging().subscribeToTopic((contactInfo)?contactInfo[0].Id:"3000");
    debugger;
    Firebase.messaging().subscribeToTopic(contactId);
    Firebase.messaging().subscribeToTopic("3000");
    Firebase.messaging().subscribeToTopic("Restored");
    //alert("topic set is = " + contactInfo[0].MailingPostalCode);
 //   Firebase.messaging().subscribeToTopic(contactInfo[0].Id);
    //alert("topic set is = " + contactInfo[0].Id);
    SplashScreen.hide();

    //this.setState({v:'vak'}, setExtendedData = () => {this.state.v})
  }
  fetchData() {

  }
  closeControlPanel = onItemSelected => {
    this.refs.menu.close();
    switch (onItemSelected) {
      case "Outage":
        this.props.onNavigateToOutage();
        break;
      case "Roaming":
        this.props.onNavigateToRoaming();
        break;
      case "About":
        this.props.onNavigateToAbout();
        break;
      case "Billing":
        this.props.onNavigateToBilling();
        break;
      case "Offer":
        this.props.onNavigateToOffer();
        break;
      case "Address":
        this.props.onNavigateToAddress();
        break;
      case "Main":
        this.props.onNavigateToMain();
        break
    }
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item
    });

  render(ContactInfo) {
    onHamburger = () => {
      this.setState({ active: false });
      this.refs.menu.open();
    };
    closeControlPanel = () => {
      this.refs.menu.close();
    };
    const menu = <SideBar onItemSelected={this.closeControlPanel} />;

    return (
      <SideMenu
        ref="menu"
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => false}
      >
        <View
          style={{
            justifyContent: "flex-end",
            backgroundColor: "white",
            borderBottomWidth: 1
          }}
        >
          <TouchableOpacity onPress={onHamburger}>
            {/* <Hamburger type="spinArrow" active={false} onPress={onHamburger}/> */}
            <Image active={false} source={require("./Hamburger.png")} />
          </TouchableOpacity>
        </View>
        <AppWithNavigationState />
        <AppStateListener
          onActive={handleActive}
          onBackground={handleBackground}
          onInactive={handleInactive}
        />
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "white",
    justifyContent: "space-between"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

const mapStateToProps = state => ({
  ContactInfo: state.ContactInfo.ContactInfo,
});

const mapDispatchToProps = dispatch => ({
  onNavigateToOutage: () => {
    dispatch(NavigationActions.navigate({ routeName: "Outage" }));
  },
  onNavigateToRoaming: () => {
    dispatch(NavigationActions.navigate({ routeName: "Roaming" }));
  },
  onNavigateToAbout: () => {
    dispatch(NavigationActions.navigate({ routeName: "About" }));
  },
  onNavigateToBilling: () => {
    dispatch(NavigationActions.navigate({ routeName: "Billing" }));
  },
  onNavigateToOffer: () => {
    dispatch(NavigationActions.navigate({ routeName: "Offer" }));
  },
  onNavigateToAddress: () => {
    dispatch(NavigationActions.navigate({ routeName: "Address" }));
  },
  onNavigateToMain: () => {
    dispatch(NavigationActions.navigate({ routeName: "Main" }));
  },
  onOutage: (ContactInfo) => {
    dispatch({ type: 'ContactInfo', ContactInfo });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListScreen);
