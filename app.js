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
    console.log(cred);
    this.setState({ currentUserCred: cred });
    // console.log(AppState);
    // const url = Linking.getInitialURL().then(url => {
    //   if (url) {
    //     const route = url.replace(/.*?:\/\//g, "");
    //   }
    // });
    let contactInfo;
    if (this.state.currentUserCred && this.state.currentUserCred.userId) {
      let cInfo =
        "Select id, firstname, lastname, Mailingpostalcode from contact where Related_User_Customer__c ='" +
        this.state.currentUserCred.userId +
        "'";
      contactInfo = await new Promise(resolve =>
        net.query(cInfo, response => resolve(response.records))
      );
    }
    debugger;
    this.setState({ ContactInfo: contactInfo[0] });
    this.props.onOutage(contactInfo[0]);

    Firebase.messaging().subscribeToTopic((contactInfo)?contactInfo[0].MailingPostalCode:"3000");
    //alert("topic set is = " + contactInfo[0].MailingPostalCode);

    Firebase.messaging().subscribeToTopic(contactInfo[0].Id);
    //alert("topic set is = " + contactInfo[0].Id);

    // let itemsEffected;
    // if (this.state.currentUserCred && this.state.currentUserCred.userId) {
    //   let cEffected =
    //     "Select Name, Active__c, Affected_Area_Postcode__c, End_Time__c, Start_Time__c from Outage__c Where Active__c = true AND Affected_Area_Postcode__r.name = '" +
    //     this.state.ContactInfo.MailingPostalCode +
    //     "'";
    //   itemsEffected = await new Promise(resolve =>
    //     net.query(cEffected, response => resolve(response.records))
    //   );
    // }
    // this.setState({ ContactInfoEffected: itemsEffected[0] });

    // let itemsEffectedExtended;
    // if (this.state.currentUserCred && this.state.currentUserCred.userId) {
    //   let cEffectedExt =
    //     "Select Name, nbn_Service_Number__c, Telstra_Service_Number__c From Service__c where Subscriber__r.Related_User_Customer__c ='" +
    //     this.state.ContactInfo.Id +
    //     "'";
    //   itemsEffectedExtended = await new Promise(resolve =>
    //     net.query(cEffectedExt, response => resolve(response.records))
    //   );
    // }
    // this.setState({ ContactInfoEffectedExt: itemsEffectedExtended[0] });

    // Firebase.messaging().subscribeToTopic(
    //   this.state.ContactInfo.MailingPostalCode
    // );


    Firebase.messaging()
    .getInitialNotification()
    .then(notification => {
      console.log("Notification which opened the app: ", notification);
      if (notification.from === "/topics/" + contactInfo[0].MailingPostalCode) {
        alert("Outage Notification is been identified");
        this.props.onNavigateToOutage();
      } else if (notification.from === "/topics/" +contactInfo[0].Id) {
        alert("Service has been restored");
        this.props.onNavigateToOffer();
      }
      // alert(notification.from);
      // if (notification.collapse_key) {
      // }
    });

    SplashScreen.hide();

    //this.setState({v:'vak'}, setExtendedData = () => {this.state.v})
  }
  fetchData() {}
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
  onOutage: (ContactInfo) => {
    debugger;
    dispatch({ type: 'ContactInfo', ContactInfo });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListScreen);
