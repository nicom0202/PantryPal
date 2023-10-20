import "expo-router/entry";
import * as React from "react";
import { useFonts } from "expo-font";
import Container from "./app/index.js";

function App() {
    const [fontsLoaded] = useFonts({
        LatoRegular: require("./ASSETS/fonts/Lato-Regular.ttf"),
        LatoMedium: require("./ASSETS/fonts/Lato-Medium.ttf"),
        LatoBold: require("./ASSETS/fonts/Lato-Bold.ttf"),
        KFhimaji: require("./ASSETS/fonts/KFhimaji.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Container/>
    );
}

export default App;