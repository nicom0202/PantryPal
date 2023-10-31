import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { containerStyle } from "../STYLES/styles";
import { COLORS } from "../CONSTANTS/theme";

// SCREENS
import RecipeBook from "./screens/RecipeBook";
import GroceryList from "./screens/GroceryList";
import Login from "./screens/Login";

const Tab = createBottomTabNavigator();

export default function Container() {
  const [isUserSignedIn, setIsUserSignedIn] = React.useState(false);

  // Check the user's sign-in status when the component mounts
  React.useEffect(() => {
    // Implement your authentication check here, for example, using AsyncStorage:
    async function checkSignInStatus() {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsUserSignedIn(true);
        } else {
          setIsUserSignedIn(false);
        }
      } catch (error) {
        console.error('Error checking sign-in status:', error);
        setIsUserSignedIn(false);
      }
    }

    checkSignInStatus();
  }, []);

  return (
    <NavigationContainer independent={true}>
      
      <Tab.Navigator initialRouteName={isUserSignedIn ? "Recipe Book" : "Login"}>

        <Tab.Screen name="Recipe Book"
                    component={RecipeBook}
                    options={{headerStyle: {backgroundColor: COLORS.brightGreen}}} />

        <Tab.Screen name="Grocery List"
                    component={GroceryList}
                    options={{headerStyle: {backgroundColor: COLORS.brightGreen}}} />

        <Tab.Screen name="Login"
                    component={Login}
                    options={{headerStyle: {backgroundColor: COLORS.brightGreen}}}/>
                    
      </Tab.Navigator>
    </NavigationContainer>
  );
}
