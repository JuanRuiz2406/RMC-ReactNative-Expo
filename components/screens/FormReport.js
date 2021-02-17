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
import * as Location from "expo-location";
import { TextInput, Picker } from "../index";

export default () => {
  const { handleSubmit, control, reset, errors } = useForm();
  const [showMap, setShowMap] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const pickerOptions = ["Público", "Privado"];

  const coordenates = {
    latitude: latitude,
    longitude: longitude,
  };
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
  const municipality = {
    id: 1,
    name: "string",
    adress: "string",
    email: "string@email.com",
    telephone: "string",
    schedule: "string",
    webSite: "string",
    coordenates: {
      id: 1,
      latitude: "string",
      longitude: "string",
    },
  };

  const onSubmitReport = (data) => {
    console.log(data);

    reset({
      title: "",
      description: "",
    });

    fetch("http://192.168.0.2:8080/report", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        state: "Nuevo",
        privacy: data.privacy,
        user: user,
        coordenates: coordenates,
        municipality: municipality,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert("Reporte", responseJson.messageString);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(errors);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      //let location2 = await Location.reverseGeocodeAsync(coordenates);
    })();
  }, []);

  const map = () => {
    setShowMap(!showMap);
  };

  return (
    <View>
      <ScrollView style={styles.scrollView}>
        <TextInput
          title="Título"
          control={control}
          name="title"
          error={errors.title}
          errorMessage="*El título es requerido*"
        />

        <TextInput
          title="Descripción"
          control={control}
          name="description"
          error={errors.description}
          errorMessage="*Por favor describa su reporte*"
        />

        <Picker
          title="Privacidad"
          control={control}
          name="privacy"
          error={errors.privacy}
          errorMessage="*Selecciona alguna opción*"
          pickerOptions={pickerOptions}
        />

        <TouchableOpacity style={styles.button} onPress={map}>
          <Text style={styles.buttonText}>*Ubicacion*</Text>
        </TouchableOpacity>

        <Text style={styles.textPhoto}>*Fotos*</Text>

        <TouchableOpacity
          style={styles.button}
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
  button: {
    backgroundColor: "#FEB139",
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
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#0e101c",
  },
  scrollView: {
    width: Dimensions.get("window").width,
  },
});