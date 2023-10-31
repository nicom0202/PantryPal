import { doc, updateDoc, arrayRemove } from "firebase/firestore"; 
import { db } from "../firebase";
import { auth } from "../firebase";

const deleteRecipeFromUserCollection = async (recipeTitle) => {
    try {
        const userDocRef = doc(db, "Users", auth.currentUser.email); // Reference to the currentUser document

        // Update the document by removing the specified recipe from the 'recipes' array field
        await updateDoc(userDocRef, {
            recipes: arrayRemove(recipeTitle)
        });

        console.log(`Recipe '${recipeTitle}' removed from the 'recipes' array in the 'currentUser' document.`);
    } catch (error) {
        console.error("Error deleting recipe from the 'currentUser' document: ", error);
    }
};

// Example usage:
//const recipeTitleToDelete = "Spaghetti Carbonara"; // Replace this with the title of the recipe to dele
deleteRecipeFromUserCollection(recipeTitleToDelete);
