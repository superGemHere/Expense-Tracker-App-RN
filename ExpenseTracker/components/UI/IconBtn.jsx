import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const IconBtn = ({
   icon,
   size,
   color,
   onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.buttonContainer}>
         <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconBtn;

const styles = StyleSheet.create({
   buttonContainer: {
      borderRadius: 24,
      padding: 6,
      marginHorizontal: 8,
      marginVertical: 2,
   },
   pressed: {
      opacity: 0.5,
   }
})
