import { useState, useEffect } from "react";
import { View, Text, Pressable } from 'react-native';
import { auth } from "../../firebase";
import CheckBox from "../../COMPONENTS/CheckBox.js";
import GetIngredients from "../../INTERFACE/GetUserIngredients";
import { containerStyle } from '../../STYLES/styles.js';

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


  // TEMPORARY: Only changes list for current session
  // TODO: Implement persistent storage
  const handleClearList = () => {
    setIngredientsForUsers([]);
    setSelectedIngredients({});
  }

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients({
      ...selectedIngredients,
      [ingredient]: !selectedIngredients[ingredient],
    });
  };

  return (
    <View style={containerStyle.container}>
      {/* Clear Button */}
      <Pressable onPress={handleClearList}>
        <Text> Clear</Text>
      </Pressable>

      {/* Checkbox List*/}
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