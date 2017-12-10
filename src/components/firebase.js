import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDiHxD6_fa-Ra5bAR6wGBAh7QZ0CDI7yq8",
    authDomain: "learn2lead-f1c18.firebaseapp.com",
    databaseURL: "https://learn2lead-f1c18.firebaseio.com",
    projectId: "learn2lead-f1c18",
    storageBucket: "learn2lead-f1c18.appspot.com",
    messagingSenderId: "1035414128718"
  };
  firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
export default firebase;