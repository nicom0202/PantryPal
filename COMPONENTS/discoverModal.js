import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, } from 'react-native';
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
}) => {
    

    const handleAddDiscoverRecipe = () => {
       selectedRecipe.id = uuidv4();
       selectedRecipe.discoverID = Math.random();
       addRecipe(selectedRecipe, "discover");
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
                        {/* TODO: ADD MORE FIELDS LIKE COOKTIME, LIKES, IMAGE*/}
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
                </View>
            </View>
        </Modal>
    );
};

export default DiscoverModal;
