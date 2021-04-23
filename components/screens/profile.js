import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/authContext";

import { useForm } from 'react-hook-form';
import { TextInput } from '../hook-form/index';
import ActivityIndicator from "./activityIndicator";

import AsyncStorage from "@react-native-community/async-storage";
import Button from "../ComponetsLogin/Button";

export default function Profile({ navigation: { navigate } }) {
  const { handleSubmit, control, reset, errors } = useForm();
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await fetch(
      "http://192.168.0.8:8080/user/byEmail/" +
      String((await AsyncStorage.getItem("userEmail"))),
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + (await AsyncStorage.getItem("userToken")),
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setUser(responseJson);
        setLoading(false)
        console.log(responseJson);
      });
  };

  const onDeleteUser = async (userEmail) => {
    await fetch("http://192.168.0.8:8080/user/" + String(userEmail), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await AsyncStorage.getItem("userToken")),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert("Usuario", responseJson.message);
        logout();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
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
              {user.name}
            </Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              {user.lastname}
            </Text>
          </View>

          <View style={styles.infoUserContainer}>
            <TextInput
              title="Identificacion"
              control={control}
              isPassword={false}
              name="idCard"
              rules={{
                required: {
                  value: true,
                  message: "*La Cédula es obligatoria*",
                },
              }}
              defaultValue={user.idCard}
              errorMessage={errors?.idCard?.message}
            />
            <TextInput
              title="Correo Electrónico"
              control={control}
              isPassword={false}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "*El Correo Electrónico es obligatorio*",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "*El Correo Electrónico debe tener un formato válido*",
                },
              }}
              defaultValue={String(user.email)}
              errorMessage={errors?.email?.message}
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              returnKeyType="next"
            />
            <TextInput
              title="Dirección"
              control={control}
              isPassword={false}
              name="direction"
              rules={{
                required: {
                  value: true,
                  message: "*La Dirección es obligatoria*",
                },
              }}
              defaultValue={String(user.direction)}
              errorMessage={errors?.direction?.message}
            />
          </View>

          <Button mode="outlined" onPress={() => logout()}>
            Cerrar sesion
      </Button>

          <Button mode="outlined" onPress={() => navigate("Reportes del Usuario")}>
            Mis Reportes
      </Button>

          <Button mode="contained" style={styles.bottonBorrar} onPress={() => onDeleteUser(user.email)}>
            Eliminar cuenta
      </Button>

        </ScrollView>
      )}
    </View>
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
  scrollView: {
    width: Dimensions.get("window").width,
  },
  bottonBorrar: {
    color: '#f13a59',
  }
});
