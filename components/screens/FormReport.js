import React, { useState } from "react";
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

export default ({ navigation: { navigate } }) => {
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

  if (latitude !== 0 && longitude !== 0 && cityName == "") {
    (async () => {
      let locationData = await reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });

      let locationResponse = locationData[0];
      setCityName(locationResponse.city);
    })();
  }

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
          style={[styles.button, styles.orange]}
          onPress={() =>
            navigate("Mapa", {
              setLatitude: setLatitude,
              setLongitude: setLongitude,
              setCityName: setCityName,
            })
          }
        >
          <Text style={styles.buttonText}>*Seleccionar Ubicación*</Text>
        </TouchableOpacity>

        <Text style={styles.textPhoto}>Lat: {latitude}</Text>
        <Text style={styles.textPhoto}>Lon: {longitude}</Text>
        <Text style={styles.textPhoto}>City: {cityName}</Text>

        <Text style={styles.textPhoto}>*Fotos*</Text>

        <TouchableOpacity
          style={[styles.button, styles.green]}
          onPress={handleSubmit(onSubmitReport)}
        >

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
    backgroundColor: "#008652",
  },
  orange: {
    backgroundColor: "#FEB139",
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
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#0e101c",
  },
  scrollView: {
    width: Dimensions.get("window").width,
  },
});
