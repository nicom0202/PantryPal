import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// SCREENS
import Home from "./screens/home";
import RecipeBook from "./screens/RecipeBook";
import GroceryList from "./screens/GroceryList";

const Tab = createBottomTabNavigator();

export default function Container(){
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Home" component={Home}/>
                <Tab.Screen name="Recipe Book" component={RecipeBook}/>
                <Tab.Screen name="Grocery List" component={GroceryList}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}