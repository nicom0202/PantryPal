// Pantry Pal
import { Tabs } from "expo-router/tabs";

export default function AppLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="RecipeBook" options={{ href: "./(tabs)/RecipeBook.js" }}/>
            <Tabs.Screen name="Home" options={{ href: "./(tabs)/Home.js" }}/>
            <Tabs.Screen name="GroceryList" options={{ href: "./(tabs)/GroceryList.js" }}/>
        </Tabs>
      );
};
