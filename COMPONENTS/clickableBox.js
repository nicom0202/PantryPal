import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ClickableBox = ({ content, onClick }) => {
    return (
      <TouchableOpacity onPress={onClick}>
        <View
          style={{
            width: 150,
            height: 150,
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            margin: 10, // Add some margin for spacing
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
