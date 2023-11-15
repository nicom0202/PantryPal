import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";  // Import the initialized Firebase app

const GetIngredients = async (UserID) => {
  const recipesCollectionRef = collection(db, "Users", UserID, "Recipes");
  const ingredientsList = [];

  try {
    const recipesQuerySnapshot = await getDocs(query(recipesCollectionRef));

    recipesQuerySnapshot.forEach((recipeDoc) => {
      console.log(recipeDoc.data());
      const ingredients = recipeDoc.data().ingredients;
      if (ingredients && Array.isArray(ingredients)) {
        ingredients.forEach((ingredient) => {
          if (ingredient && ingredient.name) {
            ingredientsList.push(ingredient.name);
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

