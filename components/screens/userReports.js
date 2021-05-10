import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import ActivityIndicator from "./activityIndicator";
import { List } from "../report/index";
import { getUserReports } from "../services/reports";

export default ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [refreshing]);

  const fetchReports = useCallback(async () => {
    const userReportsResponse = await getUserReports();
    console.log(userReportsResponse);
    if (userReportsResponse.code !== null) {
      setLoading(false);
      setRefreshing(false);
      setReports(userReportsResponse);
    }
    if (userReportsResponse.status === 401) {
      Alert.alert("Error", reportsResponse.error);
    }
  });

  const onPress = (report) => {
    navigate("Reporte Específico", {
      report: report,
      canDelete: true,
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
