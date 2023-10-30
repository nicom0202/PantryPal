import { doc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { db } from "../firebase";
import { auth } from "../firebase";


// Example recipe data
// const recipeData = {
//     title: "Spaghetti Carbonara",
//     ingredients: [
//         "200g spaghetti",
//         "100g pancetta or guanciale",
//         "2 large eggs",
//         "50g Pecorino Romano cheese",
//         "Black pepper",
//         "Salt"
//     ],
//     instructions: "1. Boil spaghetti until al dente. \n2. In a separate pan, cook pancetta until crispy. \n3. In a bowl, mix eggs, cheese, and black pepper. \n4. Drain spaghetti and mix with the egg mixture and pancetta. \n5. Serve immediately with extra cheese and black pepper on top."
//     // You can add more fields if needed
// };

const addRecipeNameToUserCollection = async (recipeData) => {
    try {
        const userDocRef = doc(db, "Users", auth.currentUser.email); // Reference to the currentUser document

        // Update the document by adding a new recipe to the 'recipes' array field
        await updateDoc(userDocRef, {
            recipes: arrayUnion(recipeData.title)
        });

        console.log("Recipe added to the 'recipes' array in the 'currentUser' document.");
    } catch (error) {
        console.error("Error adding recipe to the 'currentUser' document: ", error);
    }
};

addRecipeNameToUserCollection(recipeData);
