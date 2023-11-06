import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";  // Import the initialized Firebase app

const GetIngredients = async (UserID) => {
  const recipesCollectionRef = collection(db, "Users", UserID, "Recipes");
  const ingredientsList = [];

  try {
    const recipesQuerySnapshot = await getDocs(query(recipesCollectionRef));

    recipesQuerySnapshot.forEach((recipeDoc) => {
      console.log(recipeDoc.data());
      const ingredients = recipeDoc.data().ingredients;
      if (ingredients && Array.isArray(ingredients)) {
        ingredients.forEach((ingredient) => {
          if (ingredient && ingredient.name) {
            ingredientsList.push(ingredient.name);
          }
        });
      }
    });

    return ingredientsList;
  } 
  
  catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

export default GetIngredients;



// export default async function GetIngredients(UserID){
//   console.log("successfully ran");
//   const recipesCollectionRef = collection(db, "Users", UserID, "Recipes");

//   const grabIngredients = async () => {
//       let ingredientsList = []
//       const recipesQuery = query(recipesCollectionRef);
//       const recipesQuerySnapshot = await getDocs(recipesQuery);
//       const recipesDocs = recipesQuerySnapshot.docs;

//       // iterate through each document in recipesDocs and extract the ingredients from the ingredients field
//       for (i=0; i<recipesDocs.length; i++){
//         // need to get the ingredients field from each recipe
//           const { ingredients } = recipesDocs[i].data().ingredients;
//           for (j=0; j<ingredients.length; j++){
//             ingredientsList = ingredientsList.concat(ingredients[j].name);
//           }
//       }
//       return ingredientsList;
//     }
//   let allIngredients = grabIngredients();
//   return allIngredients;
// };
