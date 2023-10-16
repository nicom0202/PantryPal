import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ headerTitle: "Home Screen", tabBarLabel: "Home" }}/>
            <Tabs.Screen name="grocery" options={{ headerTitle: "Grocery List", tabBarLabel: "Grocery List" }}/>
            <Tabs.Screen name="recipebook" options={{ headerTitle: "Recipes", tabBarLabel: "Recipes" }}/>
        </Tabs>
    )
}