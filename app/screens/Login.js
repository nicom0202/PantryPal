import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Part of Google Sign-In
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { authForGoogle } from '../../firebase';

import { getAuth } from 'firebase/auth';
import { app as firebaseApp } from '../../firebase'; // Import the initialized Firebase app
import AddUserToDB from '../../INTERFACE/AddUserToDatabase';
import { COLORS } from '../../STYLES/Theme'
import { ContainerStyle, TextStyle, ButtonStyle } from '../../STYLES/Styles';
import { handleFirebaseSignIn } from '../../INTERFACE/LoginFirebase';
import { handleFirebaseSignUp } from '../../INTERFACE/SignUpFirebase';

WebBrowser.maybeCompleteAuthSession();	// Listener for Google sign-in

const LoginScreen = () => {
	// Create account through Google
	const [userInfo, setUserInfo] = React.useState();
	const [request, response, promptAsync] = Google.useAuthRequest({
		webClientId: "766684397920-4qbpfp9osp3jlnuupd50u1pacfctt90l.apps.googleusercontent.com",
		iosClientId: "766684397920-j775npmsmd1gj0dnkmv5rgq3q2buemgp.apps.googleusercontent.com",
		androidClientId: "766684397920-u7cs8bettfqoj41c8npfpb8civ8cq7q5.apps.googleusercontent.com",
	});

	React.useEffect(() => {
		if (response?.type == "success") {
			const { id_token } = response.params;
			const credential = GoogleAuthProvider.credential(id_token);
			signInWithCredential(authForGoogle, credential);
		}
	}, [response]);

	React.useEffect(() => {
		const unsub = onAuthStateChanged(authForGoogle, async (user) => {
			if (user) {
				console.log(JSON.stringify(user), null, 2);
				setUserInfo(user);
			}
			else {
				console.log("User not authenticated.");
			}
		});

		return () => unsub();
	}, []);

	// Create account through Firebase
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('');

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
		handleFirebaseSignUp(
		  email,
		  password,
		  userCredential => {
			console.log('User signed up:', userCredential);
			setError('');
			AddUserToDB(auth.currentUser.email);
			AsyncStorage.setItem('userToken', 'user_token_here')
			  .then(() => navigation.navigate('RecipeBook'))
			  .catch(error => console.log('Error setting user token:', error));
		  },
		  error => {
			setError("Invalid email and/or password");
		  }
		);
	  };
	
	  const handleLogin = () => {
		handleFirebaseSignIn(
		  email,
		  password,
		  userCredential => {
			console.log('User signed up:', userCredential);
			setError('');
			AsyncStorage.setItem('userToken', 'user_token_here')
			  .then(() => navigation.navigate('RecipeBook'))
			  .catch(error => console.log('Error setting user token:', error));
		  },
		  error => {
			// Handle error as needed
			setError("Wrong email and/or password");
		  }
		);
	  };

	return (
		<KeyboardAvoidingView 
			style={ContainerStyle.defaultContainer} 
			behavior="padding">
			
			{/* App Logo */}
			<View>
				<Image 
					source={require('../../ASSETS/pantrypal.png')} 
					style={{width: 325, height: 200}}
				/>
			</View>
			{/* Display error message */}
			{error !== '' && (
				<View style={ContainerStyle.errorContainer}>
					<Text style={TextStyle.errorText}>{error}</Text>
				</View>
			)}
	
			{/* Email/Password Input */}
			<View style={ContainerStyle.inputContainer}>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={text => setEmail(text)}
					style={TextStyle.input}
					placeholderTextColor={COLORS.fadedGreen}
				/>
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={text => setPassword(text)}
					style={TextStyle.input}
					secureTextEntry
					placeholderTextColor={COLORS.fadedGreen}
				/>
			</View>

			{/* Login Buttons */}
			<View style={ContainerStyle.buttonContainer}>
			
				{/* Login */}
				<TouchableOpacity 
					onPress={handleLogin} 
					style={ButtonStyle.colorFill}
				>
					<Text style={ButtonStyle.colorFillText}>Login</Text>
				</TouchableOpacity>
				
				{/* Register */}
				<TouchableOpacity 
					onPress={handleSignUp} 
					style={[ButtonStyle.colorOutline]}
				>
					<Text style={ButtonStyle.colorOutlineText}>Sign Up</Text>
				</TouchableOpacity>

				{/* Google Sign-In */}
				<TouchableOpacity 
					onPress={() => { promptAsync(); }} 
					style={ButtonStyle.colorFillBlue}
				>
					<Text style={ButtonStyle.colorFillText}>Sign-In with Google</Text>
				</TouchableOpacity>
			
			</View>

		</KeyboardAvoidingView>
	)
}

export default LoginScreen