import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
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
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Tus Reportes</Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container2}>
          <List
            onRefresh={() => setRefreshing(true)}
            refreshing={refreshing}
            reports={reports}
            onPress={onPress}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F9",
    alignItems: "stretch",
  },
  title: {
    fontSize: 30,
    marginBottom: "3%",
    alignSelf: "center",
    marginTop: "5%",
  },
  viewTitle: {
    backgroundColor: "#fff",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  container2: {
    marginBottom: "15%",
  },
});
