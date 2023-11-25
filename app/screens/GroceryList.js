import { useState, useEffect } from "react";
import { View, Text, Pressable, Alert } from 'react-native';
import { auth } from "../../firebase";
import CheckBox from "../../COMPONENTS/checkBox.js";
import GetIngredients from "../../INTERFACE/GetUserIngredients";
import { ContainerStyle, ButtonStyle } from '../../STYLES/styles.js';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function GroceryList({ route }) {
    const [ingredientsForUsers, setIngredientsForUsers] = useState({});
    const [selectedIngredients, setSelectedIngredients] = useState({});
    // Temporary array of selected recipes until we can get the selected recipes from the RecipeBook  

    useEffect(() => {
        const fetchData = async () => {
        try {        
            console.log("Got params:", route.params)
            const { selectedRecipes } = route.params;

            console.log(selectedRecipes)

            RecipeModalArray = selectedRecipes;
            // Ingredients is a dictionary mapping of the ingredient name to the quantity from selected recipes
            const ingredients = await GetIngredients(RecipeModalArray);
            setIngredientsForUsers(ingredients);
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        }
        };
        fetchData();
    }, [route.params]);

    // Prompts user to confirm they want to clear the grocery list.
    const confirmClearList = () => {
        Alert.alert("Clear Grocery List", "All grocery list items will be cleared. Continue?", [
            {
                text: "Cancel", onPress: () => console.log("User canceled clearing grocery list."),
            },
            {
                text: "Continue", onPress: handleClearList,
            },
        ]);
    }

    // Clears grocery list.
    const handleClearList = () => {
        setIngredientsForUsers([]);
        setSelectedIngredients({});
    }

    const handleCheckboxChange = (ingredient) => {
        setSelectedIngredients({
        ...selectedIngredients,
        [ingredient]: !selectedIngredients[ingredient],
        });
    };

    return (
    <View style={[ContainerStyle.defaultContainer, {justifyContent: 'flex-start'}]}>
        {/* Clear Button */}
        <View style={ContainerStyle.buttonContainer}>
            <TouchableOpacity onPress={confirmClearList} style={ButtonStyle.select}>
                <Text style={ButtonStyle.selectText}>Clear Grocery List</Text>
            </TouchableOpacity>
        </View>

        {/* Checkbox List*/}
        <ScrollView style={[{width: '100%', padding: 10, margin: 10, alignSelf: 'baseline'}]}>
            {Object.entries(ingredientsForUsers).map(([ingredient, quantity], index) => (
                <CheckBox
                    key={index}
                    onPress={() => handleCheckboxChange(ingredient)}
                    title={`${ingredient} - ${quantity} cup(s)`}    // Displaying name and quantity
                    isChecked={selectedIngredients[ingredient] || false}
                />
            ))}
        </ScrollView>
    </View>
    );
}