import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";

const addRecipeToRecipeCollection = async (recipeData) => {
    try {
        const recipesCollectionRef = collection(db, "Recipes");

        // Add a new document to the "Recipes" collection
        await setDoc(doc(recipesCollectionRef, recipeData.name), {
            title: recipeData.name, // 'title' field filled with 'name' from recipeData
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            // You can add more fields if needed
        });

        console.log("Recipe added to the 'Recipes' collection.");
    } catch (error) {
        console.error("Error adding recipe to the 'Recipes' collection: ", error);
    }
};

// Example recipe data
// const recipeData = {
//     name: "Spaghetti Carbonara",
//     ingredients_name(strings): [
//         "200g spaghetti",
//         "100g pancetta or guanciale",
//         "2 large eggs",
//         "50g Pecorino Romano cheese",
//         "Black pepper",
//         "Salt"
//     ],
//      ingredi
//     instructions: "1. Boil spaghetti until al dente. \n2. In a separate pan, cook pancetta until crispy. \n3. In a bowl, mix eggs, cheese, and black pepper. \n4. Drain spaghetti and mix with the egg mixture and pancetta. \n5. Serve immediately with extra cheese and black pepper on top."
//     // You can add more fields if needed
// };

export default addRecipeToRecipeCollection;
