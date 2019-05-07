import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJJxfbtR8930WbgDtSVrHjrAOhcqRWYEM",
    authDomain: "reactofficeapp.firebaseapp.com",
    databaseURL: "https://reactofficeapp.firebaseio.com",
    projectId: "reactofficeapp",
    storageBucket: "reactofficeapp.appspot.com",
    messagingSenderId: "873280999083"
  };
  firebase.initializeApp(config);

  export default firebase;
