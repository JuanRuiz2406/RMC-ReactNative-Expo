import React from "react";
import {
  Alert,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import Button from "../ComponetsLogin/Button";
import { useRoute } from "@react-navigation/native";
import { deleteReport } from "../services/reports";
import MapView, { Marker } from "react-native-maps";

export default ({ report, details }) => {
  const route = useRoute();

  const canDelete = route.params.canDelete;

  const onDeleteReport = async (reportId) => {
    const deleteReportResponse = await deleteReport(reportId);
    if (deleteReportResponse.code === 200) {
      Alert.alert("Reporte", deleteReportResponse.message);
    }
    if (deleteReportResponse.status === 401) {
      Alert.alert("Error", deleteReportResponse.error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.report}>
        <Text style={styles.title}>{report.title}</Text>
        <Text style={styles.titleLeft}>
          <Text style={styles.bold}>Realizado por: </Text>
          <Text>
            {report.user.name} {report.user.lastname}
          </Text>
        </Text>

        <Text style={styles.state}>
          <Text style={styles.bold}>Estado: </Text>
          <Text>{report.state}</Text>
        </Text>

        <Text style={[styles.titleLeft, styles.bold]}>Descripción: </Text>
        <Text style={styles.description}>{report.description}</Text>

        <Text style={[styles.titleLeft, styles.bold]}>Ubicación:</Text>
        <MapView
          style={styles.map}
          region={{
            latitude: Number(report.coordenates.latitude),
            longitude: Number(report.coordenates.longitude),
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          <Marker
            coordinate={{
              latitude: Number(report.coordenates.latitude),
              longitude: Number(report.coordenates.longitude),
            }}
          />
        </MapView>

        <Text style={[styles.titleLeft, styles.bold]}>Detalles:</Text>
        {details.length > 0 ? (
          details.map((x) => (
            <Text style={styles.description} key={x.id}>
              {x.updateDetail}
            </Text>
          ))
        ) : (
          <Text style={styles.description}>
            No hay Detalles sobre este Reporte
          </Text>
        )}
        <Image source={{ uri: report.imgURL }} style={styles.image} />
        
        {canDelete && (
          <Button mode="outlined" onPress={() => onDeleteReport(report.id)}>
            Eliminar
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get("window").width - 150,
  },
  image: {
    width: 350,
    height: 250,
  },
  report: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    textAlign: "center",
    paddingBottom: 10,
  },
  title: {
    fontSize: 30,
    marginLeft: 20,
  },
  titleLeft: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 40,
    marginBottom: 25,
  },
  state: {
    marginLeft: 230,
  },
});
