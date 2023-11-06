import { useState } from "react";
import { View } from 'react-native';
import CheckBox from "../../COMPONENTS/checkBox";
import { containerStyle } from '../../STYLES/styles.js';
import GetIngredients from "../../COMPONENTS/GetUserIngredients";
import { auth } from "../../firebase";

export default function GroceryList() {
    const [milk, setMilk] = useState(false);
    const [eggs, setEggs] = useState(false);
    const [bread, setBread] = useState(false);

    UserUID = auth.currentUser.email;
    ingredientsForUsers = GetIngredients(UserUID);
    // displayIngredients(ingredientsForUsers);


    const CheckboxList = ({ ingredientsForUsers }) => {
      const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (title) => {
      setCheckedItems({
        ...checkedItems,
        [title]: !checkedItems[title]
      });
    };
  };
    

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