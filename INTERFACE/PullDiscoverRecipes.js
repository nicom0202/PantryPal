import { db } from "../firebase";
import { collection, query, where, limit, getDocs } from 'firebase/firestore';

async function getTenRandomRecipes(setRecipes) {
  const randomRecipes = [];
  const num_of_discover_recipes = 3

  // Fetch 10 random documents by using a random field (here, 'discoverID')
  const q = query(collection(db, 'Discover'), where('discoverID', '>=', Math.random()), limit(num_of_discover_recipes)); //
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    const { name, ingredients, instructions, cookTime, discoverID } = doc.data();
    const newRecipe = {
      id: doc.id,
      name: name || "",
      ingredients: ingredients || [{ name: "", quantity: "" }],
      instructions: instructions || "",
      cookTime: cookTime || 0,
      discoverID: discoverID || 0
    };
    randomRecipes.push(newRecipe);
  });

  console.log(randomRecipes);
  setRecipes(randomRecipes)
}

export default getTenRandomRecipes;
