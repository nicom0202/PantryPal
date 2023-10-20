import { View, Text, Modal, Pressable, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import { gridStyle, viewStyle, buttonStyle, textStyle } from '../../STYLES/styles.js';
import { StyleSheet } from 'react-native';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [savedRecipeName, setSavedRecipeName] = useState(''); // State to store the saved recipe name

  const handleBoxClick = () => {
    // Handle the click action here
    alert('Box clicked!');
  };

  const handleSave = () => {
    // Update the state with the new recipe name
    setSavedRecipeName(recipeName);

    // Close the modal
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[gridStyle.grid]}>
        <ClickableBox content="Recipe 1" onClick={handleBoxClick} />
        <ClickableBox content="Recipe 2" onClick={handleBoxClick} />
        <ClickableBox content={require('./chicken.jpeg')} onClick={handleBoxClick} />
      </View>
      <View style={[gridStyle.grid]}>
        <View>
          {/* Modal popout for each individual recipe */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={viewStyle.centeredView}>
              <View style={viewStyle.modalView}>
                <Pressable
                  style={[buttonStyle.open, buttonStyle.close]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={textStyle.body}>X</Text>
                </Pressable>
                <TextInput
                  style={textInputStyle.input}
                  placeholder="Enter recipe name"
                  onChangeText={(text) => setRecipeName(text)}
                  value={recipeName}
                />
                <Button title="Save" onPress={handleSave} />
              </View>
            </View>
          </Modal>

          {/* Conditional rendering to display the saved recipe name */}
          {savedRecipeName ? (
            <ClickableBox content={savedRecipeName} onClick={() => setModalVisible(true)} />
          ) : (
            <ClickableBox content="Recipe 1" onClick={() => setModalVisible(true)} />
          )}

          <ClickableBox content={require('./chicken.jpeg')} onClick={() => setModalVisible(true)} />
          {/* You can add more boxes here, need to figure out how to store images */}
        </View>
      </View>
    </View>
  );
};

const textInputStyle = StyleSheet.create({
    container: {
        marginBottom: 20, // Adjust this value to control the vertical position
      },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 10,
    },
});

export default Home;
