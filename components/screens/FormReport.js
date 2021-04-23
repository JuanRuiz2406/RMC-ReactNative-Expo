import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { useForm } from "react-hook-form";
import { TextInput, Picker } from "../hook-form/index";
import { reverseGeocodeAsync } from "expo-location";
import AsyncStorage from "@react-native-community/async-storage";

export default ({ navigation: { navigate } }) => {
  const { handleSubmit, control, reset, errors } = useForm();
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [token, setToken] = useState("");
  const pickerOptions = ["Público", "Privado"];

  useEffect(() => {
    if (token === "") {
      getToken();
    } else {
      updateCoordenadesAndCityName();
    }
  }, [latitude, longitude]);

  const getToken = async () => {
    const tokenInStorage = await AsyncStorage.getItem("userToken");

    setToken(tokenInStorage);
  };

  const updateCoordenadesAndCityName = async () => {
    let locationData = await reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });

    let locationResponse = locationData[0];
    setCityName(locationResponse.city);
  };

  const coordenates = {
    latitude: latitude,
    longitude: longitude,
  };
  const user = {
    id: 1,
    idCard: "117990636",
    name: "Juan",
    lastname: "Ruiz",
    email: "juan@rmc.com",
    password: "$2a$10$gcYU0ucYM4vk3kG5LBKP8u9cm1Jg/x02SjP4DDtoY2AQvJpitwDtm",
    role: "RMCTeam",
    direction: "Casa",
  };

  const onSubmitReport = (data) => {
    console.log(data);

    reset({
      title: "",
      description: "",
    });

    fetch("http://192.168.0.2:8080/report/city/" + String(cityName), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        state: "Nuevo",
        privacy: data.privacy,
        user: user,
        coordenates: coordenates,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert("Reporte", responseJson.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(errors);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput
          title="Título"
          control={control}
          isPassword={false}
          name="title"
          rules={{
            required: {
              value: true,
              message: "*El título es requerido*",
            },
          }}
          defaultValue=""
          errorMessage={errors?.title?.message}
        />

        <TextInput
          title="Descripción"
          control={control}
          isPassword={false}
          name="description"
          rules={{
            required: {
              value: true,
              message: "*Por favor describa su reporte*",
            },
          }}
          defaultValue=""
          errorMessage={errors?.description?.message}
        />

        <Picker
          title="Privacidad"
          control={control}
          name="privacy"
          error={errors.privacy}
          errorMessage="*Selecciona alguna opción*"
          pickerOptions={pickerOptions}
        />

        <TouchableOpacity
          style={[styles.button, styles.orange]}
          onPress={() =>
            navigate("Mapa", {
              setLatitude: setLatitude,
              setLongitude: setLongitude,
            })
          }
        >
          <Text style={styles.buttonText}>*Seleccionar Ubicación*</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.orange]}
          onPress={() => navigate("Cámara")}
        >
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.orange]}
          onPress={() => navigate("Seleccionar Fotos")}
        >
          <Text style={styles.buttonText}>Seleccionar Fotos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.green]}
          onPress={handleSubmit(onSubmitReport)}
        >
          <Text style={styles.buttonText}>Reportar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textPhoto: {
    margin: 20,
    marginTop: 25,
    marginLeft: 40,
    fontSize: 18,
  },
  green: {
    backgroundColor: "#3CBA69",
  },
  orange: {
    backgroundColor: "#F8A513",
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
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    width: Dimensions.get("window").width,
  },
});
