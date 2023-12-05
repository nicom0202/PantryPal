import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../STYLES/Theme';

const ClickableBox = ({ content, onClick, highlighted, isImage }) => {
    const boxStyles = {
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: highlighted ? COLORS.brightYellow : COLORS.smokeBlack,
        padding: 10,
        margin: 10, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'transparent', 
    };

    return (
        <TouchableOpacity onPress={onClick}>
        <View style={boxStyles}>
            {isImage ? (
                <Image 
                    source={{ uri: content }} 
                    style={{ width: 146, height: 146, borderRadius: 23}}     
                />
            ) : (
                <Text 
                    style={[{fontSize: SIZES.medium, fontWeight: 'bold'}]}
                >
                    {content}
                </Text>
            )}
        </View>
        </TouchableOpacity>
    );
};

export default ClickableBox;
