import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const addRecipe = async (recipeData) => {
    try {
        if (!recipeData || !recipeData.id) {
            console.error("No recipe id");
            return;
        }

        const userDocRef = doc(db, "Users", auth.currentUser.email);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userRecipesRef = collection(userDocRef, "Recipes");

            if (recipeData.id) {
                const userRecipesDocRef = doc(userRecipesRef, recipeData.id);

                // Update the existing document in the Recipes subcollection
                await setDoc(userRecipesDocRef, recipeData);

                console.log("Recipe updated in the user's 'Recipes' subcollection.");
            } else {
                // Add a new recipe to the Recipes subcollection with recipeData.id as document name
                const newRecipeDocRef = await setDoc(doc(userRecipesRef, recipeData.id), recipeData);

                console.log("New recipe added to the user's 'Recipes' subcollection with custom document name.");
            }
        } else {
            // If the user document doesn't exist, create a new user document with the recipe in Recipes subcollection
            const userDocData = {
                // Add user details if needed
            };

            await setDoc(userDocRef, userDocData);

            const userRecipesRef = collection(userDocRef, "Recipes");
            const newRecipeDocRef = await setDoc(doc(userRecipesRef, recipeData.id), recipeData);

            console.log("New user document created with the recipe in 'Recipes' subcollection with custom document name.");
        }
    } catch (error) {
        console.error("Error adding or updating recipe in the user's 'Recipes' subcollection: ", error);
    }
};

export default addRecipe;
