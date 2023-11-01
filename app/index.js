import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from "../CONSTANTS/theme";

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
      
      <Tab.Navigator
        initialRouteName={isUserSignedIn ? "Recipe Book" : "Login"}
        screenOptions={{
          headerStyle: {backgroundColor : COLORS.brightGreen, height: 70},
          headerTitleStyle: {fontSize: SIZES.xLarge, color: COLORS.lightWhite},
          headerStatusBarHeight: 0,
          tabBarInactiveBackgroundColor: COLORS.brightGreen,
          tabBarInactiveTintColor: COLORS.lightWhite,
          tabBarActiveBackgroundColor: COLORS.fadedGreen,
          tabBarActiveTintColor: COLORS.lightWhite,
        }}
      >

        <Tab.Screen name="Recipe Book"
                    component={RecipeBook}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-sharp" color={color} size={size} />
                      )
                    }}
        />

        <Tab.Screen name="Grocery List"
                    component={GroceryList}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-sharp" color={color} size={size} />
                      )
                    }}
        />

        <Tab.Screen name="Login"
                    component={Login}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-sharp" color={color} size={size} />
                      )
                    }}
        />
                    
      </Tab.Navigator>

    </NavigationContainer>
  );
}
