// firebaseUtils.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app as firebaseApp } from '../firebase'; 

export const handleFirebaseSignIn = async (email, password, successCallback, errorCallback) => {
  const auth = getAuth(firebaseApp);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    successCallback(userCredential);
  } catch (error) {
    console.log('Error signing in:', error);
    errorCallback(error);
  }
};
