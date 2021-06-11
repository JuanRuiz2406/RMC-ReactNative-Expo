import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/authContext";

import { useForm } from 'react-hook-form';
import { TextInput } from '../hook-form/index';
import ActivityIndicator from "./activityIndicator";

import AsyncStorage from "@react-native-community/async-storage";
import Button from "../ComponetsLogin/Button";
import { IconButton, Colors } from "react-native-paper";

import { deleteUser } from "../services/user";

export default function Profile({ navigation: { navigate } }) {
  const { handleSubmit, control, reset, errors } = useForm();
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);


  const loadUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
    setLoading(false);
    console.log(user);
  }

  const onDeleteUser = async (userEmail) => {

    const deleteResponse = await deleteUser(userEmail);
    console.log(deleteResponse);
    if (deleteResponse.code === 200) {
      Alert.alert(deleteResponse.message);
      logout();
    }
    if (deleteResponse.code === 401) {
      Alert.alert("Error al eliminar: ", deleteResponse.error);
    }
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
              <IconButton icon="pencil" size={30} color="#FEB139" />
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
              defaultValue="504200201"
              errorMessage={errors?.idCard?.message}
              leftIconName="id-card"
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
              leftIconName="at"
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
              leftIconName="location-arrow"
            />

            <TextInput
              title="Contraseña"
              control={control}
              isPassword={true}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "*La Contraseña es obligatoria*",
                },
                minLength: {
                  value: 8,
                  message: "*La Contraseña debe tener 8 caracteres mínimo*",
                },
              }}
              defaultValue={String(user.passdecode)}
              errorMessage={errors?.password?.message}
              leftIconName="lock"
            />
            <Button mode="outlined" onPress={() => navigate("Cambiar Contraseña")}>
              Cambiar Contraseña
              </Button>

            <Button mode="outlined" onPress={() => navigate("Reportes del Usuario")}>
              Mis Reportes
            </Button>

            <Button mode="contained" style={styles.bottonBorrar} onPress={() => onDeleteUser(user.email)}>
              Eliminar cuenta
            </Button>
          </View>



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
    marginTop: '4%',
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
    marginLeft: '3%',
    marginRight: '3%',
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
    backgroundColor: "#FF0000",
    margin: '5%',
    marginTop: '10%'
  },
  viewPass: {
    flexDirection: 'row',
    //justifyContent: 'space-around',
  },
});
