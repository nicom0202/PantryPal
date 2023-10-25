import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Modal, 
    Pressable, 
    TextInput, 
    StyleSheet, 
    SafeAreaView, 
    Alert,
    ScrollView,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid'; // universally unique indentifiers for recipes

import ClickableBox from '../../COMPONENTS/clickableBox.js';
import { gridStyle, viewStyle, buttonStyle, textStyle, textInputStyle } from '../../STYLES/styles.js';


const RecipeBook = () => {
    /* States for modal, currently selected recipe, and list of recipes */
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipeName, setRecipeName] = useState('');
    const [recipes, setRecipes] = useState([
        { id: uuidv4(), name: "Recipe 1" },
        { id: uuidv4(), name: "Recipe 2", image: require('./chicken.jpeg') },
    ]);

    /* toggle the state of the modal when a recipe is clicked */
    const handleRecipeInteraction = (recipe) => {
        if (selectedRecipe && selectedRecipe.id === recipe.id) {
            /* Close the modal if it's the same recipe */
            setModalVisible(false);
            setSelectedRecipe(null);
        } else {
            /* Open the modal for the selected recipe, set recipe name */
            setModalVisible(true);
            setSelectedRecipe(recipe);
            setRecipeName(recipe.name);
        }
    };

    /* Add a recipe with unique ID, open the modal for the newly added recipe */
    const handleAddRecipe = () => {
        const uniqueId = uuidv4();
        const newRecipe = { id: uniqueId, name: "" };
        const updatedRecipes = [...recipes, newRecipe];
        setRecipes(updatedRecipes);
        handleRecipeInteraction(newRecipe);
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
                // Delete the recipe here
                removeRecipe();
                },
            },
            ]
        );
    };      

    /* remove the recipe from list of recipes and close modal */
    const removeRecipe = () => {
        if (selectedRecipe) {
            const updatedRecipes = recipes.filter(recipe => recipe.id !== selectedRecipe.id);
            setRecipes(updatedRecipes);
            setModalVisible(false);
            setSelectedRecipe(null);
        }
    };

    /* Updates title of recipe */
    const updateTitle = () => {
        if (selectedRecipe) {
            /* Find the index of the selected recipe */
            const recipeIndex = recipes.findIndex(recipe => recipe.id === selectedRecipe.id);
            if (recipeIndex !== -1) {
                /* Create a copy of the recipes array and update the name of the selected recipe */
                const updatedRecipes = [...recipes];
                updatedRecipes[recipeIndex].name = recipeName || "Recipe";
                setRecipes(updatedRecipes);
            }
            setModalVisible(false);
            setSelectedRecipe(null);
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={[gridStyle.grid]}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}>
                    <View style={viewStyle.centeredView}>
                        <View style={viewStyle.modalView}>
                            <Pressable
                                style={buttonStyle.close}
                                hitSlop={15}
                                onPress={() => {
                                    setModalVisible(false);
                                    setSelectedRecipe(null);
                                }}>
                                <Text style={textStyle.body}>X</Text>
                            </Pressable>

                            <SafeAreaView>
                              <TextInput
                                style={[textInputStyle.input]} 
                                value={recipeName}
                                onChangeText={text => setRecipeName(text)}
                                placeholder="Recipe Name"
                                placeholderTextColor="grey"
                                keyboardType="alphabetic"
                              />
                            </SafeAreaView>

                            <Pressable
                                style={buttonStyle.saveRecipeTitle}
                                onPress={updateTitle}>
                                <Text style={textStyle.body}>Save</Text>
                            </Pressable>

                            <Pressable
                                style={buttonStyle.deleteRecipe}
                                onPress={handleDeleteRecipe}>

                                <Text style={textStyle.body}>Delete Recipe</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {/* Clickable boxes for recipes */}
                {recipes.map((recipe) => (
                    <ClickableBox
                        key={recipe.id}
                        content={recipe.image ? recipe.image : recipe.name}
                        onClick={() => handleRecipeInteraction(recipe)}
                    />
                ))}

                {/* Clickable box to add recipe */}
                <ClickableBox
                    content={"Add Recipe"}
                    onClick={handleAddRecipe}
                />
            </View>
        </ScrollView>
    );
}

export default RecipeBook;
