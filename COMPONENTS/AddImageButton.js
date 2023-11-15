import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uploadImage from './uploadImage';
import { buttonStyle } from '../STYLES/styles.js';

const AddImageButton = () => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    // Ask for permission to access the camera roll
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access media library was denied');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });
  
    if (!result.canceled) {
      // Access the image URI through the 'assets' array
      const uri = result.assets && result.assets.length > 0 ? result.assets[0].uri : null;
      
      if (uri) {
        setImageUri(uri);
        uploadImage(uri);
      }
    }
  };
  
  return (
    <TouchableOpacity
      style={buttonStyle.sendRecipeToDiscover}
      onPress={pickImage}
    >
      <Text>Pick Image</Text>
      {/* Optionally, display the picked image */}
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
    </TouchableOpacity>
  );
};

export default AddImageButton;

