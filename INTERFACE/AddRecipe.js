import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import {
    DISCOVER_COLLECTION_NAME,
    USER_COLLECTION_NAME,
    RECIPES_COLLECTION_NAME
} from "./CONSTANTS_FIREBASE";

// Function to get a reference to the user's recipes collection
const getUserRecipesRef = (userDocRef) => collection(userDocRef, RECIPES_COLLECTION_NAME);

// Function to get a reference to the user's document in the database
const getUserDocRef = () => doc(db, USER_COLLECTION_NAME, auth.currentUser.email);

// Function to get a reference to the Discover collection in the database
const getDiscoverCollectionRef = () => collection(db, DISCOVER_COLLECTION_NAME);

// Main function for adding or updating a recipe in the database
const addOrUpdateRecipe = async (recipeData, docRef, isDiscoverCollection) => {
    try {
        // Check if the user document exists in the database
        const docSnapshot = await getDoc(docRef);

        // If the user document exists, get the reference to the appropriate recipes collection
        if (docSnapshot.exists()) {
            const recipesRef = isDiscoverCollection
                ? getDiscoverCollectionRef()
                : getUserRecipesRef(docRef);

            // Determine the recipe document reference based on whether it already has an ID
            const recipeDocRef = recipeData.id
                ? doc(recipesRef, recipeData.id)
                : await setDoc(recipesRef, recipeData);

            // Update or add the recipe document in the database
            await setDoc(recipeDocRef, recipeData);
            console.log(
                `Recipe ${recipeData.id ? 'updated' : 'added'} in the`, 
                `${isDiscoverCollection ? 'Discover' : "user's 'Recipes'"} collection.`
            );
        } else {
            // If the user document does not exist, create it and add the recipe
            if (!isDiscoverCollection) {
                await setDoc(docRef, /* Add user details if needed */ {});
            }

            // Get the reference to the appropriate recipes collection
            const recipesRef = isDiscoverCollection
                ? getDiscoverCollectionRef()
                : getUserRecipesRef(docRef);

            // Determine the recipe document reference based on whether it already has an ID
            const recipeDocRef = await setDoc(
                doc(recipesRef, recipeData.id || recipeData.discoverID),
                recipeData
            );

            console.log(
                `New ${isDiscoverCollection ? 'Discover' : "user"} document`, 
                `${recipeData.id ? 'created with the recipe' : 'added to the collection'}`, 
                `in '${isDiscoverCollection ? 'Discover' : "Recipes'"}'`, 
                `subcollection with ${recipeData.id ? 'custom document name.' : 'custom document name.'}`
            );
        }
    } catch (error) {
        console.error("Error adding or updating recipe: ", error);
    }
};

// Function for adding a recipe to either the User's collection or the Discover collection
const addRecipe = async (recipeData, addTo) => {
    try {
        // Check if the recipeData or its ID is missing
        if (!recipeData || !recipeData.id) {
            console.error("No recipe id");
            return;
        }

        // Determine whether to add the recipe to the Discover collection
        const isDiscoverCollection = addTo === DISCOVER_COLLECTION_NAME;
        // Get the document reference based on the collection
        const docRef = isDiscoverCollection ? doc(getDiscoverCollectionRef(), recipeData.id) : getUserDocRef();

        // Call the main function to add or update the recipe in the database
        await addOrUpdateRecipe(recipeData, docRef, isDiscoverCollection);
    } catch (error) {
        console.error("Error adding or updating recipe: ", error);
    }
};

export default addRecipe;
