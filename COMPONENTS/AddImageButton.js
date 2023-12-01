import { View, Text, SafeAreaView, TouchableOpacity, Image, Button } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync, deleteImage } from "../INTERFACE/ImageUtils";

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
        deleteImage(image);
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <View
                style={{
                    paddingHorizontal: 6,
                    width: '100%',
                    height: 200
                }}
            >
                {image ? (
                    <>
                        <SafeAreaView>
                            <Button title="Delete this image"
                                onPress={handleDeleteImage}
                            />
                        </SafeAreaView>
                        {image && (
                            <View style={{ width: '100%', height: '80%', borderRadius: 8, overflow: 'hidden' }}>
                                <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                            </View>
                        )}
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{
                                width: '100%',
                                height: 90,
                                borderStyle: 'dashed',
                                borderWidth: 2,
                                borderColor: 'darkgray',
                                borderRadius: 8,
                                backgroundColor: 'lightgray',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 30
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'gray',
                                    fontWeight: 'bold'
                                }}
                            >
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
