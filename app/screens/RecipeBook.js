import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { v4 as uuidv4 } from 'uuid'; 

import RecipeModal from '../../COMPONENTS/recipeModal.js';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import { gridStyle } from '../../STYLES/styles.js';

const RecipeBook = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipeName, setRecipeName] = useState('');
    const [recipes, setRecipes] = useState([
        { id: uuidv4(), name: "Recipe 1" },
        { id: uuidv4(), name: "Recipe 2", image: require('./chicken.jpeg') },
    ]);

    /* toggle the state of the modal when a recipe is clicked */
    const handleRecipeInteraction = (recipe) => {
        setModalVisible(true);
        setSelectedRecipe(recipe);
        setRecipeName(recipe.name);
    };

    /* Add a recipe with unique ID, open the modal for the newly added recipe */
    const handleAddRecipe = () => {
        const uniqueId = uuidv4();
        const newRecipe = { id: uniqueId, name: "" };
        const updatedRecipes = [...recipes, newRecipe];
        setRecipes(updatedRecipes);
        handleRecipeInteraction(newRecipe);
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={[gridStyle.grid]}>
                {/* Modal that displays recipe information */}
                <RecipeModal
                    modalVisible={modalVisible}
                    selectedRecipe={selectedRecipe}
                    recipes={recipes}
                    recipeName={recipeName}
                    setRecipes={setRecipes}
                    setRecipeName={setRecipeName}
                    setModalVisible={setModalVisible}
                    setSelectedRecipe={setSelectedRecipe}
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
            </View>
        </ScrollView>
    );
}

export default RecipeBook;
