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

import { StackNavigator,  NavigationActions} from "react-navigation";
import { oauth, net } from "react-native-force";
//import Route from './src/Route';
// import PageOne from './components/PageOne';
// import PageTwo from './components/PageTwo';
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import SideMenu from "react-native-simple-drawer";
import AppReducer from "./src/reducers";
import AppWithNavigationState from "./src/navigators/AppNavigator";
//import SideMenu from './src/components/SideMenuDraw';
//import Drawer from 'react-native-drawer';
import SplashScreen from "react-native-splash-screen";
import Firebase from "./src/firebase";
//import SideBar from "./src/components/MainScreen";
import Hamburger from "react-native-hamburger";

import LoginStatusMessage from "./src/components/LoginStatusMessage";
import AuthButton from "./src/components/AuthButton";
import AboutButton from "./src/components/AboutButton";
import RoamingButton from "./src/components/RoamingButton";
import OutageButton from "./src/components/OutageButton";
import BillingButton from "./src/components/BillingButton";
import { Button } from "react-native-elements";
import AppStateListener from "react-native-appstate-listener";
//import { NavigationActions } from 'react-navigation';
import store from './src/store';

const promisify = fn => (...args) => new Promise((resolve, reject) => fn(...args, resolve, reject));

console.log(store);
debugger;

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
  }


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
    this.setState({currentUserCred: cred});
    debugger;
    console.log(AppState);
    const url = Linking.getInitialURL().then(url => {
      debugger;
      if (url) {
        const route = url.replace(/.*?:\/\//g, "");
        //console.log(route);
        //alert(route);
        //this._navigator.replace(this.state.routes[route]);
      }
    });

    // Firebase.initialise();
    // Firebase.messaging.subscribeToTopic('foobar');
    Firebase.messaging().subscribeToTopic("Outage");
    // Firebase.messaging().setBadgeNumber(3);
    //    Firebase.on('notification', (notif) => {
    //     console.log(notif)  //{ Item: 'cool', Another: 'cooler' }
    //   })
    Firebase.messaging()
      .getInitialNotification()
      .then(notification => {
        console.log("Notification which opened the app: ", notification);
        if (notification.collapse_key) {
        //   dispatch(NavigationActions.navigate({ routeName: 'Outage' }));
        //debugger;
            this.props.onNavigateToOutage();
          //this.setState({ nav: "Outage" });
          //navigation.dispatch({ type: 'Outage' });

        }
      });

      //console.log(oauth.getAuthCredentials);
      net.query("Select firstname,lastname,Mailingpostalcode from contact where Related_User_Customer__c =" + this.state.currentUserCred.userId, response =>
        that.setState({ data: response.records })
        );
        console.log(this.state.data);
  }

  fetchData() {
    console.log(oauth.getAuthCredentials);

    // var that = this;
    // net.query("SELECT Id, Name FROM User LIMIT 10", response =>
    //   that.setState({ data: response.records })
    // );
    // let id;
    // var that = this;
    // net.query("Select firstname,lastname,Mailingpostalcode from contact where Related_User_Customer__c =" + this.state.currentUserCred.userId, response =>
    //   that.setState({ data: response.records })
    // );

  }
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  render() {
    onHamburger = () => {
      //this.setState({active: !this.state.active});
      // if(this.state.active)
      //   this.refs.menu.close();
      // else
      this.setState({ active: false });
      this.refs.menu.open();
      // this._drawer.open();
    };
    const menu = (
      //         <View style={styles.container}>
      //   <FlatList
      //     data={this.state.data}
      //     renderItem={({item}) => <Text style={styles.item}>{item.Name}</Text>}
      //     keyExtractor={(item, index) => index}
      //   />
      // </View>

      <View style={styles.container}>
        <View style={styles.display}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={require("./Telstra.png")} style={styles.image} />
          </View>
        </View>
        <RoamingButton style={styles.buttons} />
        <OutageButton style={styles.buttons} />
        <BillingButton style={styles.buttons} />
        <AboutButton style={styles.buttons} />
        <View style={styles.display}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 22
            }}
          >
            <Text>© Copyright 2017</Text>
            <Text>Telstra and Salesforce</Text>
            <Text>POC Version 3.3</Text>
          </View>
        </View>
      </View>
    );
    return (
      // <View style={styles.container}>
      //   <FlatList
      //     data={this.state.data}
      //     renderItem={({item}) => <Text style={styles.item}>{item.Name}</Text>}
      //     keyExtractor={(item, index) => index}
      //   />
      // </View>

    
        <SideMenu ref="menu" menu={menu}>
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

// export const App = UserListScreen;

const mapStateToProps = state => ({
  //isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  onNavigateToOutage: () => {
      debugger;
      dispatch(NavigationActions.navigate({ routeName: "Outage" }))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListScreen);
