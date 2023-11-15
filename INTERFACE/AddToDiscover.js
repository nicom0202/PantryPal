import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";

const addToDiscover = async (recipeData) => {
    try {
        const recipesCollectionRef = collection(db, "Discover");

        // Add a new document to the "Recipes" collection
        await setDoc(doc(recipesCollectionRef, recipeData.id), recipeData);

        console.log("Recipe added to the 'Discover' collection.");
    } catch (error) {
        console.error("Error adding recipe to the 'Discover' collection: ", error);
    }
};

export default addToDiscover;
