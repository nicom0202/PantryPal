import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';
import DiscoverModal from '../../COMPONENTS/discoverModal.js';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import { ContainerStyle, GridStyle } from '../../STYLES/styles.js';
import pullDiscoverRecipes from '../../INTERFACE/PullDiscoverRecipes.js';
import { ButtonStyle, TextStyle, } from '../../STYLES/styles.js';

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
        <View style={[ContainerStyle.defaultContainer, {justifyContent: 'flex-start'}]}>
            <View style={ContainerStyle.buttonContainer}>
                {/* Refresh Button (Gather New Recipes) */}
                <Pressable onPress={handleNewDiscoverRecipes} style={ButtonStyle.select}> 
                    <Text style={ButtonStyle.selectText}>Find New Recipes</Text>
                </Pressable>
            </View>

            <ScrollView>
                <View style={[GridStyle.grid]}>
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
                </View>
            </ScrollView>
        </View>
    );
};

export default Discover;