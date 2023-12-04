import addRecipe from '../INTERFACE/AddRecipe.js';
import deleteRecipe from '../INTERFACE/DeleteRecipe.js';
import IngredientFlatList from './IngredientFlatList.js';
import { 
    View, 
    Text, 
    Modal, 
    Pressable, 
    TextInput, 
    SafeAreaView, 
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import { 
    ViewStyle, 
    ButtonStyle, 
    TextStyle, 
    TextInputStyle 
} from '../STYLES/styles.js';
import { ScrollView } from 'react-native-gesture-handler';
import SimpleAddImageButton from './AddImageButton.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../STYLES/theme.js';
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase.js";
import {
    DISCOVER_COLLECTION_NAME,
    USER_COLLECTION_NAME
} from "../INTERFACE/CONSTANTS_FIREBASE.js";

// Set the maximum length for the recipe name
const MAX_RECIPE_NAME_LENGTH = 32;

const RecipeModal = ({
    modalVisible, 
    selectedRecipe, 
    recipes, 
    isEditing,
    setRecipes, 
    setModalVisible,
    setSelectedRecipe,
    setIsEditing,
    selectedImage, // Use the specific image prop
    handleImageSelected, // Use the specific handler for updating the image
}) => {

    const startEditing = () => {
        setIsEditing(true);
    };

    const saveEditing = () => {
        if (selectedRecipe) {
            /* Find the index of the selected recipe */
            const recipeIndex = recipes.findIndex(
                recipe => recipe.id === selectedRecipe.id
                );
            if (recipeIndex !== -1) {
                /* Create a copy of the recipes array and update 
                the name of the selected recipe */
                const updatedRecipes = [...recipes];
                updatedRecipes[recipeIndex].name = selectedRecipe.name || "Recipe";
                updatedRecipes[recipeIndex].image = selectedImage;
                setRecipes(updatedRecipes);
                addRecipe(updatedRecipes[recipeIndex], USER_COLLECTION_NAME)
            }
            
            setIsEditing(false);
        }
    };

        /* Alerts the user to confirm before deleting recipe */
        const handleDeleteRecipe = () => {
            Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete this recipe?",
                [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {              
                        /* remove the recipe from list of 
                        recipes and close modal */
                        if (selectedRecipe) {
                            const updatedRecipes = recipes.filter(
                                recipe => recipe.id !== selectedRecipe.id);
                            // DELETE IMAGE FROM SELECTED 
                            // RECIPE IN FIREBASE STORAGE
                            const deleteImage = async (image) => {
                                if (image) {
                                    const deleteRef = ref(storage, image);
                                    try {
                                        await deleteObject(deleteRef);
                                    } catch (error) {
                                        console.error(`Error: ${error}`);
                                    }
                                }
                            };
                            deleteImage(selectedRecipe.image);
                            deleteRecipe(selectedRecipe);
                            setRecipes(updatedRecipes);
                            setModalVisible(false);
                            setSelectedRecipe(null);
                            setIsEditing(false);
                        }
                    },
                },
                ]
            );
        };    
    
    /* Alerts the user to confirm before publishing recipe */
    const sendToDiscover = () => {
        Alert.alert(
            "Confirm Publish",
            "Are you sure you want to publish this recipe and send it to the discover page?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Publish",
                    onPress: () => {
                        /* Publish the recipe here */            
                        if (selectedRecipe) {
                            addRecipe(selectedRecipe, DISCOVER_COLLECTION_NAME);
                            console.log("Recipe sent to Discover");
                        }
                    },
                },
            ]
        );
    };

    /* Update the name of the selected recipe */
    const updateRecipeName = (newName) => {
        if (selectedRecipe && newName.length <= MAX_RECIPE_NAME_LENGTH) {
            // Update the name directly in the selectedRecipe object
            selectedRecipe.name = newName; 

            const updatedRecipes = recipes.map((recipe) =>
                recipe.id === selectedRecipe.id ? 
                    { ...recipe, name: newName } : 
                    recipe
            );
            setRecipes(updatedRecipes);
        }   
    };

    /* Update the instructions of the selected recipe */
    const updateRecipeInstructions = (newInstructions) => {
        if (selectedRecipe) {
            // Update the name directly in the selectedRecipe object
            selectedRecipe.instructions = newInstructions; 
            const updatedRecipes = recipes.map((recipe) =>
                recipe.id === selectedRecipe.id ? 
                    { ...recipe, instructions: newInstructions } : 
                    recipe
            );
            setRecipes(updatedRecipes);
        }   
    };

    /* Update the instructions of the selected recipe */
    const updateRecipeCookTime = (newCookTime) => {
        if (selectedRecipe) {
            // Update the name directly in the selectedRecipe object
            selectedRecipe.cookTime = newCookTime; 
            const updatedRecipes = recipes.map((recipe) =>
                recipe.id === selectedRecipe.id ? 
                    { ...recipe, cookTime: newCookTime } : 
                    recipe
            );
            setRecipes(updatedRecipes);
        }   
    };

    const handleDismissKeyboard = () => {
        // This will dismiss the keyboard when you tap away from the TextInput
        Keyboard.dismiss(); 
    };
    

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={ViewStyle.centeredView}>
                <View style={ViewStyle.modalView}>
                    {/* Close button (top right) */}
                    <Pressable
                        style={ButtonStyle.close}
                        hitSlop={20}
                        onPress={() => {
                            saveEditing();
                            setModalVisible(false);
                            setSelectedRecipe(null);
                        }}
                    >
                        <MaterialCommunityIcons 
                            name="close" 
                            color={COLORS.lightWhite} 
                            size={SIZES.xLarge} 
                        />
                    </Pressable>


                    <ScrollView 
                        contentContainerStyle={ViewStyle.scrollViewContent}
                        automaticallyAdjustKeyboardInsets={true}
                        >

                        {/* Recipe Name Text Box while editing, Text otherwise */}
                        {isEditing ? (
                            <TouchableWithoutFeedback 
                                onPress={handleDismissKeyboard}
                            >
                                <SafeAreaView>
                                    <TextInput
                                        style={[TextInputStyle.inputRecipeName]} 
                                        value={selectedRecipe ? 
                                            selectedRecipe.name : 
                                            ''}
                                        onChangeText={text => updateRecipeName(text)}
                                        placeholder="Recipe Name"
                                        placeholderTextColor={COLORS.ashGray}
                                    />
                                </SafeAreaView>
                            </TouchableWithoutFeedback>
                        ) : (
                            <Text 
                                style={TextStyle.title}
                            >
                                {selectedRecipe ? selectedRecipe.name : ''}
                            </Text>
                        )}

                        {/* Image box while editing, show image otherwise */}
                        {isEditing ? (
                            <SafeAreaView>
                                <SimpleAddImageButton 
                                    onImageSelected={handleImageSelected} 
                                    currentImage={selectedRecipe ? 
                                        selectedRecipe.image : 
                                        null} 
                                    selectedRecipe={selectedRecipe}
                                />
                            </SafeAreaView>
                        ) : (
                            selectedImage && (
                                <View 
                                    style={{ 
                                    width: 200, 
                                    height: 200, 
                                    borderRadius: 8, 
                                    overflow: 'hidden', 
                                    alignSelf: 'center',
                                }}>
                                    <Image
                                        source={{ uri: selectedImage }}
                                        style={{ 
                                            width: '100%', 
                                            height: '100%',
                                        }}
                                    />
                                </View>
                            )
                        )}

                        {/* Cook Time Dropdown if editing, Text otherwise */}
                        {isEditing ? (
                            <TouchableWithoutFeedback 
                                onPress={handleDismissKeyboard}
                            >
                                <SafeAreaView>      
                                    <TextInput
                                        style={[
                                            TextInputStyle.inputRecipeCookTime
                                        ]} 
                                        value={
                                            selectedRecipe && selectedRecipe.cooktime != 0 
                                            ? selectedRecipe.cookTime
                                            : 0
                                        }
                                        onChangeText={text => updateRecipeCookTime(text)}
                                        placeholder="Cook Time (minutes)"
                                        placeholderTextColor="grey"
                                        keyboardType="numeric"
                                    />
                                </SafeAreaView>
                            </TouchableWithoutFeedback>
                        ) : (
                            <View>
                                <Text style={TextStyle.title}>
                                    {"Total Cook Time: "}
                                    {selectedRecipe ? selectedRecipe.cookTime : '0'} 
                                    {" Minutes"}
                                </Text>
                            </View>
                        )}

                        {/* Recipe Instructions Text Box while editing, Text otherwise */}
                        {isEditing ? (
                            <TouchableWithoutFeedback 
                                onPress={handleDismissKeyboard}
                            >
                                <SafeAreaView>
                                    <TextInput
                                        style={[TextInputStyle.inputRecipeInstructions]} 
                                        value={selectedRecipe ? 
                                            selectedRecipe.instructions : 
                                            ''}
                                        onChangeText={text => updateRecipeInstructions(text)}
                                        placeholder="Recipe Instructions"
                                        placeholderTextColor={COLORS.ashGray}
                                        multiline={true}
                                    />
                                </SafeAreaView>
                            </TouchableWithoutFeedback>
                        ) : (
                            <View>
                                <Text style={TextStyle.title}>
                                    {'Recipe Instructions'}
                                </Text>
                                <Text style={TextStyle.instructions}>
                                    {selectedRecipe ? selectedRecipe.instructions : ''}
                                </Text>
                            </View>
                        )}

                        {/* Ingredients list */}
                        {isEditing ? (
                            <IngredientFlatList 
                                recipes={recipes}
                                selectedRecipe={selectedRecipe}
                                setRecipes={setRecipes}
                            />
                        ) : (
                            <View>
                                <Text style={TextStyle.title}>
                                    {'Recipe Ingredients'}
                                </Text>
                                <View style={TextStyle.ingredients}>
                                    {selectedRecipe ? 
                                        selectedRecipe.ingredients.map((ingredient, index) => (
                                            ingredient.name ? (
                                                <Text key={index} style={TextStyle.body}>
                                                    {ingredient.name}: {ingredient.quantity}
                                                    {" grams"}
                                                </Text>
                                            ) : null
                                    )) : null}
                                </View>
                            </View>
                        )}
                    </ScrollView>

                    {isEditing ? (
                        <Pressable
                            style={ButtonStyle.saveRecipe}
                            onPress={saveEditing}
                        >
                            <Text style={ButtonStyle.colorFillText}>Save</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={ButtonStyle.editRecipe}
                            onPress={startEditing}
                        >
                            <Text style={ButtonStyle.colorFillText}>Edit</Text>
                        </Pressable>
                    )}

                    {isEditing ? (
                        <Pressable
                            style={ButtonStyle.deleteRecipe}
                            onPress={handleDeleteRecipe}
                        >
                            <Text style={ButtonStyle.colorFillText}>Delete</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={ButtonStyle.publishRecipe}
                            onPress={sendToDiscover}
                        >
                            <Text style={ButtonStyle.colorFillText}>Publish</Text>
                        </Pressable>
                    )}

                </View>
            </View>
        </Modal>
    );
};

export default RecipeModal;
