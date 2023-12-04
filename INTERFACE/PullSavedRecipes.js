import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  USER_COLLECTION_NAME,
  RECIPES_COLLECTION_NAME
} from "./CONSTANTS_FIREBASE";

const pullSavedRecipes = (setRecipes) => {
  const recipesCollectionRef = collection(db, USER_COLLECTION_NAME, auth.currentUser.email, RECIPES_COLLECTION_NAME);

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

