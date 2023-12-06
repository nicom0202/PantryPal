import { useState, useEffect } from "react";
import { View, Text, Alert } from 'react-native';
import CheckBox from "../../COMPONENTS/CheckBox";
import GetIngredients from "../../INTERFACE/GetUserIngredients";
import { ContainerStyle, ButtonStyle } from '../../STYLES/Styles';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function GroceryList({ route }) {
    const [ingredientsForUsers, setIngredientsForUsers] = useState({});
    const [selectedIngredients, setSelectedIngredients] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (route.params && route.params.selectedRecipes) {
                    const { selectedRecipes } = route.params;
                    RecipeModalArray = selectedRecipes;
                    // Ingredients is map: name-->quantity from selected recipes
                    const ingredients = await GetIngredients(RecipeModalArray);
                    const combinedIngredients = {};
                    // Iterate through ingredients and add same name quantities together
                    Object.entries(ingredients).forEach(([ingredient, quantity]) => {
                        const lowercaseIngredient = ingredient.toLowerCase();
                        combinedIngredients[lowercaseIngredient] = 
                        (combinedIngredients[lowercaseIngredient] || 0) + quantity;
                    });
                    setIngredientsForUsers(combinedIngredients);
                } else {
                    // Handle the case when selectedRecipes is null
                    console.log("selectedRecipes is null or undefined");
                }
            } catch (error) {
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