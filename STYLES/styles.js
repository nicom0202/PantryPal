// FJ Tria
// Pantry Pal
// General stylesheet for the front-end

import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../CONSTANTS/theme";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: COLORS.lightWhite,
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.smokeBlack,
    },

    title: {
        fontFamily: FONT.fancy,
        fontSize: SIZES.xLarge,
        color: COLORS.smokeBlack,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 100,
    },
    
    /* Modal styles */
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

    buttonClose: {
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

    buttonOpen: {
        backgroundColor: '#F194FF',
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
    modalText: {
        margin: 15,
        textAlign: 'center',
    },
    /* End of Modal styles, some of it can be modified/removed if needed */
});

export default styles;
