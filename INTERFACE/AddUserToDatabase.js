import {doc, setDoc } from "firebase/firestore"
import { db } from "../firebase";  // Import the initialized Firebase app


export default async function AddUserToDB(UserUID){
    console.log("Adding User: " + UserUID + " to database")
    // Creates a document for the user that is ready to store their recipes
    await setDoc(doc(db, "Users", UserUID), {});
}
