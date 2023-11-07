// Pantry Pal
// Reusable stylesheet for the front-end

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../CONSTANTS/theme";

const containerStyle = StyleSheet.create({
    container: {
        width: "100%",
        fontSize: SIZES.medium,
        color: COLORS.smokeBlack,
    },
});

const textStyle = StyleSheet.create({
    title: {
        fontSize: SIZES.xLarge,
        textAlign: "center",
        color: COLORS.smokeBlack,
    },
    body: {
        fontSize: SIZES.medium,
        color: COLORS.smokeBlack,
    },
    modalText: {
        margin: 15,
        textAlign: 'center',
    },
});
    
const gridStyle = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 100,
    },
});

/* Modal styles */
const viewStyle = StyleSheet.create({
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
        backgroundColor: 'white',
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

const buttonStyle = StyleSheet.create({
    close: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    open: {
        backgroundColor: '#F194FF',
    },
    deleteRecipe: {
        width: 125,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'red',
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
        backgroundColor: 'green',
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
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center', // Center the button content vertically
        position: 'absolute', // Position the button absolutely within modalView
        bottom: 70, // Adjust this value to control the vertical position
        left: 113.5, // Center the button horizontally
    },
});

const checkBoxStyle = StyleSheet.create({
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

const textInputStyle = StyleSheet.create({
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

/* Login/Logout/Sign up styles */
const LoginStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%',
    },
    input: {
      backgroundColor: COLORS.lightWhite,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: COLORS.brightGreen,
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: COLORS.lightWhite,
      marginTop: 5,
      borderColor: COLORS.brightGreen,
      borderWidth: 2,
    },
    buttonText: {
      color: COLORS.lightWhite,
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: COLORS.brightGreen,
      fontWeight: '700',
      fontSize: 16,
    },
    errorMessage: {
      color: 'red',
      marginTop: 10,
    },
});

const LogoutStyles = StyleSheet.create({
    button: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 50,
        top: -10,
        left: 25,

        borderWidth: 2,
        borderRadius: 999,
    }
});

  export {
    containerStyle,
    textStyle,
    gridStyle,
    viewStyle,
    buttonStyle,
    checkBoxStyle,
    textInputStyle,
    LoginStyles,
    LogoutStyles,
};