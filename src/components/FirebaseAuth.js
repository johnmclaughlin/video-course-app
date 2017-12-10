import React from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

// // Configure Firebase.
// const config = {
//     apiKey: "AIzaSyDiHxD6_fa-Ra5bAR6wGBAh7QZ0CDI7yq8",
//     authDomain: "learn2lead-f1c18.firebaseapp.com",
//     databaseURL: "https://learn2lead-f1c18.firebaseio.com",
//     projectId: "learn2lead-f1c18",
//     storageBucket: "learn2lead-f1c18.appspot.com",
//     messagingSenderId: "1035414128718"
// };
// firebase.initializeApp(config);
// export const provider = new firebase.auth.GoogleAuthProvider();
// export const auth = firebase.auth();

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Sets the `signedIn` state property to `true` once signed in.
  callbacks: {
    signInSuccess: () => {
      this.setState({signedIn: true});
      return false; // Avoid redirects after sign-in.
    }
  }
};

class SignInScreen extends React.Component {
  render() {
    return (
      <div>
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}

export default SignInScreen;