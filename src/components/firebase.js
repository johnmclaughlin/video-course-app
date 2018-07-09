import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBlBjWjqV_WFWL3i9xqKknVLk4qoHXQA9c',
  authDomain: 'video-course-app.firebaseapp.com',
  databaseURL: 'https://video-course-app.firebaseio.com',
  projectId: 'video-course-app',
  storageBucket: 'video-course-app.appspot.com',
  messagingSenderId: '839896101241',
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
