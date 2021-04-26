import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import ActivityIndicator from "./activityIndicator";
import { List } from "../report/index";
import AsyncStorage from "@react-native-community/async-storage";

export default ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [refreshing]);

  const fetchReports = useCallback(async () => {
    await fetch(
      "http://192.168.0.13:8080/report/byPublicPrivacyAndVisibleState",
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await AsyncStorage.getItem("userToken")),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setRefreshing(false);
        setReports(data);
      });
  });

  const onPress = (report) => {
    navigate("Reporte Específico", {
      report: report,
      canDelete: false,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <List
          onRefresh={() => setRefreshing(true)}
          refreshing={refreshing}
          reports={reports}
          onPress={onPress}
        />
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
