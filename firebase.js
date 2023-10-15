import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAjZ2EYVXdNVfRljDngZTdw0kzSP9qdzWY",
    authDomain: "pantry-pal-firebase-590ad.firebaseapp.com",
    projectId: "pantry-pal-firebase-590ad",
    storageBucket: "pantry-pal-firebase-590ad.appspot.com",
    messagingSenderId: "149620561014",
    appId: "1:149620561014:web:fe8f8079995b78680ffb57"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };