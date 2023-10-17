// FJ Tria
// Pantry Pal
// General stylesheet for the front-end

import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../CONSTANTS";

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
});

export default styles;
