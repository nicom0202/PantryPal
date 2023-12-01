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
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [likedRecipes, setLikedRecipes] = useState([]);
    const [modalImage, setModalImage] = useState(null); 

    // Call pullSavedRecipes after the component mounts
    useEffect(() => {
        pullDiscoverRecipes(setRecipes);
    }, []);

    const handleNewDiscoverRecipes = () =>{
        //delete all recipes currently in discoverModal
        // Clear the recipes array by setting it to an empty array
        setRecipes([]); 
        pullDiscoverRecipes(setRecipes);
    };

    /* toggle the state of the modal when a recipe is clicked */
    const handleRecipeInteraction = (recipe) => {
        setModalVisible(true);
        setSelectedRecipe(recipe);
        // Set the image for the specific modal
        setModalImage(recipe.image || null);
    };

    return (
        <View 
            style={[
                ContainerStyle.defaultContainer, 
                {justifyContent: 'flex-start'
            }]}
        >
            <View style={ContainerStyle.buttonContainer}>
                {/* Refresh Button (Gather New Recipes) */}
                <Pressable 
                    onPress={handleNewDiscoverRecipes} 
                    style={ButtonStyle.colorFillBlue}
                > 
                    <Text style={ButtonStyle.colorFillText}>
                        Find New Recipes
                    </Text>
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
                        likedRecipes={likedRecipes}
                        setLikedRecipes={setLikedRecipes}
                        selectedImage={modalImage} 
                    />
                    {/* Clickable boxes that displays each recipe */}
                    {recipes.map((recipe) => (
                        <ClickableBox
                            key={recipe.id}
                            onClick={() => handleRecipeInteraction(recipe)}
                            content={recipe.image ? recipe.image : recipe.name}
                            isImage={recipe.image ? true : false}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Discover;