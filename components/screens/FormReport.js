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
import * as Location from "expo-location";

export default ({ navigation }) => {
  const { handleSubmit, control, reset, errors } = useForm();
  const [cityName, setCityName] = useState("");
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Error",
          "Se ha denegado el permiso para acceder a la Ubicación, no podrás realizar reportes"
        );
        return;
      }
    })();
  }, []);

  const getCurrentPositionAndCity = () => {
    (async () => {
      let locationCoordenates = await Location.getCurrentPositionAsync({});
      setLatitude(locationCoordenates.coords.latitude);
      setLongitude(locationCoordenates.coords.longitude);

      let locationData = await Location.reverseGeocodeAsync(coordenates);
      console.log(locationData[0].city);
      setCityName(locationData[0].city);
    })();
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Mapa")}
        >
          <Text style={styles.buttonText}>*Abrir Mapa*</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={getCurrentPositionAndCity}
        >
          <Text style={styles.buttonText}>
            *Seleccionar Ubicación + Ciudad*
          </Text>
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
