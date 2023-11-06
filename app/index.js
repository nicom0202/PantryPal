import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from "../CONSTANTS/theme";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from '../firebase.js'

// SCREENS
import RecipeBook from "./screens/RecipeBook";
import GroceryList from "./screens/GroceryList";
import Login from "./screens/Login";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Adding Stack Navigator


function TabNavigator() {
  return (
    <Tab.Navigator
        //initialRouteName={isUserSignedIn ? "RecipeBook" : "Login"}
        screenOptions={{
          headerStyle: {backgroundColor : COLORS.brightGreen, height: 70},
          headerTitleStyle: {fontSize: SIZES.xLarge, color: COLORS.lightWhite},
          headerStatusBarHeight: 0,
          tabBarLabelStyle: {fontSize: SIZES.xSmall},
          tabBarInactiveBackgroundColor: COLORS.brightGreen,
          tabBarInactiveTintColor: COLORS.lightWhite,
          tabBarActiveBackgroundColor: COLORS.fadedGreen,
          tabBarActiveTintColor: COLORS.lightWhite,
        }}
      >

        <Tab.Screen name="Home"
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
      </Tab.Navigator>
  );
}

export default function Container() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Hide the header for the Login screen
        />
        <Stack.Screen
          name="RecipeBook"
          options={{ headerShown: false }} // Hide the header for the RecipeBookHome screen
        >
          {() => (
            <TabNavigator />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}