import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ headerTitle: "Home", tabBarLabel: "Home" }}/>
            <Tabs.Screen name="grocery" options={{ headerTitle: "Grocery List", tabBarLabel: "Grocery List" }}/>
            <Tabs.Screen name="recipebook" options={{ headerTitle: "Recipe Book", tabBarLabel: "Recipe Book" }}/>
        </Tabs>
    );
};