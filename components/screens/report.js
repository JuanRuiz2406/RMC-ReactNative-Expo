import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ActivityIndicator from "./activityIndicator";
import { default as ShowReport } from "../report/showReport";
import { useRoute } from "@react-navigation/native";
import { getReportDetails } from "../services/reports";
import { getReportPhotos } from "../services/photography";

export default () => {
  const route = useRoute();

  const report = route.params.report;
  const canDelete = route.params.canDelete;
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [details, setDetails] = useState([]);
  const [photos, setPhotos] = useState([]);

  const fetchDetails = async () => {
    const reportDetailsResponse = await getReportDetails(report.id);
    if (reportDetailsResponse !== null) {
      setLoadingDetails(false);
      setDetails(reportDetailsResponse);
    }
    if (reportDetailsResponse.status === 401) {
      Alert.alert("Error Unauthorized", reportDetailsResponse.error);
    }

    const reportPhotosResponse = await getReportPhotos(report.id);
    if (reportPhotosResponse !== null) {
      setLoadingPhotos(false);
      let uris = "";
      reportPhotosResponse.map((x) => (uris = uris + "," + x.imagePath));
      uris = uris.substring(1);
      uris = uris.split(",");
      setPhotos(uris);
      //console.log(photos);
    }
    if (reportPhotosResponse.status === 401) {
      Alert.alert("Error Unauthorized", reportPhotosResponse.error);
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
        <ShowReport
          report={report}
          details={details}
          canDelete={canDelete}
          photos={photos}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F9",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
