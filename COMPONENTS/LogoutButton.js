import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { getAuth, signOut } from 'firebase/auth';
import { LoginStyles, LogoutStyles } from '../STYLES/styles.js';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../CONSTANTS/theme.js';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed Out");
        // Navigate to the Login screen after successful logout
        navigation.navigate('Login');
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };

  return (
    <TouchableOpacity style={[LoginStyles.button, LoginStyles.buttonOutline]} onPress={handleSignOut}>
          <Ionicons name="log-out" color={COLORS.brightGreen} size={SIZES.xLarge} />
          <Text style={[LoginStyles.buttonOutlineText]}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
