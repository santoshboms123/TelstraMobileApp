# TelstraMobileApp

## About
This is a project that is a proof of concept to display on how Salesforce works with Mobile in this case Android. This is Lab work only, if a situation is needed for production I would air on the side of caution until a cleanup, comments added, bug fixes done and unit tests are implemented.

git clone https://github.com/santoshboms123/TelstraMobileApp.git

npm install

react-native run-android

Please only run NPM and not Yarn.

![alt text](https://github.com/santoshboms123/TelstraMobileApp/blob/master/design.png)

Main dependencies are:

* react
* react-native 
* react-native-appstate-listener 
* react-native-device-info 
* react-native-elements 
* react-native-firebase, 
* react-native-force = https://github.com/forcedotcom/SalesforceMobileSDK-ReactNative.git#v5.2.0
* react-native-scalable-image 
* react-native-simple-drawer 
* react-navigation 
* react-redux 
* redux

#### Example of JSON Push ####

```javascript
{ 
 "to": "/topics/3000",  
 "notification" : {
 "body" : "Outage",
 "content_available" : true,
 "priority" : "Outage",
 "title" : "Outage"
 },
 "data" : {
 "body" : "Outage!",
 "content_available" : true,
 "priority" : "Outage",
 "title" : "Outage"
 }
}
```

Front screen example for Version 1.3.9
![alt text](https://github.com/santoshboms123/TelstraMobileApp/blob/master/FrontScreen.png)

#### Note: ####

Force SDK and React Native versions are fixed, please review package.js