import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export default () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: 22,
  },
});
