import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../STYLES/theme';

const windowWidth = Dimensions.get('window').width;

const ClickableBox = ({ content, onClick, highlighted }) => {
  const boxStyles = {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: COLORS.smokeBlack,
    padding: 10,
    margin: 10, // Add some margin for spacing
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: highlighted ? COLORS.fadedOrange : 'transparent', // Highlight when 'highlighted' is true
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={boxStyles}>
        {typeof content === 'string' ? (
          <Text>{content}</Text>
        ) : (
          <Image source={content} style={{ width: 145, height: 145 }} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ClickableBox;
