import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SIZES } from '../STYLES/theme';

const LikesComponent = ({ likes }) => {
  return (
    <View style={styles.likesContainer}>
      <Text style={styles.likesCount}>{likes}</Text>
      <MaterialCommunityIcons name="thumb-up" color={'blue'} size={SIZES.xxLarge} />
    </View>
  );
};

const styles = StyleSheet.create({
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10
  },
  likesCount: {
    marginRight: 5, // Adjust spacing between likes count and icon
    // Add other styles for the likes count
  },
  likeIcon: {
    width: 20, // Adjust the width of the icon
    height: 20, // Adjust the height of the icon
    // Add other styles for the icon
  },
});

export default LikesComponent;
