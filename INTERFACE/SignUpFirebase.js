// firebaseUtils.js
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { app as firebaseApp } from '../firebase'; 

export const handleFirebaseSignUp = async (email, password, successCallback, errorCallback) => {
  const auth = getAuth(firebaseApp);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    successCallback(userCredential);
  } catch (error) {
    console.log('Error signing up:', error);
    errorCallback(error);
  }
};
