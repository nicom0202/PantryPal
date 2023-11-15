import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";  // Import the initialized Firebase app

// The RecipeModalArray is an array of Recipes that the user has selected
const GetIngredients = async (RecipeModalArray) => {
  const ingredientsList = {};

  try {
    RecipeModalArray.forEach((recipeDoc) => {
      const ingredients = recipeDoc.ingredients;
      if (ingredients && Array.isArray(ingredients)) {
        ingredients.forEach((ingredient) => {
          // check if in the dictionary, if so add quantity, if not add to dictionary
          if (ingredient && ingredient.name && ingredient.quantity) {
            if (ingredientsList[ingredient.name]) {
              ingredientsList[ingredient.name] += Number(ingredient.quantity);
            } 
            else {
              ingredientsList[ingredient.name] = Number(ingredient.quantity);
            }
          }
        });
      }
    });

    return ingredientsList;
  } 
  catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

export default GetIngredients;

