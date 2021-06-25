import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { getReportPhotos } from "../services/photography";
import { Card } from "react-native-paper";

export default ({ reportId }) => {
  const [image, setImage] = useState(null);
  const fetchDetails = async () => {
    const apiPhotos = await getReportPhotos(reportId);
    for (let i = 0; i < apiPhotos.length; i++) {
      setImage(apiPhotos[i].imagePath);
      break;
    }
  };


  useEffect(() => {
    fetchDetails();
  }, []);
  //
  return <Card.Cover source={{ uri: image }} />;
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  barContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: 40,
    flexDirection: "row",
  },

  skip: {
    position: "absolute",
    zIndex: 2,
    bottom: 80,
    flexDirection: "row",
  },
  track: {
    backgroundColor: "#ccc",
    overflow: "hidden",
    height: 2,
  },
  bar: {
    backgroundColor: "#5294d6",
    height: 2,
    position: "absolute",
    left: 0,
    top: 0,
  },
  image: {
    width: "96%",
    height: 200,
    borderRadius: 7,
    marginLeft: "2%",
  },
});
