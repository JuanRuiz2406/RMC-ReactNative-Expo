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
import { CarouselImg } from "../report/index";
import { Card, Title, Chip, List } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
export default ({ report, details, photos }) => {
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
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Reporte</Text>
      </View>
      <View style={styles.report}>
        <Card>
          <Card.Content>
            <View>
              <View style={styles.viewRow}>
                <Text style={styles.title}>{report.title}</Text>
              </View>
              <Text style={styles.titleLeft}>
                <Text style={styles.bold}>
                  <AntDesign name="calendar" size={24} color="grey" /> Fecha:
                  <Text style={styles.date}>{report.createdAt}</Text>
                </Text>
              </Text>
              <Text style={styles.titleLeft}>
                <AntDesign name="user" size={24} color="grey" />
                <Text style={styles.bold}> Realizado por: </Text>
                <Text>
                  {report.user.name} {report.user.lastname}
                </Text>
              </Text>
              <Text style={styles.titleLeft}>
                <Ionicons name="newspaper-outline" size={24} color="grey" />
                <Text style={styles.bold}> Descripción:</Text>
              </Text>
              <Text style={styles.description}>- {report.description}</Text>

              <Text style={styles.titleLeft}>
                <Chip
                  style={{
                    backgroundColor:
                      report.state === "Aceptado"
                        ? "#4caf50"
                        : report.state === "Procesando"
                        ? "#ff9800"
                        : report.state === "Rechazado"
                        ? "#FF0000"
                        : "#0277BD",
                    marginRight: "70.5%",
                  }}
                  selectedColor="#fff"
                >
                  {report.state}
                </Chip>
              </Text>
            </View>
          </Card.Content>
        </Card>

        <View>
          <Card style={{ marginTop: "5%" }}>
            <Card.Content>
              <Text style={styles.titleLeft}>
                <EvilIcons name="location" size={24} color="grey" />
                <Text style={styles.bold}> Ubicación</Text>
              </Text>

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
            </Card.Content>
          </Card>
        </View>

        <View>
          <Card style={{ marginTop: "5%" }}>
            <Card.Content>
              <Text style={styles.titleLeft}>
                <Ionicons name="md-chatbox-outline" size={24} color="grey" />
                <Text style={styles.bold}> Detalles</Text>
              </Text>

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
            </Card.Content>
          </Card>
        </View>

        <View>
          <Card style={{ marginTop: "5%" }}>
            <Card.Content>
              <Text style={styles.titleLeft}>
                <FontAwesome name="file-photo-o" size={24} color="grey" />
                <Text style={styles.bold}> Fotos</Text>
              </Text>

              <CarouselImg photos={photos} />
            </Card.Content>
          </Card>
        </View>

        {canDelete && (
          <Button
            style={styles.bottonBorrar}
            mode="contained"
            onPress={() => onDeleteReport(report.id)}
          >
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
    width: "100%",
    height: 250,
    borderRadius: 3,
  },
  report: {
    marginTop: "5%",
    marginBottom: "5%",
    marginLeft: "5%",
    marginRight: "4%",
    textAlign: "center",
    paddingBottom: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: "3%",
    alignSelf: "center",
    marginTop: "3%",
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
    margin: "5%",
    marginTop: "10%",
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "3%",
  },
  date: {
    fontSize: 20,
    marginTop: "20%",
    fontWeight: "normal",
  },
  viewTitle: {
    backgroundColor: "#fff",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
});
