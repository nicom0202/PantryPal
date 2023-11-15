import {doc, setDoc, getDoc} from "firebase/firestore"
import { db } from "../firebase";  // Import the initialized Firebase app


export default async function AddUserToDB(UserUID){
    await setDoc(doc(db, "Users", UserUID), {
        recipes: [],
    });
}
