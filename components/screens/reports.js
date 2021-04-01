import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ActivityIndicator from "./activityIndicator";
import { List } from "../report/index";
import AsyncStorage from "@react-native-community/async-storage";

export default ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    getToken();

    fetchReports();
  }, []);

  const getToken = async () => {
    const tokenInStorage = await AsyncStorage.getItem("userToken");
    console.log(tokenInStorage);

    setToken(tokenInStorage);
  };

  const fetchReports = () => {
    fetch("http://192.168.0.2:8080/report", {
      headers: {
        method: "GET",
        Accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWFuQGp1YW4uY29tIiwiaWF0IjoxNjE3MTI2OTQ2LCJleHAiOjE2MTgwMjgxMjN9.-sjgJVD4CyNj-Pp7bUmoFWIrVBJceKBhBE6rqWG0KdW3hnMV11wL3Vg9STaBb0Rs62cJV-fL7sgfdrfGIwdmwQ",
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
