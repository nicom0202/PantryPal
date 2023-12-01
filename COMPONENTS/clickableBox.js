import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../STYLES/theme';

const ClickableBox = ({ content, onClick, highlighted, isImage }) => {
    const boxStyles = {
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: COLORS.smokeBlack,
        padding: 10,
        margin: 10, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        // Highlight when 'highlighted' is true
        backgroundColor: highlighted ? COLORS.fadedGreen : 'transparent', 
    };

    return (
        <TouchableOpacity onPress={onClick}>
        <View style={boxStyles}>
            {isImage ? (
                <Image 
                    source={{ uri: content }} 
                    style={{ width: 130, height: 130 }}     
                />
            ) : (
                <Text 
                    style={[{fontSize: SIZES.medium, fontWeight: '700'}]}
                >
                    {content}
                </Text>
            )}
        </View>
        </TouchableOpacity>
    );
};

export default ClickableBox;
