import { View, Text, Modal, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import { gridStyle, viewStyle, buttonStyle, textStyle } from '../../STYLES/styles.js';
import { ScrollView } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid'; // universally unique indentifiers for recipes

const Home = () => {
    /* States for modal, currently selected recipe, and list of recipes */
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([
        { id: uuidv4(), name: "Recipe 1" },
        { id: uuidv4(), name: "Recipe 2", image: require('./chicken.jpeg') },
    ]);

    /* toggle the state of the modal when a recipe is clicked */
    const handleRecipeInteraction = (recipe) => {
        if (selectedRecipe && selectedRecipe.id === recipe.id) {
            // Close the modal if it's the same recipe
            setModalVisible(false);
            setSelectedRecipe(null);
        } else {
            // Open the modal for the selected recipe
            setModalVisible(true);
            setSelectedRecipe(recipe);
        }
    };

    /* add the recipe to list of recipes and open modal for new recipe */
    const addRecipeAndOpenModal = () => {
        const uniqueId = uuidv4();
        const newRecipe = { id: uniqueId, name: "New Recipe" };
        const updatedRecipes = [...recipes, newRecipe];
        setRecipes(updatedRecipes);

        // Open the modal for the newly added recipe
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
                            <Text style={textStyle.modalText}>Hello World!</Text>

                            <Pressable
                                style={buttonStyle.deleteRecipe}
                                onPress={handleDeleteRecipe}>
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

export default Home;