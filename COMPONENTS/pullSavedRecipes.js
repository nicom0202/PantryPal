import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';

const pullSavedRecipes = (setRecipes) => {
  const recipesCollectionRef = collection(db, 'Users', auth.currentUser.email, 'Recipes');

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

