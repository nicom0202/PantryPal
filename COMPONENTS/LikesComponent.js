import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../STYLES/Theme';
import { LikesStyles } from '../STYLES/Styles';

const LikesComponent = ({ likes }) => {
  return (
    <View style={LikesStyles.likesContainer}>
      <Text style={LikesStyles.likesCount}>{likes}</Text>
      <MaterialCommunityIcons 
          name="thumb-up" 
          color={COLORS.brightBlue} 
          size={SIZES.xLarge} 
      />
    </View>
  );
};

export default LikesComponent;
