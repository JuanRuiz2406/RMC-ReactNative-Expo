import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/authContext";

export default function Profile() {

  const { logout } = useContext(AuthContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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

      <TouchableOpacity
        style={styles.RegisterButton}
        onPress={() => { logout() }}
      >
        <Text style={styles.buttonText}>Cerrar Sesion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  RegisterButton: {
    marginVertical: 32,
  },
});
