import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import CarouselProfile from "../carousel/index";
import ActivityIndicator from "./activityIndicator";
import { List } from "../report/index";

export default () => {
  const [loadingReports, setLoadingReports] = useState(true);
  const [reports, setReports] = useState([]);

  const user = {
    direction: "string",
    email: "string@email.com",
    id: 1,
    idCard: "string",
    lastname: "string",
    name: "string",
    password: "string",
    role: "string",
  };

  const fetchUserReports = async () => {
    const response = await fetch(
      "http://192.168.0.2:8080/report/byUserIdCard/" + user.idCard
    );
    const data = await response.json();
    setReports(data);
    setLoadingReports(false);
  };

  useEffect(() => {
    fetchUserReports();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D" />
          <Ionicons name="md-more" size={24} color="#52575D" />
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../../image/Diego.jpg")}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <View style={styles.add}>
            <Ionicons name="ios-add" size={40} color="#FEB139" />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            Diego
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            Villarreal
          </Text>
        </View>

        <View style={styles.infoUserContainer}>
          <Text style={styles.textTitle}>Cédula:</Text>
          <Text style={styles.textSecond}>5 0420 0201</Text>
          <Text style={styles.textTitle}>Correo Electrónico:</Text>
          <Text style={styles.textSecond}>diegovillatj@gmail.com</Text>
          <Text style={styles.textTitle}>Contraseña:</Text>
          <Text style={styles.textSecond}>*******</Text>
          <Text style={styles.textTitle}>Provincia:</Text>
          <Text style={styles.textSecond}>Guanacaste</Text>
          <Text style={styles.textTitle}>Cantón:</Text>
          <Text style={styles.textSecond}>Liberia</Text>
          <Text style={styles.textTitle}>Numero de Celular:</Text>
          <Text style={styles.textSecond}>+506 8888 8888</Text>
        </View>
        {/* <CarouselProfile data={this.state.dataSource} /> */}

        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
          *Botón para redirigir a vista de reportes?*
        </Text>
      </ScrollView>

      {loadingReports ? (
        <ActivityIndicator />
      ) : (
        <List reports={reports} onPress={null} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    overflow: "hidden",
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  infoUserContainer: {
    alignSelf: "auto",
    alignItems: "flex-start",
    marginLeft: 20,
    marginTop: 20,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "normal",
    lineHeight: 50,
  },
  textSecond: {
    fontSize: 25,
    fontWeight: "normal",
    marginLeft: 40,
    color: "#AEB5BC",
  },
});
