import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

const deleteRecipe = async (recipeData) => {
    try {
        if (!recipeData || !recipeData.databaseDocID) {
            console.error("Recipe data or document ID is missing.");
            return;
        }

        const userDocRef = doc(db, "Users", auth.currentUser.email, "Recipes",  recipeData.databaseDocID);

        // Delete the specific recipe document
        await deleteDoc(userDocRef);

        console.log(`Recipe doc '${recipeData.name}' removed from the User/Recipe collection.`);
    } catch (error) {
        console.error("Error deleting recipe from the 'currentUser' document: ", error);
    }
};

export default deleteRecipe;
