import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app };
export { auth };
