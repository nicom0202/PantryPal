import { getStorage, ref, uploadBytes } from "firebase/storage";
import { LoginStyles } from '../STYLES/styles.js';

const uploadImage = (imageName) => {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/'+imageName);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
    return (
        <TouchableOpacity onPress={uploadBytes}
              style={[LoginStyles.button, LoginStyles.buttonOutline]}
            >
              <Text style={LoginStyles.buttonOutlineText}>Upload</Text>
        </TouchableOpacity>
    );
}

export default uploadImage();