import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/authContext";
import AsyncStorage from "@react-native-community/async-storage";
import Button from "../ComponetsLogin/Button";

export default function Profile({ navigation: { navigate } }) {
  const { logout } = useContext(AuthContext);
  const { name, setName } = useState("");

  const user = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    idCard: "",
    direction: "",
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await fetch(
      "http://192.168.0.2:8080/user/byEmail/" +
        (await AsyncStorage.getItem("userEmail")),
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await AsyncStorage.getItem("userToken")),
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const userTemp = JSON.parse(JSON.stringify(responseJson));
        setName(userTemp.name);
        user.lastName = userTemp.lastname;
        user.email = userTemp.email;
        user.password = userTemp.password;
        user.idCard = userTemp.idCard;
        user.direction = userTemp.direction;
        console.log(name);
      });
  };

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
          {name}
        </Text>
        <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
          {user.lastName}
        </Text>
      </View>

      <View style={styles.infoUserContainer}>
        <Text style={styles.textTitle}>Cédula:</Text>
        <Text style={styles.textSecond}>{user.idCard}</Text>
        <Text style={styles.textTitle}>Correo Electrónico:</Text>
        <Text style={styles.textSecond}>{user.email}</Text>
        <Text style={styles.textTitle}>Contraseña:</Text>
        <Text style={styles.textSecond}>*******</Text>
        <Text style={styles.textTitle}>Ciudad:</Text>
        <Text style={styles.textSecond}>{user.direction}</Text>
      </View>

      <Button mode="outlined" onPress={() => logout()}>
        Cerrar sesion
      </Button>

      <Button mode="outlined" onPress={() => navigate("Reportes del Usuario")}>
        Mis Reportes
      </Button>
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
  green: {
    backgroundColor: "#008652",
  },
  button: {
    padding: 7,
    marginTop: 25,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },
});
