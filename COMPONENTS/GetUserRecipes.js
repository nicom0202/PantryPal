import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";  // Import the initialized Firebase app


export default async function GetRecipes(UserUID){
    // Get the User's recipes
    const ref = doc(db, "Users", UserUID);
    const docSnap = await getDoc(ref);
    RecipeIDArray = [];
    if (docSnap.exists()) {
        RecipeIDArray = docSnap.get("recipes");
    } else {
        console.log("No such document!");
    }
    // Lookup the User's recipes in the database and retrieve them.
    RecipeArray = [];
    for (i=0; i<RecipeIDArray.length;i++){
        const RecipeRef = doc(db, "Recipes", RecipeIDArray[i]);
        const RecipeDocSnap = await getDoc(RecipeRef);
        if (RecipeDocSnap.exists()) {
            RecipeArray[i] = RecipedocSnap.id.toString();
        } else {
            console.log("No such document!");
        }
    }
    return RecipeArray;
}

