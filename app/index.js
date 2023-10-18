import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator();

function Layout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="GroceryList" component={GroceryList} />
      <Tab.Screen name="RecipeBook" component={RecipeBook} />
    </Tab.Navigator>
  );
}