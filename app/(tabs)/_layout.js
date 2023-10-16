import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ headerTitle: "Home Screen" }}/>
            <Tabs.Screen name="grocery" options={{ headerTitle: "Grocery List" }}/>
        </Tabs>
    )
}