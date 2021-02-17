import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function IconButton({ name, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Ionicons name={name} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
