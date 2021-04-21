import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ActivityIndicator from "./activityIndicator";
import { ShowReport } from "../report/index";
import { useRoute } from "@react-navigation/native";

export default () => {
  const route = useRoute();

  const report = route.params.report;
  const canDelete = route.params.canDelete;
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [details, setDetails] = useState([]);

  const fetchDetails = async () => {
    const response = await fetch(
      "http://192.168.0.2:8080/detailReport/byReport/" + report.id
    );
    const data = await response.json();
    setDetails(data);
    setLoadingDetails(false);
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
