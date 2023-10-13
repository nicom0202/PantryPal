import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <h1>PantryPal</h1>

      <Link href="/recipebook">See Recipe Book</Link>
      <Link href="/grocery">See Grocery List</Link>

    </View>
  );
}

const styles = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'whitesmoke'
    }
  });