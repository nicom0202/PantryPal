import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button } from 'react-native';
import DiscoverModal from '../../COMPONENTS/discoverModal.js';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import { gridStyle } from '../../STYLES/styles.js';
import pullDiscoverRecipes from '../../COMPONENTS/pullDiscoverRecipes.js';

const Discover = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectMode, setSelectMode] = useState(false);


    // Call pullSavedRecipes after the component mounts
    useEffect(() => {
        pullDiscoverRecipes(setRecipes);
    }, []);

    const handleNewDiscoverRecipes = () =>{
        //delete all recipes currently in discoverModal
        setRecipes([]); // Clear the recipes array by setting it to an empty array
        pullDiscoverRecipes(setRecipes);
    };

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
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={[gridStyle.grid]}>
                {/* Modal that displays recipe information */}
                <DiscoverModal
                    modalVisible={modalVisible}
                    selectedRecipe={selectedRecipe}
                    recipes={recipes}
                    setRecipes={setRecipes}
                    setModalVisible={setModalVisible}
                    setSelectedRecipe={setSelectedRecipe}
                    selectedModal={modalVisible}
                />
                {/* Clickable boxes that displays each recipe */}
                {recipes.map((recipe) => (
                    <ClickableBox
                        key={recipe.id}
                        content={recipe.image ? recipe.image : recipe.name}
                        // Check if the recipe is in the selectedRecipes array
                        highlighted={selectedRecipes.includes(recipe)} // Add this prop
                        onClick={() => handleRecipeInteraction(recipe)}
                    />
                ))}

                {/* PULL NEW DISCOVER RECIPES BUTTON */}
                <Button title="New Recipes Please" 
                    onPress={handleNewDiscoverRecipes} 
                />
            </View>
        </ScrollView>
    );
};

export default Discover;
