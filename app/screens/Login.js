import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app as firebaseApp } from '../../firebase'; // Import the initialized Firebase app
import AddUserToDB from '../../COMPONENTS/AddUserToDatabase';
import { COLORS } from '../../CONSTANTS/theme'
import { LoginStyles } from '../../STYLES/styles';
import LogoutButton from '../../COMPONENTS/LogoutButton.js'; // Import the LogoutButton component

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
            navigation.navigate('RecipeBook');
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
            navigation.navigate('RecipeBook');
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


  return (
    <KeyboardAvoidingView
      style={LoginStyles.container}
      behavior="padding"
    >
      <View>
        <Image source={require('../../ASSETS/pantrypal.png')}
               style={{width: 325, height: 200}}
        />
      </View>

      <View style={LoginStyles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={LoginStyles.input}
          placeholderTextColor={COLORS.fadedGreen}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={LoginStyles.input}
          secureTextEntry
          placeholderTextColor={COLORS.fadedGreen}
        />
      </View>

      <View style={LoginStyles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={LoginStyles.button}
        >
          <Text style={LoginStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[LoginStyles.button, LoginStyles.buttonOutline]}
        >
          <Text style={LoginStyles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        <LogoutButton />

      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen