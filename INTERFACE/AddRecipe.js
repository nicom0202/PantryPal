import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import {
    DISCOVER_COLLECTION_NAME,
    USER_COLLECTION_NAME,
    RECIPES_COLLECTION_NAME
} from "./CONSTANTS_FIREBASE";

const getUserRecipesRef = (userDocRef) => collection(userDocRef, RECIPES_COLLECTION_NAME);
const getUserDocRef = () => doc(db, USER_COLLECTION_NAME, auth.currentUser.email);
const getDiscoverCollectionRef = () => collection(db, DISCOVER_COLLECTION_NAME);

const addOrUpdateRecipe = async (recipeData, docRef, isDiscoverCollection) => {
    try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const recipesRef = isDiscoverCollection
                ? getDiscoverCollectionRef()
                : getUserRecipesRef(docRef);

            const recipeDocRef = recipeData.id
                ? doc(recipesRef, recipeData.id)
                : await setDoc(recipesRef, recipeData);

            await setDoc(recipeDocRef, recipeData);
            console.log(
                `Recipe ${recipeData.id ? 'updated' : 'added'} in the ${isDiscoverCollection ? 'Discover' : "user's 'Recipes'"} collection.`
            );
        } else {
            if (!isDiscoverCollection) {
                await setDoc(docRef, /* Add user details if needed */ {});
            }

            const recipesRef = isDiscoverCollection
                ? getDiscoverCollectionRef()
                : getUserRecipesRef(docRef);

            const recipeDocRef = await setDoc(
                doc(recipesRef, recipeData.id || recipeData.discoverID),
                recipeData
            );

            console.log(
                `New ${isDiscoverCollection ? 'Discover' : "user"} document ${recipeData.id ? 'created with the recipe' : 'added to the collection'} in '${isDiscoverCollection ? 'Discover' : "Recipes'"}' subcollection with ${recipeData.id ? 'custom document name.' : 'custom document name.'}`
            );
        }
    } catch (error) {
        console.error("Error adding or updating recipe: ", error);
    }
};

const addRecipe = async (recipeData, addTo) => {
    try {
        if (!recipeData || !recipeData.id) {
            console.error("No recipe id");
            return;
        }

        const isDiscoverCollection = addTo === DISCOVER_COLLECTION_NAME;
        const docRef = isDiscoverCollection ? doc(getDiscoverCollectionRef(), recipeData.id) : getUserDocRef();

        await addOrUpdateRecipe(recipeData, docRef, isDiscoverCollection);
    } catch (error) {
        console.error("Error adding or updating recipe: ", error);
    }
};

export default addRecipe;
