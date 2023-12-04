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

    useEffect(() => {
        const fetchData = async () => {
        try {
            if (route.params && route.params.selectedRecipes) {
                const { selectedRecipes } = route.params;
                console.log(selectedRecipes);

                RecipeModalArray = selectedRecipes;

                // Ingredients is map: name-->quantity from selected recipes
                const ingredients = await GetIngredients(RecipeModalArray);
                setIngredientsForUsers(ingredients);
            } else {
                // Handle the case when selectedRecipes is null
                console.log("selectedRecipes is null or undefined");
            }
        } catch (TypeError) {
            console.error("Error fetching ingredients:", error);
        }
        };
        fetchData();
    }, [route.params]);

    // Prompts user to confirm they want to clear the grocery list.
    const confirmClearList = () => {
        Alert.alert("Confirm Clear", 
        "Are you sure you want to clear your entire grocery list?", [
            {
                text: "Cancel", 
                onPress: () => console.log("User canceled clearing grocery list."),
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
    <View 
        style={[ContainerStyle.defaultContainer, 
        {justifyContent: 'flex-start'}]}
    >
        {/* Clear Button */}
        <View style={ContainerStyle.buttonContainer}>
            <TouchableOpacity 
                onPress={confirmClearList} 
                style={ButtonStyle.colorFillYellow}
            >
                <Text style={ButtonStyle.colorFillText}>
                    Clear Grocery List
                </Text>
            </TouchableOpacity>
        </View>
        
        {/* Checkbox List*/}
        <ScrollView style={ContainerStyle.scrollView}>
            {Object.entries(ingredientsForUsers).map(([ingredient, quantity], index) => (
                <CheckBox
                    key={index}
                    onPress={() => handleCheckboxChange(ingredient)}
                    // Displaying name and quantity
                    title={`${ingredient} - ${quantity} gram(s)`}   
                    isChecked={selectedIngredients[ingredient] || false}
                />
            ))}
        </ScrollView>
    </View>
    );
}