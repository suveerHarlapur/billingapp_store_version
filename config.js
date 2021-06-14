import firebase from 'firebase';
require("@firebase/firestore");

  var firebaseConfig = {
    apiKey: "AIzaSyA5M0_JNBii3gqMwsaX2lS8HYgBhBNJ8TM",
    authDomain: "dhukanwala-fbb48.firebaseapp.com",
    projectId: "dhukanwala-fbb48",
    storageBucket: "dhukanwala-fbb48.appspot.com",
    messagingSenderId: "504675742812",
    appId: "1:504675742812:web:6533afbbda590c2bda6299"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()