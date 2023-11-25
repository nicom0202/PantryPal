// Pantry Pal
// Reusable stylesheet for the front-end

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "./theme";

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
});

const TextStyle = StyleSheet.create({
    title: {
        fontSize: SIZES.xLarge,
        textAlign: "center",
        color: COLORS.smokeBlack,
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
    colorFill: {
        alignItems: 'center',
        backgroundColor: COLORS.brightGreen,
        width: '100%',
        margin: 5,
        padding: 10,
        borderColor: COLORS.brightGreen,
        borderWidth: 2,
        borderRadius: 10,
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
        borderRadius: 10,
    },
    colorOutlineText: {
        color: COLORS.brightGreen,
        fontWeight: '700',
        fontSize: SIZES.medium,
    },
    googleLogin: {
        alignItems: 'center',
        backgroundColor: COLORS.fadedBlue,
        width: '100%',
        margin: 5,
        padding: 10,
        borderColor: COLORS.fadedBlue,
        borderWidth: 2,
        borderRadius: 10,
    },
    googleLoginText: {
        color: COLORS.lightWhite,
        fontWeight: '700',
        fontSize: SIZES.medium,
    },
    select: {
        alignItems: 'center',
        backgroundColor: COLORS.lightWhite,
        width: '100%',
        margin: 5,
        padding: 10,
        borderColor: COLORS.fadedBlue,
        borderWidth: 2,
        borderRadius: 10,
    },
    selectText: {
        color: COLORS.fadedBlue,
        fontWeight: '700',
        fontSize: SIZES.medium,
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        borderColor: COLORS.smokeBlack,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: COLORS.fadedRed,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteRecipe: {
        width: 125,
        height: 40,
        borderRadius: 30,
        backgroundColor: COLORS.fadedRed,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 10, // Adjust this value to control the vertical position
        left: 185, // Center the button horizontally
    },
    saveRecipe: {
        width: 125,
        height: 40,
        borderRadius: 30,
        backgroundColor: COLORS.brightGreen,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 10, // Adjust this value to control the vertical position
        left: 40, // Center the button horizontally
    },
    editRecipe: {
        width: 125,
        height: 40,
        borderRadius: 30,
        backgroundColor: COLORS.brightGreen,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 10, // Adjust this value to control the vertical position
        left: 40, // Center the button horizontally
    },
    sendRecipeToDiscover: {
        width: 125,
        height: 40,
        borderRadius: 30,
        backgroundColor: COLORS.fadedBlue,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 10, // Adjust this value to control the vertical position
        left: 185, // Center the button horizontally
    },
    selectGroceries: {
        width: 375,
        height: 50,
        borderRadius: 30,
        padding: 0,
        backgroundColor: COLORS.brightGreen,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        top: 20, // Adjust this value to control the vertical position
        left: 8, // Center the button horizontally
    },
    newDiscoverRecipes: {
        width: 375,
        height: 50,
        borderRadius: 30,
        padding: 0,
        backgroundColor: COLORS.brightGreen,
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        top: 20, // Adjust this value to control the vertical position
        left: 8, // Center the button horizontally
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
        fontSize: 16, 
        color: "#000", 
        marginLeft: 5, 
        fontWeight: "600", 
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
});

export {
    ContainerStyle,
    TextStyle,
    GridStyle,
    ViewStyle,
    ButtonStyle,
    CheckBoxStyle,
    TextInputStyle,
};