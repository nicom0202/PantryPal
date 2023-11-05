import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, Pressable } from 'react-native';

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

  const addIngredient = () => {
    // Add a new ingredient with empty name and quantity
    const newIngredient = { name: '', quantity: '' };

    // Update the selected recipe's ingredients
    selectedRecipe.ingredients = [...selectedRecipe.ingredients, newIngredient];

    // Create a copy of the recipes array and update the selected recipe's ingredients
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === selectedRecipe.id ? { ...recipe, ingredients: selectedRecipe.ingredients } : recipe
    );

    // Update the recipes list using setRecipes
    setRecipes(updatedRecipes);

    // Update the local state
    setLocalNames([...localNames, '']);
    setLocalQuantities([...localQuantities, '']);
  };

  const renderIngredientItem = ({ item, index }) => {
    const handleDeleteIngredient = () => {
        // Create a copy of the selected recipe's ingredients and remove the ingredient at the specified index
        const updatedIngredients = [...selectedRecipe.ingredients];
        updatedIngredients.splice(index, 1);


        // Update the selected recipe's ingredients
        selectedRecipe.ingredients = updatedIngredients;

        // Update the recipes list using setRecipes
        const updatedRecipes = recipes.map((recipe) =>
            recipe.id === selectedRecipe.id ? selectedRecipe : recipe
        );
        setRecipes(updatedRecipes);
    };

    return (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
                style={styles.ingredientItem}
                value={item.name}
                onChangeText={(newName) => handleIngredientChange(index, newName, item.quantity)}
                placeholder="Ingredient Name"
                placeholderTextColor="grey"
            />
            <TextInput
                style={styles.ingredientItem}
                value={item.quantity}
                onChangeText={(newQuantity) => handleIngredientChange(index, item.name, newQuantity)}
                placeholder="Quantity"
                placeholderTextColor="grey"
                keyboardType="numeric"
            />
            <Pressable onPress={handleDeleteIngredient}>
                <Text>Delete</Text>
            </Pressable>
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
      <Button title="Add Ingredient" onPress={addIngredient} />
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ingredientItem: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
});

export default IngredientFlatList;
