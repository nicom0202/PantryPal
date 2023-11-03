import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

const addRecipe = async (recipeData) => {
    try {
        if (!recipeData || !recipeData.name || !recipeData.ingredients || !recipeData.instructions) {
            console.error("Recipe data is incomplete or undefined.");
            return;
        }

        const userDocRef = doc(db, "Users", auth.currentUser.email);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userRecipesRef = collection(userDocRef, "Recipes");

            if (recipeData.databaseDocID) {
                const userRecipesDocRef = doc(userDocRef, "Recipes", recipeData.databaseDocID);

                // Update the existing document in the Recipes subcollection
                await setDoc(userRecipesDocRef, {
                    title: recipeData.name,
                    ingredients: recipeData.ingredients,
                    instructions: recipeData.instructions,
                    databaseDocID: recipeData.databaseDocID,
                    // Add more fields if needed
                });

                console.log("Recipe updated in the user's 'Recipes' subcollection.");
            } else {
                // Add a new recipe to the Recipes subcollection
                const newRecipeData = {
                    title: recipeData.name,
                    ingredients: recipeData.ingredients,
                    instructions: recipeData.instructions,
                    databaseDocID: recipeData.databaseDocID,
                    // Add more fields if needed
                };

                const newRecipeDocRef = await addDoc(userRecipesRef, newRecipeData);

                console.log("New recipe added to the user's 'Recipes' subcollection.");
                recipeData.databaseDocID = newRecipeDocRef.id; // Assign the document ID
            }
        } else {
            // If the user document doesn't exist, create a new user document with the recipe in Recipes subcollection
            const userDocData = {
                // Add user details if needed
            };

            await setDoc(userDocRef, userDocData);

            const userRecipesRef = collection(userDocRef, "Recipes");
            const newRecipeData = {
                title: recipeData.name,
                ingredients: recipeData.ingredients,
                instructions: recipeData.instructions,
                databaseDocID: recipeData.databaseDocID,
                // Add more fields if needed
            };

            const newRecipeDocRef = await addDoc(userRecipesRef, newRecipeData);

            console.log("New user document created with the recipe in 'Recipes' subcollection.");
            recipeData.databaseDocID = newRecipeDocRef.id; // Assign the document ID
        }
    } catch (error) {
        console.error("Error adding or updating recipe in the user's 'Recipes' subcollection: ", error);
    }
};

export default addRecipe;




//NEED TO UPDATE RecipeBook.js:

/* Add a recipe with unique ID, open the modal for the newly added recipe */
// const handleAddRecipe = () => {
//     const uniqueId = uuidv4();
//     const newRecipe = { id: uniqueId, name: "", ingredients: [{ name: "", quantity: "" }], instructions: "", databaseDocID: uniqueId,};
//     const updatedRecipes = [...recipes, newRecipe];
//     setRecipes(updatedRecipes);
//     handleRecipeInteraction(newRecipe);
//     setIsEditing(true);
// };



//NEED TO UPDATE recipeModal.js:

// const saveEditing = () => {
//     if (selectedRecipe) {
//         /* Find the index of the selected recipe */
//         const recipeIndex = recipes.findIndex(recipe => recipe.id === selectedRecipe.id);
//         if (recipeIndex !== -1) {
//             /* Create a copy of the recipes array and update the name of the selected recipe */
//             const updatedRecipes = [...recipes];
//             updatedRecipes[recipeIndex].name = selectedRecipe.name || "Recipe";
//             //updatedRecipes[recipeIndex].databaseDocID = selectedRecipe.id;
//             setRecipes(updatedRecipes);
//             addRecipe(updatedRecipes[recipeIndex]);
//             //addRecipeNameToUserCollection(updatedRecipes[recipeIndex])
//             //addRecipeToRecipeCollection(updatedRecipes[recipeIndex])
//         }
        
//         setIsEditing(false);
//     }
// };

//     const removeRecipe = () => {
//         if (selectedRecipe) {
//             const updatedRecipes = recipes.filter(recipe => recipe.id !== selectedRecipe.id);
//             deleteRecipe(selectedRecipe)
//             //deleteRecipeFromUserCollection(selectedRecipe)
//             setRecipes(updatedRecipes);
//             setModalVisible(false);
//             setSelectedRecipe(null);
//             setIsEditing(false);
//         }
//     };
