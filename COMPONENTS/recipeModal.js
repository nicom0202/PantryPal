import React, { useState } from 'react';
import { View, Text, Modal, Pressable, TextInput, SafeAreaView, Alert } from 'react-native';
import { viewStyle, buttonStyle, textStyle, textInputStyle } from '../STYLES/styles.js';

const RecipeModal = ({
    modalVisible, 
    selectedRecipe, 
    recipes, 
    recipeName, 
    setRecipeName, 
    setRecipes, 
    setModalVisible,
    setSelectedRecipe,
}) => {
    const [isEditing, setIsEditing] = useState(false);

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
                updatedRecipes[recipeIndex].name = recipeName || "Recipe";
                setRecipes(updatedRecipes);
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
                /* Delete the recipe here */
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

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={viewStyle.centeredView}>
                <View style={viewStyle.modalView}>
                    <Pressable
                        style={buttonStyle.close}
                        hitSlop={15}
                        onPress={() => {
                            setModalVisible(false);
                            setSelectedRecipe(null);
                            saveEditing();
                        }}
                    >
                        <Text style={textStyle.body}>X</Text>
                    </Pressable>

                    {isEditing ? (
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
                    ) : (
                        <Text style={textStyle.body}>{selectedRecipe ? selectedRecipe.name : ''}</Text>
                    )}

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

                    {isEditing && (
                        <Pressable
                            style={buttonStyle.deleteRecipe}
                            onPress={handleDeleteRecipe}
                        >
                            <Text style={textStyle.body}>Delete Recipe</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default RecipeModal;
