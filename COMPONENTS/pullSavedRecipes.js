import { db } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';

const pullSavedRecipes = (userId, setRecipes) => {
  const recipesCollectionRef = collection(db, 'Users', userId, 'Recipes');

  // Creating a query to get the documents
  const q = query(recipesCollectionRef);

  getDocs(q)
    .then((querySnapshot) => {
      const fetchedRecipes = [];
      querySnapshot.forEach((doc) => {
        fetchedRecipes.push(doc.data());
      });
      setRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes]);
    })
    .catch((error) => {
      console.error('Error getting documents: ', error);
    });
};

export default pullSavedRecipes;



//--------add this in RecipeBook -----------

//const RecipeBook = () => {
    // current code....

    //--------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------
    //---------------NEW FOR PULLING RECIPES FROM DATABASE ON LOGIN--------------
    //--------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------


    // useEffect(() => {
    //     const userId = auth.currentUser.email; // Replace with the actual user ID
    //     console.log(userId);
    
    //     // Call the function from the separate file to fetch recipes
    //     pullSavedRecipes(userId, setRecipes);
    //   }, []); // Run this effect only once on mount


    //--------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------


    // /* toggle the state of the modal when a recipe is clicked */
    // const handleRecipeInteraction = (recipe) => {
    //     setModalVisible(true);
    //     setSelectedRecipe(recipe);
    // };

    // rest of code....