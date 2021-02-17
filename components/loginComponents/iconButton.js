import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function IconButton({ name, style, onPress }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Ionicons name={name} />
    </TouchableOpacity>
  );
}
