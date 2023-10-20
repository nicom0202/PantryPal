import { View, Text, Modal, Pressable, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import { gridStyle, viewStyle, buttonStyle, textStyle } from '../../STYLES/styles.js';
import { ScrollView } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipeName, setRecipeName] = useState(''); // Add state for the recipe name

    const [recipes, setRecipes] = useState([
        { id: uuidv4(), name: "Recipe 1" },
        { id: uuidv4(), name: "Recipe 2", image: require('./chicken.jpeg') },
    ]);

    const handleRecipeInteraction = (recipe) => {
        if (selectedRecipe && selectedRecipe.id === recipe.id) {
            // Close the modal if it's the same recipe
            setModalVisible(false);
            setSelectedRecipe(null);
        } else {
            // Open the modal for the selected recipe
            setModalVisible(true);
            setSelectedRecipe(recipe);
            setRecipeName(recipe.name); // Set the recipe name in the state
        }
    };

    const addRecipeAndOpenModal = () => {
        const uniqueId = uuidv4();
        const newRecipe = { id: uniqueId, name: "" };
        const updatedRecipes = [...recipes, newRecipe];
        setRecipes(updatedRecipes);

        // Open the modal for the newly added recipe
        handleRecipeInteraction(newRecipe);
    };

    const removeRecipe = () => {
        if (selectedRecipe) {
            const updatedRecipes = recipes.filter(recipe => recipe.id !== selectedRecipe.id);
            setRecipes(updatedRecipes);
            setModalVisible(false);
            setSelectedRecipe(null);
        }
    };

    const updateTitle = () => {
        if (selectedRecipe) {
            // Find the index of the selected recipe
            const recipeIndex = recipes.findIndex(recipe => recipe.id === selectedRecipe.id);
            if (recipeIndex !== -1) {
                // Create a copy of the recipes array and update the name of the selected recipe
                const updatedRecipes = [...recipes];
                updatedRecipes[recipeIndex].name = recipeName;
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
                                onPress={() => {
                                    setModalVisible(false);
                                    setSelectedRecipe(null);
                                }}>
                                <Text style={textStyle.body}>X</Text>
                            </Pressable>

                            <SafeAreaView>
                              <TextInput
                                style={styles.input}
                                onChangeText={text => setRecipeName(text)} // Update the recipe name in the state
                                value={recipeName} // Use the state variable
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
                                onPress={removeRecipe}>
                                <Text style={textStyle.body}>Delete Recipe</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {recipes.map((recipe) => (
                    <ClickableBox
                        key={recipe.id}
                        content={recipe.image ? recipe.image : recipe.name}
                        onClick={() => handleRecipeInteraction(recipe)}
                    />
                ))}

                <ClickableBox
                    content={"Add Recipe"}
                    onClick={addRecipeAndOpenModal}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Home;
