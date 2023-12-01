import { getDownloadURL, uploadBytes, ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImageAsync = async (uri) => {
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

export const deleteImage = async (image) => {
    if (image) {
        const deleteRef = ref(storage, image);
        try {
            await deleteObject(deleteRef);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }
};


