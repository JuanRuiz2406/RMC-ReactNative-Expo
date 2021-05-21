import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useForm } from "react-hook-form";
import { TextInput, Picker } from "../hook-form/index";
import { reverseGeocodeAsync } from "expo-location";
import { getReportById, getReportDetails, newReport } from "../services/reports";
import * as ImagePicker from 'expo-image-picker';
import * as firebase from "firebase";
import { newPhotography } from "../services/photography";

export default ({ navigation: { navigate } }) => {
  const { handleSubmit, control, reset, errors } = useForm();
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const pickerOptions = ["Público", "Privado"];
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (latitude !== 0) {
      updateCoordenadesAndCityName();
    }
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [latitude, longitude]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
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

  const onSubmitReport = async (data) => {
    console.log(data);

    reset({
      title: "",
      description: "",
    });
    const uploadUrl = await uploadImageAsync(image);
    console.log(uploadUrl);
    const reportResponse = await newReport(data, user, coordenates, cityName, uploadUrl.toString());
    Alert.alert("Reporte", reportResponse.message);
    console.log(reportResponse);
    if (reportResponse.code === 200) {
      Alert.alert("Reporte", reportResponse.message);
    }
    if (reportResponse.status === 401) {
      Alert.alert(
        "Error de Autenticación (logee nuevamente o *retirar user*)",
        reportResponse.error
      );
    }
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
          <Text style={styles.buttonText}>*Tomar Foto*</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.orange]}
          onPress={pickImage}
        >
          <Text style={styles.buttonText}>*Seleccionar Fotos*</Text>
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

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  let filename = uri.substring(uri.lastIndexOf('/') + 1);
  const extension = filename.split('.').pop();
  const name = filename.split('.').slice(0,-1).join('.');
  filename = name + Date.now() + '.' + extension;

  const ref = firebase.storage().ref().child(filename);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}