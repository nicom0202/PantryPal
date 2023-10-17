// Pantry Pal
// Loads default fonts and page layout

import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={ { headerShown: false }}/>
        </Stack>
      );
};

export default Layout;