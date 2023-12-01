import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../STYLES/theme.js';
import { ViewStyle, ButtonStyle, TextStyle } from '../STYLES/styles.js';
import addRecipe from '../INTERFACE/AddRecipe.js';
import { v4 as uuidv4 } from 'uuid'; 
const DiscoverModal = ({
    modalVisible, 
    selectedRecipe, 
    setModalVisible,
    setSelectedRecipe,
    recipes,
    setRecipes,
    likedRecipes,
    setLikedRecipes,
    selectedImage
}) => {
    // Function to check if a recipe is liked
    const isRecipeLiked = (recipeID) => {
        return likedRecipes.some(recipe => recipe === recipeID);
    };

    const handleLikeRecipe = () => {
        if (selectedRecipe) {
            /* Find the index of the selected recipe */
            const recipeIndex = recipes.findIndex(
                recipe => recipe.discoverID === selectedRecipe.discoverID
                );
            const updatedRecipes = [...recipes];
            let updatedLikedRecipes = [...likedRecipes];

            /* Check if the recipe has been liked before */
            const isLiked = likedRecipes.indexOf(selectedRecipe.discoverID);

            if (recipeIndex != -1 && isLiked == -1) {
                /* update the number of likes for the recipe */
                updatedRecipes[recipeIndex].likes = selectedRecipe.likes + 1;

                /* Remove the recipe from the liked recipes array */
                updatedLikedRecipes = [...likedRecipes, selectedRecipe.discoverID];
            } else {
                /* update the number of likes for the recipe */
                updatedRecipes[recipeIndex].likes = selectedRecipe.likes - 1;
                
                /* Remove the recipe from the liked recipes array */
                updatedLikedRecipes = likedRecipes.filter(item => item != selectedRecipe.discoverID);
            }

            setLikedRecipes(updatedLikedRecipes);
            console.log(updatedLikedRecipes);
            setRecipes(updatedRecipes);
            addRecipe(updatedRecipes[recipeIndex], "discover");
            console.log(updatedRecipes[recipeIndex]);
        }
     };

    const handleAddDiscoverRecipe = () => {
       selectedRecipe.id = uuidv4();
       selectedRecipe.discoverID = Math.random();
       addRecipe(selectedRecipe, "user");
       setModalVisible(false);
       setSelectedRecipe(null);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={ViewStyle.centeredView}>
                <View style={ViewStyle.modalView}>
                    {/* Close button (top right) */}
                    <Pressable
                        style={ButtonStyle.close}
                        hitSlop={20}
                        onPress={() => {
                            setModalVisible(false);
                            setSelectedRecipe(null);
                        }}
                    >
                        <Ionicons 
                            name="close-outline" 
                            color={COLORS.lightWhite} 
                            size={SIZES.xLarge}     
                        />
                    </Pressable>

                    <View style={ViewStyle.scrollViewContent}>
                        { selectedImage ? (
                            <View 
                            style={{ 
                                width: 240, 
                                height: 240, 
                                borderRadius: 8, 
                                overflow: 'hidden' 
                            }}>
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={{ 
                                        width: '100%', 
                                        height: '100%'
                                    }}
                                />
                            </View>
                        ) : (<View></View>)}

                        <Text style={TextStyle.body}>
                            {selectedRecipe ? selectedRecipe.name : ''}
                        </Text>

                        <Text style={TextStyle.body}>
                            {selectedRecipe ? selectedRecipe.instructions : ''}
                        </Text>

                        <View>
                            <Text style={TextStyle.body}>Ingredients:</Text>
                            {selectedRecipe ? selectedRecipe.ingredients.map((ingredient, index) => (
                                <Text key={index} style={TextStyle.body}>
                                    {ingredient.name}: {ingredient.quantity}
                                </Text>
                            )) : ''}
                        </View>
                        {/* TODO: ADD MORE FIELDS LIKE COOKTIME, IMAGE*/}

                        <Text style={TextStyle.body}>
                            Likes: {selectedRecipe ? selectedRecipe.likes : 0}
                        </Text>
                    </View>
                    <Pressable
                        style={ButtonStyle.addRecipe}
                        onPress={handleAddDiscoverRecipe}
                        >
                        <Text style={ButtonStyle.colorFillText}>
                            Add to Recipe Book
                        </Text>
                    </Pressable>
                    {/* Pass addedRecipe to RecipeModal */}

                    {selectedRecipe && !isRecipeLiked(selectedRecipe.discoverID) ? (
                        <Pressable
                            style={ButtonStyle.likeRecipe}
                            onPress={handleLikeRecipe}
                            >
                            <Text style={ButtonStyle.colorFillText}>
                                Like
                            </Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={ButtonStyle.likeRecipe}
                            onPress={handleLikeRecipe}
                            >
                            <Text style={ButtonStyle.colorFillText}>
                                Remove Like
                            </Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default DiscoverModal;
