import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ActivityIndicator from "./activityIndicator";
import { ShowReport } from "../report/index";
import { useRoute } from "@react-navigation/native";
import { getReportDetails } from "../services/reports";

export default () => {
  const route = useRoute();

  const report = route.params.report;
  const canDelete = route.params.canDelete;
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [details, setDetails] = useState([]);

  const fetchDetails = async () => {
    const reportDetailsResponse = await getReportDetails(report.id);
    if (reportDetailsResponse !== null) {
      setLoadingDetails(false);
      setDetails(reportDetailsResponse);
    }
    if (reportDetailsResponse.status === 401) {
      Alert.alert("Error Unauthorized", reportDetailsResponse.error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <View style={styles.container}>
      {loadingDetails ? (
        <ActivityIndicator />
      ) : (
        <ShowReport report={report} details={details} canDelete={canDelete} />
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
