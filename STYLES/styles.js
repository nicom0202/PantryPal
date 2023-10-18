// FJ Tria
// Pantry Pal
// Reusable stylesheet for the front-end

import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../CONSTANTS/theme";

const containerStyle = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: COLORS.lightWhite,
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.smokeBlack,
    },
});

const titleStyle = StyleSheet.create({
    title: {
        fontFamily: FONT.fancy,
        fontSize: SIZES.xLarge,
        color: COLORS.smokeBlack,
    },
});

const textStyle = StyleSheet.create({
    text: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        color: COLORS.smokeBlack,
    },
})
    
const gridStyle = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 100,
    },  
});

export {containerStyle, titleStyle, textStyle, gridStyle};