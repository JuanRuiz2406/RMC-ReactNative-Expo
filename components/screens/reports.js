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
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWFuQGp1YW4uY29tIiwiaWF0IjoxNjE3MDg3Njc5LCJleHAiOjE2MTcwOTEyNzl9.jMP1BLC6P5R5bUV7IX2IRy3BD7WZ0fvvtWoJBaXOY2lEnH7YFvhMMeObY40XRxcxiUzgVxQKD5C0h7E5_Z8VVw",
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
