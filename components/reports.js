import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { List } from "./index";

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

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <List reports={reports} onPress={onPress} />
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
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: 22,
  },
});
