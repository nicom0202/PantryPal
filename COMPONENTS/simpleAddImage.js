import { View, Text, SafeAreaView, TouchableOpacity, Image, Button } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, uploadBytes, ref, deleteObject,updateDoc, doc } from "firebase/storage";
import { storage, db, auth } from "../firebase";

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
            setImage(result.assets[0].uri);
            const uploadURL = await uploadImageAsync(result.assets[0].uri);
            onImageSelected(result.assets[0].uri);

            // Update the image_path in the selectedRecipe
            const userDocRef = doc(db, "Users", auth.currentUser.email);
            const userRecipesRef = collection(userDocRef, "Recipes");
            const userRecipesDocRef = doc(userRecipesRef, selectedRecipe.id);
            const existingData = (await getDoc(userRecipesDocRef)).data();
            existingData[image_path] = uploadURL;
            await updateDoc(userRecipesDocRef, existingData);
        }
    };

    const uploadImageAsync = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        try {
            const storageRef = ref(storage, `images/image-${Date.now()}`);
            await uploadBytes(storageRef, blob);

            blob.close();
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

    const deleteImage = async () => {
        if (image) {
            const deleteRef = ref(storage, image);
            try {
                await deleteObject(deleteRef);
                setImage(null);
                onImageSelected(null);

                // Update the image_path in the selectedRecipe
                const userDocRef = doc(db, "Users", auth.currentUser.email);
                const userRecipesRef = collection(userDocRef, "Recipes");
                const userRecipesDocRef = doc(userRecipesRef, selectedRecipe.id);
                const existingData = (await getDoc(userRecipesDocRef)).data();
                existingData[image_path] = uploadURL;
                await updateDoc(userRecipesDocRef, existingData);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }
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
                                onPress={deleteImage}
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
