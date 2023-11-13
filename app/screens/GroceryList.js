import { useState, useEffect } from "react";
import { View } from 'react-native';
import CheckBox from "../../COMPONENTS/checkBox";
import { containerStyle } from '../../STYLES/styles.js';
import GetIngredients from "../../COMPONENTS/GetUserIngredients";

export default function GroceryList() {
  const [ingredientsForUsers, setIngredientsForUsers] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState({});
  // Temporary array of selected recipes until we can get the selected recipes from the RecipeBook
  const selectedRecipes = 
  [{cooktime: 0, id: "a129164c-e065-4eb9-aee6-d4e1c71f38b6", ingredients: [{name: "rice", quantity: 2}], instructions: "", name: "A"}, 
  {cooktime: 0, id: "11adcb03-a187-460f-848f-d8f59d8c09c3", ingredients: [{name: "rice", quantity: 1}, {name: "water", quantity: "2"}], instructions: "", name: "P"}]

  useEffect(() => {
    const fetchData = async () => {
      try {        
        RecipeModalArray = selectedRecipes;
        // Ingredients is a dictionary mapping of the ingredient name to the quantity from selected recipes
        const ingredients = await GetIngredients(RecipeModalArray);
        // console.log("\n\n\nIngredients:", ingredients);
        setIngredientsForUsers(ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients({
      ...selectedIngredients,
      [ingredient]: !selectedIngredients[ingredient],
    });
  };

  return (
    <View style={containerStyle.container}>
      {Object.entries(ingredientsForUsers).map(([ingredient, quantity], index) => (
        // console.log("Ingredient:", ingredientsForUsers),
        <CheckBox
          key={index}
          onPress={() => handleCheckboxChange(ingredient)}
          title={`${ingredient} - ${quantity} cup(s)`} // Displaying name and quantity
          isChecked={selectedIngredients[ingredient] || false}
        />
      ))}
    </View>
  );
}
