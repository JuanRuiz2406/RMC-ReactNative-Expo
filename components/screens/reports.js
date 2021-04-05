import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ActivityIndicator from "./activityIndicator";
import { List } from "../report/index";
import AsyncStorage from "@react-native-community/async-storage";

export default ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(async () => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    await fetch("http://192.168.0.2:8080/report", {
      headers: {
        method: "GET",
        Accept: "application/json",
        Authorization: "Bearer " + (await AsyncStorage.getItem("userToken")),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setReports(data);
      });
  };

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
