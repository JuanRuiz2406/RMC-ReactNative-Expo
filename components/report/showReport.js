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
import { normalizeText } from "react-native-elements/dist/helpers";

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

        <View>
          <View style={styles.viewRow}>
            <Text style={styles.title}>{report.title}</Text>

            <Text style={styles.bold}>Fecha: <Text style={styles.date}>{report.createdAt}</Text></Text>
          </View>


          <Text style={styles.titleLeft}>
            <Text style={styles.bold}>Realizado por: </Text>
            <Text>
              {report.user.name} {report.user.lastname}
            </Text>
          </Text>

          <Text style={styles.titleLeft}>
            <Text style={styles.bold}>Estado: </Text>
            <Text
              style={{
                color: report.state === "Aceptado" ? '#3CBA69' :
                  report.state === "Procesando" ? '#fce63f' :
                    report.state === "Rechazado" ? '#FF0000' : '#F8A513'
              }}
            >
              {report.state}
            </Text>
          </Text>

          <Text style={[styles.titleLeft, styles.bold]}>Descripción: </Text>
          <Text style={styles.description}>{report.description}</Text>
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            marginBottom: "4%",
            marginTop: "4%",
          }}
        ></View>

        <View>
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
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            marginBottom: "4%",
            marginTop: "4%",
          }}
        ></View>


        <View>
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
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            marginBottom: "4%",
            marginTop: "4%",
          }}
        ></View>

        <View>
          <Text style={[styles.titleLeft, styles.bold]}>Fotos:</Text>
          <Image source={{ uri: report.imgURL }} style={styles.image} />
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            marginBottom: "4%",
            marginTop: "4%",
          }}
        ></View>

        {canDelete && (
          <Button style={styles.bottonBorrar} mode="contained" onPress={() => onDeleteReport(report.id)}>
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
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 3,
  },
  report: {
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '5%',
    marginRight: '4%',
    textAlign: "center",
    paddingBottom: 10,
  },
  title: {
    fontSize: 30,
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
  bottonBorrar: {
    backgroundColor: "#FF0000",
    margin: '5%',
    marginTop: '10%'
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: '3%',
  },
  date: {
    fontSize: 20,
    marginTop: '20%',
    fontWeight: 'normal',
  },
});
