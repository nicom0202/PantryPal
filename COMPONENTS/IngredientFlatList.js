import React, { useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';

const IngredientFlatList = ({ recipes, selectedRecipe, setRecipes }) => {
  const [localNames, setLocalNames] = useState(selectedRecipe.ingredients.map(ingredient => ingredient.name));
  const [localQuantities, setLocalQuantities] = useState(selectedRecipe.ingredients.map(ingredient => ingredient.quantity));

  const handleIngredientChange = (index, newName, newQuantity) => {
    // Create copies of the local state arrays
    const updatedNames = [...localNames];
    const updatedQuantities = [...localQuantities];

    // Update the values at the specified index
    updatedNames[index] = newName;
    updatedQuantities[index] = newQuantity;

    // Update the selected recipe's ingredients
    selectedRecipe.ingredients[index].name = newName;
    selectedRecipe.ingredients[index].quantity = newQuantity;

    // Create a copy of the recipes array and update the selected recipe's ingredients
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === selectedRecipe.id ? { ...recipe, ingredients: selectedRecipe.ingredients } : recipe
    );

    // Update the recipes list using setRecipes
    setRecipes(updatedRecipes);

    // Update the local state
    setLocalNames(updatedNames);
    setLocalQuantities(updatedQuantities);
  };

  const renderIngredientItem = ({ item, index }) => {
    return (
      <View key={index}>
        <TextInput
          value={localNames[index]}
          onChangeText={(newName) => setLocalNames([...localNames.slice(0, index), newName, ...localNames.slice(index + 1)])}
          onBlur={() => handleIngredientChange(index, localNames[index], localQuantities[index])}
          placeholder="Ingredient Name"
          placeholderTextColor="grey"
          keyboardType="default"
        />
        <TextInput
          value={localQuantities[index]}
          onChangeText={(newQuantity) => setLocalQuantities([...localQuantities.slice(0, index), newQuantity, ...localQuantities.slice(index + 1)])}
          onBlur={() => handleIngredientChange(index, localNames[index], localQuantities[index])}
          placeholder="Quantity"
          placeholderTextColor="grey"
          keyboardType="numeric"
        />
        {/* Add any additional fields for units or other ingredient properties */}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={selectedRecipe.ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderIngredientItem}
      />
      {/* Add other components or UI elements here */}
    </View>
  );
};

export default IngredientFlatList;
