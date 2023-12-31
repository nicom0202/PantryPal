import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { getAuth, signOut } from 'firebase/auth';
import { ButtonStyle } from '../STYLES/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../STYLES/Theme';

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
      <TouchableOpacity 
          style={ButtonStyle.colorOutline} 
          onPress={handleSignOut}
      >
          <MaterialCommunityIcons 
              name="logout" 
              color={COLORS.brightGreen} 
              size={SIZES.xLarge} 
          />
          <Text style={[ButtonStyle.colorOutlineText]}>Logout</Text>
      </TouchableOpacity>
  );
};

export default LogoutButton;
