import React, { useState } from 'react';
import addRecipe from '../INTERFACE/AddRecipe.js';
import deleteRecipe from '../INTERFACE/DeleteRecipe.js';
import IngredientFlatList from './IngredientFlatList.js';
import addToDiscover from '../INTERFACE/AddToDiscover.js';

import { 
    View, 
    Text, 
    Modal, 
    Pressable, 
    TextInput, 
    SafeAreaView, 
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import { viewStyle, buttonStyle, textStyle, textInputStyle } from '../STYLES/styles.js';
import { ScrollView } from 'react-native-gesture-handler';
import SimpleAddImageButton from './AddImageButton.js';

const MAX_RECIPE_NAME_LENGTH = 32; // Set the maximum length for the recipe name

const RecipeModal = ({
    modalVisible, 
    selectedRecipe, 
    recipes, 
    isEditing,
    setRecipes, 
    setModalVisible,
    setSelectedRecipe,
    setIsEditing,
    selectedImage, // Use the specific image prop
    handleImageSelected, // Use the specific handler for updating the image
}) => {

    const startEditing = () => {
        setIsEditing(true);
    };

    const saveEditing = () => {
        if (selectedRecipe) {
            /* Find the index of the selected recipe */
            const recipeIndex = recipes.findIndex(recipe => recipe.id === selectedRecipe.id);
            if (recipeIndex !== -1) {
                /* Create a copy of the recipes array and update the name of the selected recipe */
                const updatedRecipes = [...recipes];
                updatedRecipes[recipeIndex].name = selectedRecipe.name || "Recipe";
                updatedRecipes[recipeIndex].image = selectedImage;
                setRecipes(updatedRecipes);
                addRecipe(updatedRecipes[recipeIndex])
            }
            
            setIsEditing(false);
        }
    };

        /* Alerts the user to confirm before deleting recipe */
        const handleDeleteRecipe = () => {
            Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete this recipe?",
                [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {              
                        /* remove the recipe from list of recipes and close modal */
                        if (selectedRecipe) {
                            const updatedRecipes = recipes.filter(
                                recipe => recipe.id !== selectedRecipe.id);
                            // TODO: DELETE RECIPE FROM FIREBASE!!!!!!!!!
                            deleteRecipe(selectedRecipe)
                            setRecipes(updatedRecipes);
                            setModalVisible(false);
                            setSelectedRecipe(null);
                            setIsEditing(false);
                        }
                    },
                },
                ]
            );
        };    
    
    /* Alerts the user to confirm before publishing recipe */
    const sendToDiscover = () => {
        Alert.alert(
            "Confirm Publish",
            "Are you sure you want to publish this recipe and send it to the discover page?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Publish",
                    onPress: () => {
                        /* Publish the recipe here */            
                        if (selectedRecipe) {
                            addToDiscover(selectedRecipe);
                            console.log("Recipe sent to Discover");
                        }
                    },
                },
            ]
        );
    };

    /* Update the name of the selected recipe */
    const updateRecipeName = (newName) => {
        if (selectedRecipe && newName.length <= MAX_RECIPE_NAME_LENGTH) {
            selectedRecipe.name = newName; // Update the name directly in the selectedRecipe object

            const updatedRecipes = recipes.map((recipe) =>
                recipe.id === selectedRecipe.id ? { ...recipe, name: newName } : recipe
            );
            setRecipes(updatedRecipes);
        }   
    };

    /* Update the instructions of the selected recipe */
    const updateRecipeInstructions = (newInstructions) => {
        if (selectedRecipe) {
            selectedRecipe.instructions = newInstructions; // Update the name directly in the selectedRecipe object

            const updatedRecipes = recipes.map((recipe) =>
                recipe.id === selectedRecipe.id ? { ...recipe, instructions: newInstructions } : recipe
            );
            setRecipes(updatedRecipes);
        }   
    };

    const handleDismissKeyboard = () => {
        Keyboard.dismiss(); // This will dismiss the keyboard when you tap away from the TextInput
    };
    

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={viewStyle.centeredView}>
                <View style={viewStyle.modalView}>
                    {/* Close button (top right) -- TODO save editing? alert */}
                    <Pressable
                        style={buttonStyle.close}
                        hitSlop={15}
                        onPress={() => {
                            saveEditing();
                            setModalVisible(false);
                            setSelectedRecipe(null);
                        }}
                    >
                        <Text style={textStyle.body}>X</Text>
                    </Pressable>

                    <ScrollView contentContainerStyle={viewStyle.scrollViewContent}>
                        {/* Image box while editing, show image otherwise */}
                        {isEditing ? (
                            <SafeAreaView>
                                <SimpleAddImageButton 
                                    onImageSelected={handleImageSelected} 
                                    currentImage={selectedRecipe ? selectedRecipe.image : null} 
                                    selectedRecipe={selectedRecipe}
                                />
                            </SafeAreaView>
                        ) : (
                            selectedImage && (
                                <View style={{ width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden' }}>
                                    <Image
                                        source={{ uri: selectedImage }}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                            )
                        )}

                        {/* Recipe Name Text Box while editing, Text otherwise */}
                        {isEditing ? (
                            <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                                <SafeAreaView>
                                    <TextInput
                                    style={[textInputStyle.inputRecipeName]} 
                                    value={selectedRecipe ? selectedRecipe.name : ''}
                                    onChangeText={text => updateRecipeName(text)}
                                    placeholder="Recipe Name"
                                    placeholderTextColor="grey"
                                    />
                                </SafeAreaView>
                            </TouchableWithoutFeedback>
                        ) : (
                            <Text style={textStyle.body}>{selectedRecipe ? selectedRecipe.name : ''}</Text>
                        )}

                        {/* Recipe Ingredients Text Box while editing, Text otherwise */}
                        {isEditing ? (
                            <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                                <SafeAreaView>
                                    <TextInput
                                    style={[textInputStyle.inputRecipeInstructions]} 
                                    value={selectedRecipe ? selectedRecipe.instructions : ''}
                                    onChangeText={text => updateRecipeInstructions(text)}
                                    placeholder="Recipe Instructions"
                                    placeholderTextColor="grey"
                                    multiline={true}
                                    />
                                </SafeAreaView>
                            </TouchableWithoutFeedback>
                        ) : (
                            <Text style={textStyle.body}>{selectedRecipe ? selectedRecipe.instructions : ''}</Text>
                        )}

                        {/* Ingredients list */}
                        {isEditing ? (
                            <IngredientFlatList 
                                recipes={recipes}
                                selectedRecipe={selectedRecipe}
                                setRecipes={setRecipes}
                            />
                        ) : (
                            <View>
                                <Text style={textStyle.body}>Ingredients:</Text>
                                {selectedRecipe ? selectedRecipe.ingredients.map((ingredient, index) => (
                                    <Text key={index} style={textStyle.body}>
                                        {ingredient.name}: {ingredient.quantity}
                                    </Text>
                                )) : ''}
                            </View>
                        )}
                    </ScrollView>

                    {isEditing ? (
                        <Pressable
                            style={buttonStyle.saveRecipe}
                            onPress={saveEditing}
                        >
                            <Text style={textStyle.body}>Save</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={buttonStyle.editRecipe}
                            onPress={startEditing}
                        >
                            <Text style={textStyle.body}>Edit</Text>
                        </Pressable>
                    )}

                    {isEditing ? (
                        <Pressable
                            style={buttonStyle.deleteRecipe}
                            onPress={handleDeleteRecipe}
                        >
                            <Text style={textStyle.body}>Delete Recipe</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={buttonStyle.sendRecipeToDiscover}
                            onPress={sendToDiscover}
                        >
                            <Text style={textStyle.light}>Publish</Text>
                        </Pressable>
                    )}

                </View>
            </View>
        </Modal>
    );
};

export default RecipeModal;
