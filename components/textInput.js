import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default ({ onChangeText, onBlur, value }) => {
  return (
    <TextInput
      style={styles.input}
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
  },
});
