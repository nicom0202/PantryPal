import React, { useState, useCallback } from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';
import { v4 as uuidv4 } from 'uuid'; 

import RecipeModal from '../../COMPONENTS/RecipeModal';
import ClickableBox from '../../COMPONENTS/ClickableBox';
import { GridStyle, ButtonStyle, ContainerStyle, } from '../../STYLES/Styles';
import pullSavedRecipes from '../../INTERFACE/PullSavedRecipes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const RecipeBook = () => {
    const navigation = useNavigation();
    /* 
    * State variables for recipe book:
    * modalVisible: bool that enables/disables recipe modal
    * selectedRecipe: recipe that is currently being viewed/edited
    * isEditing: bool for recipes (true - editing, false - viewing)
    * selectedRecipes: recipes that are chosen for the grocery list
    * selectMode: true - selecting, false - not selecting
    * modalImage: handles individual modal images
    */
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [selectMode, setSelectMode] = useState(false);
    const [modalImage, setModalImage] = useState(null); 


    // Use useFocusEffect to call pullSavedRecipes 
    // when the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            // Clear current recipes
            setRecipes([]);
            
            // Call pullSavedRecipes to fetch updated recipes
            pullSavedRecipes(setRecipes);
        }, [])
    );

    /* toggle the state of the modal when a recipe is clicked */
    const handleRecipeInteraction = (recipe) => {
        if (selectMode) {
            const updatedSelected = selectedRecipes.includes(recipe) 
                ? selectedRecipes.filter(r => r !== recipe) 
                : [...selectedRecipes, recipe];
            setSelectedRecipes(updatedSelected);
        } else {
            setModalVisible(true);
            setSelectedRecipe(recipe);
            // Set the image for the specific modal
            setModalImage(recipe.image || null);
        }
    };

    /* Add a recipe with unique ID, open the modal for the newly added recipe */
    const handleAddRecipe = () => {
        const uniqueId = uuidv4();
        const randomDiscoverID = Math.random();
        const newRecipe = { 
            id: uniqueId, 
            name: "", 
            ingredients: [{ name: "", quantity: "" }], 
            instructions: "", 
            cookTime: 0, 
            discoverID: randomDiscoverID,
            // saves the path in the firebase bucket to the image,
            // need to update pullSavedRecipes to pull this image 
            //for a particular recipe
            image: "", 
            likes: 0
        };
        const updatedRecipes = [...recipes, newRecipe];
        setRecipes(updatedRecipes);
        handleRecipeInteraction(newRecipe);
        setIsEditing(true);
    };

    const handleSelectMode = () => {
        setSelectMode(!selectMode);
    };

    const handleCheckout = () => {
        if (selectMode) {
            setSelectMode(false);
            setModalVisible(false);
            //navigate to grocerylist
            console.log("Navigating to Grocery List with params:", 
                        selectedRecipes);
            navigation.navigate('RecipeBook', { 
                screen: 'Grocery List',  
                params: { selectedRecipes }});
            // Clear the selectedRecipes array
            setSelectedRecipes([]);

        } else {
            // Handle transitioning to the select mode
            setSelectMode(true);
        }
    };

    return (
        <View 
            style={[ContainerStyle.defaultContainer, 
            {justifyContent: 'flex-start'}]}
        >
            <View style={ContainerStyle.buttonContainer}>
                {/* Select/Checkout Button */}
                {selectMode ? (
                    <Pressable 
                        onPress={handleCheckout}
                        style={ButtonStyle.colorFillBlue}
                    > 
                        <Text style={ButtonStyle.colorFillText}>
                            Checkout
                        </Text>
                    </Pressable>
                ) : (
                    <Pressable 
                        onPress={handleSelectMode} 
                        style={ButtonStyle.colorFillBlue}
                    > 
                        <Text style={ButtonStyle.colorFillText}>
                            Select Recipes
                        </Text>
                    </Pressable>
                )}
            </View>
            
            <ScrollView>
                <View style={[GridStyle.grid]}>
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
                        // Pass down the specific image for this modal
                        selectedImage={modalImage} 
                        // Update the specific image for this modal
                        handleImageSelected={(imageUri) => setModalImage(imageUri)} 
                    />

                    {/* Clickable boxes that displays each recipe */}
                    {recipes.map((recipe) => (
                        <ClickableBox
                            key={recipe.id}
                            content={recipe.image ? recipe.image : recipe.name}
                            isImage={recipe.image ? true : false}
                            recipeName={recipe.name}
                            // Check if the recipe is in the selectedRecipes array
                            // Add this
                            highlighted={selectedRecipes.includes(recipe)}
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
        </View>
    );
}

export default RecipeBook;