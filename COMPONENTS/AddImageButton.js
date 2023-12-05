import { View, Text, SafeAreaView, TouchableOpacity, Image, Button } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync, deleteImage } from "../INTERFACE/ImageUtils";
import { ImageStyles } from "../STYLES/Styles";

const SimpleAddImageButton = ({ onImageSelected, currentImage, selectedRecipe }) => {
    const [image, setImage] = useState(currentImage || null);

    useEffect(() => {
        // Update the image state when the currentImage prop changes
        setImage(currentImage || null);
    }, [currentImage]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.2,
        });

        if (!result.canceled) {
            const uploadURL = await uploadImageAsync(result.assets[0].uri);
            selectedRecipe.image = uploadURL;
            console.log(uploadURL);
            setImage(uploadURL);
            onImageSelected(uploadURL);
        }
    };

    const handleDeleteImage = () => {
        try{
            if(image){
                deleteImage(image);
                selectedRecipe.image = "";
                setImage(null);
                onImageSelected(null);
            }
        } catch (error){
            console.error('Error in deleteImage:', error);
            throw error;
        }
    };

    return (
        <SafeAreaView style={ImageStyles.container}>
             <View style={ImageStyles.imageContainer}>
                {image ? (
                    <>
                        <SafeAreaView>
                            <Button title="Delete this image"
                                onPress={handleDeleteImage}
                            />
                        </SafeAreaView>
                        {image && (
                            <View style={{ width: '100%', height: '80%', borderRadius: 8, overflow: 'hidden' }}>
                                <Image source={{ uri: image }} style={ImageStyles.image} />
                            </View>
                        )}
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            onPress={pickImage}
                            style={ImageStyles.uploadButton}
                        >
                            <Text style={ImageStyles.uploadButtonText}>
                                Pick an image
                            </Text>
                        </TouchableOpacity>
                        <SafeAreaView>
                            <Button title="Delete this image"
                                    onPress={deleteImage}
                            />
                        </SafeAreaView>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default SimpleAddImageButton;
