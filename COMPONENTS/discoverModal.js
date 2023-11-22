import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, } from 'react-native';
import { ViewStyle, ButtonStyle, TextStyle } from '../STYLES/styles.js';
import addRecipe from '../INTERFACE/AddRecipe.js';
import { v4 as uuidv4 } from 'uuid'; 
const DiscoverModal = ({
    modalVisible, 
    selectedRecipe, 
    setModalVisible,
    setSelectedRecipe,
}) => {
    

    const handleAddDiscoverRecipe = () => {
       //TODO:
       //make new id and discoverID for recipe
       selectedRecipe.id = uuidv4();
       selectedRecipe.discoverID = Math.random();
       addRecipe(selectedRecipe);
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
                        hitSlop={15}
                        onPress={() => {
                            setModalVisible(false);
                            setSelectedRecipe(null);
                        }}
                    >
                        <Text style={TextStyle.body}>X</Text>
                    </Pressable>

                    <View style={ViewStyle.scrollViewContent}>
                        <Text style={TextStyle.body}>{selectedRecipe ? selectedRecipe.name : ''}</Text>

                        <Text style={TextStyle.body}>{selectedRecipe ? selectedRecipe.instructions : ''}</Text>

                        <View>
                            <Text style={TextStyle.body}>Ingredients:</Text>
                            {selectedRecipe ? selectedRecipe.ingredients.map((ingredient, index) => (
                                <Text key={index} style={TextStyle.body}>
                                    {ingredient.name}: {ingredient.quantity}
                                </Text>
                            )) : ''}
                        </View>
                        {/* TODO: ADD MORE FIELDS TO SHOW BELOW LIKE COOKTIME, LIKES, IMAGE*/}
                    </View>
                    <Pressable
                        style={ButtonStyle.saveRecipe}
                        onPress={handleAddDiscoverRecipe}
                        >
                        <Text style={TextStyle.body}>Add</Text>
                    </Pressable>
                    {/* Pass addedRecipe to RecipeModal */}
                </View>
            </View>
        </Modal>
    );
};

export default DiscoverModal;
