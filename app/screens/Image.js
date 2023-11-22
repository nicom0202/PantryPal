import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Image, Button } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { storage } from "../../firebase";
import { getDownloadURL, uploadBytes, ref, deleteObject } from "firebase/storage";

const ImageScreen = () => {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
        setIsLoading(true);
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.2,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            const uploadURL = await uploadImageAsync(result.assets[0].uri);
            setImage(uploadURL);
            // Set isLoading to false after a delay
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
        else{
            // Set isLoading to false after a delay
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
      };

      const uploadImageAsync = async (uri) => {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
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
            const storageRef = ref(storage, `images/image-${Date.now()}`); // THIS HOLDS THE PATH TO FIREBASE 
            await uploadBytes(storageRef, blob);

            blob.close();
            return await getDownloadURL(storageRef);
        }
        catch (error){
            alert(`Error: ${error}`);
        }
      };

      const deleteImage = async () => {
        setIsLoading(true);
        const deleteRef = ref(storage,image);
        try {
            deleteObject(deleteRef).then(() => {
                setImage(null);
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            })
        } catch (error) {
            isArrayLiteralExpression(`Error : ${error}`);
        }
      }
    return (
        <SafeAreaView 
            style={{ flex: 1, 
                alignItems: 'center',  
                justifyContent: 'center' 
            }}
        >
            <View 
                style={{ paddingHorizontal: 6, 
                        width: '100%' 
                }}
            >
                {!image ? (
                    /* this is for pick an image section */
                    <>
                        <TouchableOpacity 
                            onPress={pickImage} 
                            style={{ width: '100%', 
                                    height: 64, 
                                    borderStyle: 'dashed', 
                                    borderWidth: 2, 
                                    borderColor: 'darkgray', 
                                    borderRadius: 8, 
                                    backgroundColor: 'lightgray', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                            }}
                        >
                            {isLoading ? (
                                <View 
                                    style={{ flex: 1, 
                                            alignItems: 'center', 
                                            justifyContent: 'center' 
                                    }}
                                >
                                    <ActivityIndicator 
                                        color = {"#ff0000"} 
                                        animating 
                                        size={"large"}
                                    />
                                </View> 
                            ) : (
                                <Text 
                                    style={{ fontSize: 20, 
                                            color: 'gray', 
                                            fontWeight: 'bold' 
                                    }}
                                >
                                Pick an image
                            </Text>
                            )}
                        </TouchableOpacity>
                    </>
                ) : (
                    /* to display the image section */
                    <>
                        {image && (
                            <View style={{ width: '100%', height: '64%', borderRadius: 8, overflow: 'hidden' }}>
                                {image && (
                                    <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                                )}
                            </View>
                        )}
                        <Button title="Delete this image"
                                onPress={deleteImage}
                        />
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ImageScreen;
