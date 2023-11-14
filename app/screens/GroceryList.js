import { useState, useEffect } from "react";
import { View } from 'react-native';
import CheckBox from "../../COMPONENTS/checkBox";
import { containerStyle } from '../../STYLES/styles.js';
import GetIngredients from "../../COMPONENTS/GetUserIngredients";
import { auth } from "../../firebase";

export default function GroceryList() {
  const [ingredientsForUsers, setIngredientsForUsers] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const UserUID = auth.currentUser.email;
        const ingredients = await GetIngredients(UserUID);
        console.log(ingredients);
        setIngredientsForUsers(ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients({
      ...selectedIngredients,
      [ingredient]: !selectedIngredients[ingredient],
    });
  };

  return (
    <View style={containerStyle.container}>
      {ingredientsForUsers.map((ingredient, index) => (
        <CheckBox
          key={index}
          onPress={() => handleCheckboxChange(ingredient)}
          title={ingredient}
          isChecked={selectedIngredients[ingredient] || false}
        />
      ))}
    </View>
  );
}