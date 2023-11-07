import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { v4 as uuidv4 } from 'uuid'; 

import RecipeModal from '../../COMPONENTS/recipeModal.js';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import { gridStyle } from '../../STYLES/styles.js';
import LogoutButton from '../../COMPONENTS/LogoutButton.js'; // Import the LogoutButton component
import pullSavedRecipes from '../../COMPONENTS/pullSavedRecipes.js';

const RecipeBook = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [selectMode, setSelectMode] = useState(false);

    // Call pullSavedRecipes after the component mounts
    useEffect(() => {
        pullSavedRecipes(setRecipes);
    }, []);

    
    /* toggle the state of the modal when a recipe is clicked */
    const handleRecipeInteraction = (recipe) => {
        if (selectMode) {
            const updatedSelected = selectedRecipes.includes(recipe) ? selectedRecipes.filter(r => r !== recipe) : [...selectedRecipes, recipe];
            setSelectedRecipes(updatedSelected);
        } else {
            setModalVisible(true);
            setSelectedRecipe(recipe);
        }
    };

    /* Add a recipe with unique ID, open the modal for the newly added recipe */
    const handleAddRecipe = () => {
        const uniqueId = uuidv4();
        const newRecipe = { id: uniqueId, name: "", ingredients: [{ name: "", quantity: "" }], instructions: ""};
        const updatedRecipes = [...recipes, newRecipe];
        setRecipes(updatedRecipes);
        handleRecipeInteraction(newRecipe);
        setIsEditing(true);
    };
    const handleSelectMode = () => {
        setSelectMode(!selectMode);
    };

    const handleContinue = () => {
        if (selectMode) {
            setSelectMode(false);
            setModalVisible(false);
            // Call a function to generate the list with the selected recipes (selectedRecipes)
            console.log("Selected Recipes Array:", selectedRecipes);
            generateList(selectedRecipes);
            // Clear the selectedRecipes array
            setSelectedRecipes([]);
            // Navigate to the grocery list screen
            // (You may implement your own navigation logic here)
        } else {
            // Handle transitioning to the select mode
            setSelectMode(true);
        }
    };

    const generateList = (selectedRecipes) => {
        // Implement the logic to generate the grocery list using the selected recipes
        // This function will receive the array of selected recipes
        // and create a grocery list or perform other required actions.
        console.log("Generating grocery list with selected recipes:", selectedRecipes);
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={[gridStyle.grid]}>
                {/* Modal that displays recipe information */}
                <RecipeModal
                    modalVisible={modalVisible}
                    selectedRecipe={selectedRecipe}
                    recipes={recipes}
                    isEditing={isEditing}
                    setRecipes={setRecipes}
                    setModalVisible={setModalVisible}
                    setSelectedRecipe={setSelectedRecipe}
                    setIsEditing={setIsEditing}
                    selectedModal={modalVisible}
                />
                {/* Clickable boxes that displays each recipe */}
                {recipes.map((recipe) => (
                    <ClickableBox
                        key={recipe.id}
                        content={recipe.image ? recipe.image : recipe.name}
                        onClick={() => handleRecipeInteraction(recipe)}
                    />
                ))}
                {/* Clickable box to add a recipe */}
                <ClickableBox
                    content={"Add Recipe"}
                    onClick={handleAddRecipe}
                />

                {/* IMPORT LOGOUT BUTTON HERE */}
                <LogoutButton />

                {/* SELECT/CHECKOUT BUTTON */}
                {selectMode ? (
                    <Button title="Checkout" onPress={handleContinue} />
                ) : (
                    <Button title="Select" onPress={handleSelectMode} />
                )}
            </View>
        </ScrollView>
    );
}

export default RecipeBook;