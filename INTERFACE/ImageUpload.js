import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../firebase";

const uploadImageAsync = async (uri) => {
  try {
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

    const storageRef = ref(storage, `images/image-${Date.now()}`);
    await uploadBytes(storageRef, blob);

    blob.close();
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading image:", error);
    // Handle the error as needed
    throw error; // Propagate the error
  }
};

export default uploadImageAsync;
