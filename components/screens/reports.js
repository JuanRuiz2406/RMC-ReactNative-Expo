import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import ActivityIndicator from "./activityIndicator";
import { List } from "../report/index";

export default ({ navigation: { navigate } }) => {
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

  const onPress = (report) => {
    navigate("Reporte Específico", {
      report: report,
    });
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
