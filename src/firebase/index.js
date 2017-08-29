// import * as firebase from "firebase";

// export default class Firebase {

//     /**
//      * Initialises Firebase
//      */
//     static initialise() {
//         firebase.initializeApp({
//             apiKey: "AIzaSyBbNLZpMMAYhUkKjLwuu7uOprgMqtu-xjo",
//             authDomain: "telstrasalesforce.firebaseapp.com",
//             databaseURL: "https://telstrasalesforce.firebaseio.com",
//             projectId: "telstrasalesforce",
//             storageBucket: "telstrasalesforce.appspot.com",
//             messagingSenderId: "801121151349"
//         });
//         console.log(firebase);
//     }

// }

import RNFirebase from 'react-native-firebase'

const configurationOptions = {
  debug: true,
}
const firebase = RNFirebase.initializeApp(configurationOptions)

export default firebase

//const firebased = Firebase.initialise();

//export default firebased;

//module.exports = Firebase;


// apiKey: "AIzaSyBbNLZpMMAYhUkKjLwuu7uOprgMqtu-xjo",
// authDomain: "telstrasalesforce.firebaseapp.com",
// databaseURL: "https://telstrasalesforce.firebaseio.com",
// projectId: "telstrasalesforce",
// storageBucket: "telstrasalesforce.appspot.com",
// messagingSenderId: "801121151349"