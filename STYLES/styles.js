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
    }
});

export default styles;
