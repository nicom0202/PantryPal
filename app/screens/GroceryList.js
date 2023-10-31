import { useState } from "react";
import { View } from 'react-native';
import CheckBox from "../../COMPONENTS/checkBox";
import { containerStyle } from '../../STYLES/styles.js';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { createTraverser } from 'firewalk';

export default function GroceryList() {
    // insert logic for generating list items here eventually
    // temporary list for testing
    const [milk, setMilk] = useState(false);
    const [eggs, setEggs] = useState(false);
    const [bread, setBread] = useState(false);

  



// third parameter needs to be pulled from the list of documents in "Recipes" collection
    const recipeDocRef = doc(db, 'Recipes', 'cheeseburgers');
    // const recipeDocRef = doc(db, 'Recipes', 'cheeseburgers');
    getDoc(recipeDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const { ingredients } = docSnapshot.data();
          console.log('Ingredients:', ingredients);
        } else {
          console.log('DNE');
        }
      })
      .catch((error) => {
        console.error('Error', error);
      });

    
    return (
        <View style={containerStyle.container}>
            {/* again, eventually change to function for dynamic updating */}

            <CheckBox
                onPress={ () => setMilk(!milk) }
                title="Milk"
                isChecked={milk}
            />
            <CheckBox
                onPress={ () => setEggs(!eggs) }
                title="Eggs"
                isChecked={eggs}
            />
            <CheckBox
                onPress={ () => setBread(!bread) }
                title="Bread"
                isChecked={bread}
            />
        </View>
    );
}