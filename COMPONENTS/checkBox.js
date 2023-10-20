// FJ Tria
// PantryPal
// CheckBox component for use in grocery list
// https://www.geeksforgeeks.org/how-to-create-a-custom-checkbox-component-in-react-native/

import { Pressable, Text, View } from "react-native";
import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { checkBoxStyle } from "../STYLES/styles.js"

const CheckBox = (props) => {
    const iconName = props.isChecked ?
    "checkbox-marked" : "checkbox-blank-outline";

    return (
        <View style={checkBoxStyle.container}>
            <Pressable onPress={props.onPress}>
                <MaterialCommunityIcons
                    name={iconName} size={24} color="#000"
                />
            </Pressable>
            <Text style={checkBoxStyle.title}>
                {props.title}
            </Text>
        </View>
    );
};

export default CheckBox;