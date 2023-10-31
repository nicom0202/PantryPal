import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";  // Import the initialized Firebase app


export default async function GetRecipes(RecipeArray){
    const usersCollection = firestore().collection('users');
    const traverser = createTraverser(usersCollection);
    ingredientsList = []
    for (i=0; i<RecipeArray.length; i++){
        // for each recipe name go into "Recipe" collection and go into the document with that name, then concatenate the "ingredients" field to the ingredientsList
        const recipeDocRef = doc(db, 'Recipes', RecipeArray[i]);
        getDoc(recipeDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const { ingredients } = docSnapshot.data();
              ingredientsList = ingredientsList.concat(ingredients);
              console.log('Ingredients:', ingredients);
            } else {
              console.log('DNE');
            }
          })
          .catch((error) => {
            console.error('Error', error);
          });
    }
    return ingredientsList;
}
