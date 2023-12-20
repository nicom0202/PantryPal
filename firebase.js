import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const authForGoogle = getAuth(app);   // Part of Google Sign-In
const db = getFirestore(app);
const storage = getStorage(app);

export { app };
export { auth };
export { authForGoogle };
export { db, getFirestore, collection, addDoc };
export { storage };

// IOS: 766684397920-j775npmsmd1gj0dnkmv5rgq3q2buemgp.apps.googleusercontent.com
// Android: 766684397920-u7cs8bettfqoj41c8npfpb8civ8cq7q5.apps.googleusercontent.com
// Web: 766684397920-4qbpfp9osp3jlnuupd50u1pacfctt90l.apps.googleusercontent.com
