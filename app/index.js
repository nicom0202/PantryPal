import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../CONSTANTS/theme";
import { createStackNavigator } from "@react-navigation/stack";
import { LogoutButton } from '../COMPONENTS/LogoutButton.js'

// SCREENS
import RecipeBook from "./screens/RecipeBook";
import GroceryList from "./screens/GroceryList";
import Account from "./screens/Account";
import Login from "./screens/Login";
import Discover from "./screens/Discover";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


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

        <Tab.Screen name="Recipe Book"
                    component={RecipeBook}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-outline" color={color} size={size} />
                      )
                    }}
        />

        <Tab.Screen name="Grocery List"
                    component={GroceryList}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-outline" color={color} size={size} />
                      )
                    }}
        />         

        <Tab.Screen name="Discover"
                    component={Discover}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name="globe-outline" color={color} size={size} />
                      )
                    }}
        />

        <Tab.Screen name="Account"
                    component={Account}
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
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
