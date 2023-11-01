import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app as firebaseApp } from '../../firebase'; // Import the initialized Firebase app
import AddUserToDB from '../../COMPONENTS/AddUserToDatabase';
import { COLORS } from '../../CONSTANTS/theme'


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('RecipeBook');  // Navigate to Home screen
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount
  }, [navigation]);

  const handleSignUp = () => {
    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        AddUserToDB(auth.currentUser.email);
        const user = userCredential.user;
        // Set user token in AsyncStorage
        AsyncStorage.setItem('userToken', 'user_token_here')
          .then(() => {
            navigation.navigate('Recipe Book');
          })
          .catch((error) => {
            console.log('Error setting user token:', error);
          });
      })
      .catch((error) => {
        console.log('Error signing up:', error);
        // Handle error as needed
      });
  };

  const handleLogin = () => {
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Set user token in AsyncStorage
        AsyncStorage.setItem('userToken', 'user_token_here')
          .then(() => {
            navigation.navigate('Recipe Book');
          })
          .catch((error) => {
            console.log('Error setting user token:', error);
          });
      })
      .catch((error) => {
        console.log('Error signing in:', error);
        // Handle error as needed
      });
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Signed Out")
    }).catch((error) => {
      // An error happened.
    });
  }

 

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View>
        <Image source={require('../../ASSETS/pantrypal.png')}
               style={{width: 325, height: 200}}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignOut}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Logout</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: COLORS.brightGreen,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: COLORS.brightGreen,
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: COLORS.brightGreen,
    fontWeight: '700',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
})