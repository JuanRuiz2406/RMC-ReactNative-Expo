import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { List, ActivityIndicator } from "./index";

export default () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.2:8080/report")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setReports(data);
      });
  }, []);

  const onPress = (reportId) => {
    Alert.alert("Detalle", "http://URL/report/" + String(reportId));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <List reports={reports} onPress={onPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
