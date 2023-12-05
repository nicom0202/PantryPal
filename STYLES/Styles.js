// Pantry Pal
// Reusable stylesheet for the front-end

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "./Theme";

const ContainerStyle = StyleSheet.create({
    defaultContainer: {
        fontSize: SIZES.medium,
        color: COLORS.smokeBlack,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    scrollView: {
        width: '100%', 
        padding: 10, 
        margin: 10, 
        alignSelf: 'baseline'
    },
});

const TextStyle = StyleSheet.create({
    title: {
        fontSize: SIZES.xLarge,
        textAlign: "center",
        color: COLORS.smokeBlack,
        padding: 10
    },
    instructions: {
        fontSize: SIZES.medium,
        color: COLORS.smokeBlack,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    ingredients: {
        fontSize: SIZES.medium,
        color: COLORS.smokeBlack,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    body: {
        fontSize: SIZES.medium,
        color: COLORS.smokeBlack,
    },
    bold: {
        fontSize: SIZES.medium,
        fontWeight: '700',
        color: COLORS.smokeBlack,
    },
    input: {
        color: COLORS.fadedGreen,
        backgroundColor: COLORS.lightWhite,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    modalText: {
        margin: 15,
        textAlign: 'center',
    },
});
    
const GridStyle = StyleSheet.create({
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 75,
        marginBottom: 100,
    },
});

/* Modal styles */
const ViewStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "90%",
        height: "70%",
        margin: 10,
        backgroundColor: COLORS.lightWhite,
        borderColor: COLORS.smokeBlack,
        borderWidth: 2,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    scrollViewContent: {
        paddingBottom: 50,
    },
});

const ButtonStyle = StyleSheet.create({
    // General Buttons
    colorFill: {
        alignItems: 'center',
        backgroundColor: COLORS.brightGreen,
        width: '100%',
        margin: 5,
        padding: 10,
        borderColor: COLORS.brightGreen,
        borderWidth: 2,
        borderRadius: 25,
    },
    colorFillBlue: {
        alignItems: 'center',
        backgroundColor: COLORS.brightBlue,
        width: '100%',
        margin: 5,
        padding: 10,
        borderColor: COLORS.brightBlue,
        borderWidth: 2,
        borderRadius: 25,
    },
    colorFillYellow: {
        alignItems: 'center',
        backgroundColor: COLORS.brightYellow,
        width: '100%',
        margin: 5,
        padding: 10,
        borderColor: COLORS.brightYellow,
        borderWidth: 2,
        borderRadius: 25,
    },
    colorFillText: {
        color: COLORS.lightWhite,
        fontWeight: '700',
        fontSize: SIZES.medium,
    },
    colorOutline: {
        alignItems: 'center',
        backgroundColor: COLORS.lightWhite,
        width: '100%',
        margin: 5,
        padding: 10,
        borderColor: COLORS.brightGreen,
        borderWidth: 2,
        borderRadius: 25,
    },
    colorOutlineText: {
        color: COLORS.brightGreen,
        fontWeight: '700',
        fontSize: SIZES.medium,
    },
    // Recipe Book
    close: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        borderColor: COLORS.smokeBlack,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: COLORS.brightRed,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editRecipe: {
        width: 125,
        height: 40,
        borderRadius: 25,
        backgroundColor: COLORS.brightGreen,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 10, // Adjust this value to control the vertical position
        left: 40, // Center the button horizontally
    },
    publishRecipe: {
        width: 125,
        height: 40,
        borderRadius: 25,
        backgroundColor: COLORS.brightBlue,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 10, // Adjust this value to control the vertical position
        left: 220, // Center the button horizontally
    },
    saveRecipe: {
        width: 125,
        height: 40,
        borderRadius: 25,
        backgroundColor: COLORS.brightGreen,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 10, // Adjust this value to control the vertical position
        left: 40, // Center the button horizontally
    },
    deleteRecipe: {
        width: 125,
        height: 40,
        borderRadius: 25,
        backgroundColor: COLORS.brightRed,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 10, // Adjust this value to control the vertical position
        left: 220, // Center the button horizontally
    },
    // Discover
    likeRecipe: {
        width: 125,
        height: 40,
        borderRadius: 25,
        backgroundColor: COLORS.brightGreen,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 10, // Adjust this value to control the vertical position
        left: 40, // Center the button horizontally
    },
    addRecipe: {
        width: 125,
        height: 40,
        borderRadius: 25,
        backgroundColor: COLORS.brightBlue,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 10, // Adjust this value to control the vertical position
        left: 220,
    },
});

const CheckBoxStyle = StyleSheet.create({
    container: { 
        justifyContent: "flex-start", 
        alignItems: "center", 
        flexDirection: "row", 
        width: 150, 
        marginTop: 5, 
        marginHorizontal: 5, 
    }, 
    title: { 
        fontSize: SIZES.medium, 
        color: COLORS.smokeBlack, 
        marginLeft: 5, 
        fontWeight: "700", 
    }, 
});

const TextInputStyle = StyleSheet.create({
    inputRecipeName: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    inputRecipeInstructions: {
        height: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputRecipeCookTime: {
        height: 40,
        width: 170,
        alignSelf: 'center',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

const ImageStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        paddingHorizontal: 6,
    },
    imagePreview: {
        width: '100%',
        height: '80%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    uploadButton: {
        width: '100%',
        height: 90,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: 'darkgray',
        borderRadius: 8,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    uploadButtonText: {
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold'
    },
});

const LikesStyles = StyleSheet.create({
    likesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      padding: 10
    },
    likesCount: {
      marginRight: 5, // Adjust spacing between likes count and icon
      // Add other styles for the likes count
    },
    likeIcon: {
      width: 20, // Adjust the width of the icon
      height: 20, // Adjust the height of the icon
      // Add other styles for the icon
    },
  });

  const RecipeModalImageStyle = StyleSheet.create({
    imageView : {
        width: '100%', 
        height: '100%',
    },
    selectedImageStyle : {
        width: 200, 
        height: 200, 
        borderRadius: 8, 
        overflow: 'hidden', 
        alignSelf: 'center',
    }
});

const IngredientFlatListStyles = StyleSheet.create({
    box : {
        flexDirection: 'row', 
        height: 40,
        justifyContent: 'space-between',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    ingredientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    ingredientItem: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40,
    },
    deletePos: {
        justifyContent: 'center',
        marginRight: 15
    }
  });

export {
    ContainerStyle,
    TextStyle,
    GridStyle,
    ViewStyle,
    ButtonStyle,
    CheckBoxStyle,
    TextInputStyle,
    ImageStyles,
    LikesStyles,
    RecipeModalImageStyle,
    IngredientFlatListStyles
};
