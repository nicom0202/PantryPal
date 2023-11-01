import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { auth } from "../firebase";

const addRecipe = async (userId, recipeData) => {
    try {
        if (!recipeData || !recipeData.name || !recipeData.ingredients || !recipeData.instructions) {
            console.error("Recipe data is incomplete or undefined.");
            return;
        }

        const userDocRef = doc(db, "Users", userId);
        const recipesCollectionRef = collection(userDocRef, "Recipes");

        // Add a new document to the "Recipes" subcollection within the user's document
        await setDoc(doc(recipesCollectionRef, recipeData.name), {
            title: recipeData.name, // 'title' field filled with 'name' from recipeData
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            // You can add more fields if needed
        });

        console.log("Recipe added to the user's 'Recipes' subcollection.");
    } catch (error) {
        console.error("Error adding recipe to the user's 'Recipes' subcollection: ", error);
    }
};

export default addRecipe

// Example usage:
// const userId = "user123"; // Replace with the actual user ID
// const recipeData = {
//     name: "Spaghetti Carbonara",
//     ingredients: [
//         "200g spaghetti",
//         "100g pancetta or guanciale",
//         // ... other ingredients
//     ],
//     instructions: "1. Boil spaghetti until al dente. \n2. In a separate pan, cook pancetta until crispy. \n3. In a bowl, mix eggs, cheese, and black pepper. \n4. Drain spaghetti and mix with the egg mixture and pancetta. \n5. Serve immediately with extra cheese and black pepper on top."
//     // You can add more fields if needed
// };

// addRecipeToUser(userId, recipeData);
