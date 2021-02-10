import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import * as Location from "expo-location";

export default () => {
  const { handleSubmit, control, reset, errors } = useForm();
  const [priv, setPriv] = useState("Público");
  const [coordenates, setCoordenates] = useState({});

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

  const onSubmitCoordenates = (coordLatitude, coordLongitude) => {
    console.log(coordLatitude, coordLongitude);

    fetch("http://192.168.0.2:8080/coordenates", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: coordLatitude,
        longitude: coordLongitude,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setCoordenates(responseJson);
        Alert.alert("Ubicacion", "Ubicación seleccionada exitosamente");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      onSubmitCoordenates(location.coords.latitude, location.coords.longitude);

      //let location2 = await Location.reverseGeocodeAsync(coordenates);
      
    })();
  }, []);

  return (
    <View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.label}>Título</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="title"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.title && (
          <Text style={styles.errorMessage}>*El título es requerido.*</Text>
        )}

        <Text style={styles.label}>Descripción</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="description"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.description && (
          <Text style={styles.errorMessage}>
            *Por favor describa su reporte.*
          </Text>
        )}

        <Text style={styles.label}>Privacidad</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Picker
              onBlur={onBlur}
              selectedValue={priv}
              style={styles.picker}
              onValueChange={(itemValue, itemPosition) => {
                onChange(itemValue);
                setPriv(itemValue);
              }}
              value={value}
            >
              <Picker.Item label="Público" value="Público" />
              <Picker.Item label="Privado" value="Privado" />
            </Picker>
          )}
          name="privacy"
          defaultValue={priv}
        />

        <Text style={styles.label}>*Ubicacion*</Text>

        <Text style={styles.label}>*Fotos*</Text>

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
  label: {
    margin: 20,
    marginTop: 25,
    marginLeft: 40,
    fontSize: 18,
  },
  errorMessage: {
    marginLeft: 35,
    fontSize: 12,
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
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    height: 50,
    marginLeft: 30,
    marginRight: 30,
  },
  scrollView: {
    width: Dimensions.get("window").width,
  },
});
