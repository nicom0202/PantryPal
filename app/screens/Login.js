import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app as firebaseApp } from '../../firebase'; // Import the initialized Firebase app
import AddUserToDB from '../../INTERFACE/AddUserToDatabase';
import { COLORS, SIZES } from '../../STYLES/theme'
import { ContainerStyle, TextStyle, ButtonStyle } from '../../STYLES/styles';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();	// Listener for Google sign-in

const LoginScreen = () => {
	// Create account through Google
	const [accessToken, setAccessToken] = React.useState(null);
	const [user, setUser] = React.useState(null);
	const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
		clientId: "766684397920-4qbpfp9osp3jlnuupd50u1pacfctt90l.apps.googleusercontent.com",		// Web Client ID
		iosClientId: "766684397920-j775npmsmd1gj0dnkmv5rgq3q2buemgp.apps.googleusercontent.com",
		androidClientId: "766684397920-u7cs8bettfqoj41c8npfpb8civ8cq7q5.apps.googleusercontent.com"
	});

	React.useEffect( () => {
		if (response?.type === "success") {
			setAccessToken(response.authentication.accessToken);
			accessToken && fetchUserInfo();
		} 
	}, [response, accessToken]);	// Run this useEffect whenever response or accessToken change

	async function fetchUserInfo() {
		let response = await fetch("https://googleapis.com/userinfo/v2/me", {
			headers: {
				Authorization: `Bearer ${accessToken}` }
		});
		const useInfo = await response.json();
		setUser(useInfo);
	}

	// Create account through Firebase
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
		<KeyboardAvoidingView style={ContainerStyle.defaultContainer} behavior="padding">
			
			{/* App Logo */}
			<View>
				<Image source={require('../../ASSETS/pantrypal.png')} style={{width: 325, height: 200}}/>
			</View>
	
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
				<TouchableOpacity onPress={handleLogin} style={ButtonStyle.colorFill}>
					<Text style={ButtonStyle.colorFillText}>Login</Text>
				</TouchableOpacity>
				
				{/* Register */}
				<TouchableOpacity onPress={handleSignUp} style={[ButtonStyle.colorOutline]}>
					<Text style={ButtonStyle.colorOutlineText}>Register</Text>
				</TouchableOpacity>

				{/* Google Sign-In */}
				<TouchableOpacity onPress={() => { promptAsync(); }} style={ButtonStyle.googleLogin}>
					<Text style={ButtonStyle.googleLoginText}>Sign-In with Google</Text>
				</TouchableOpacity>
			
			</View>

		</KeyboardAvoidingView>
	)
}

export default LoginScreen