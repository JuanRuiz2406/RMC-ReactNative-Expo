import React from "react";
import { View, StyleSheet } from "react-native";

export function AuthContainer({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: '10%',
    paddingTop: 25,
  },
});
