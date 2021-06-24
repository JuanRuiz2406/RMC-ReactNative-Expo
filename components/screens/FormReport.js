import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import ActivityIndicator from "./activityIndicator";
import { useForm } from "react-hook-form";
import { TextInput, Picker } from "../hook-form/index";
import { reverseGeocodeAsync } from "expo-location";
import { newReport } from "../services/reports";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { newPhotography } from "../services/photography";
import AsyncStorage from "@react-native-community/async-storage";
import Button from "../ComponetsLogin/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { CarouselImg } from "../report/index";

export default ({ navigation: { navigate } }) => {
  const { handleSubmit, control, reset, errors } = useForm();
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const pickerOptions = ["Público", "Privado"];

  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  let images = "";

  useEffect(() => {
    if (latitude !== 0) {
      updateCoordenadesAndCityName();
    }
    (async () => {
      if (user === null) {
        setUser(JSON.parse(await AsyncStorage.getItem("user")));
      }

      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, [latitude, longitude]);

  const pickImage = async () => {
    //console.log(image);
    navigate("Seleccionar Multiples Fotos", {
      setImage: setImage,
    });
    images = image.split(",");
    console.log(images);
  };
  const updateCoordenadesAndCityName = async () => {
    let locationData = await reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });

    let locationResponse = locationData[0];
    setCityName(locationResponse.city);
  };

  const saveImages = async (reportResponse) => {
    const images = image.split(",");
    for (const img of images) {
      console.log(img);
      const uploadUrl = await uploadImageAsync(img);
      await newPhotography(uploadUrl, reportResponse);
      console.log("subida");
    }
  };

  const coordenates = {
    latitude: latitude,
    longitude: longitude,
  };

  const onSubmitReport = async (data) => {
    console.log(data);

    setLoading(true);

    reset({
      title: "",
      description: "",
    });
    //const uploadUrl = await uploadImageAsync(image);
    const uploadUrl = "image";
    console.log(uploadUrl);
    const reportResponse = await newReport(
      data,
      user,
      coordenates,
      cityName,
      uploadUrl.toString()
    );

    console.log(reportResponse);

    if (reportResponse.code === 400) {
      Alert.alert("Error", reportResponse.message);
    } else if (reportResponse.status === 401) {
      Alert.alert(
        "Error de Autenticación (logee nuevamente o *retirar user*)",
        reportResponse.error
      );
    } else if (reportResponse != null) {
      saveImages(reportResponse);
      Alert.alert("Reporte", "Reporte guardado exitosamente");
    }

    setLoading(false);
  };

  console.log(errors);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.viewIn}>
            <Text style={styles.label}>Información</Text>
            <TextInput
              title="Título"
              control={control}
              isPassword={false}
              name="title"
              rules={{
                required: {
                  value: true,
                  message: "¡El título es requerido!",
                },
              }}
              defaultValue=""
              errorMessage={errors?.title?.message}
              placeholder={"Escriba aquí"}
              leftIconName="format-title"
            />

            <TextInput
              title="Descripción"
              control={control}
              isPassword={false}
              name="description"
              rules={{
                required: {
                  value: true,
                  message: "¡Por favor describa su reporte!",
                },
              }}
              defaultValue=""
              errorMessage={errors?.description?.message}
              placeholder={"Escriba aquí"}
              leftIconName="text"
            />

            <Picker
              title="Privacidad"
              control={control}
              name="privacy"
              error={errors.privacy}
              errorMessage="*Selecciona alguna opción*"
              pickerOptions={pickerOptions}
            />

            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 0.5,
                marginBottom: "4%",
                marginTop: "4%",
              }}
            ></View>

            <Text style={styles.label}>Multimedia</Text>

            <Button
              mode="contained"
              onPress={() =>
                navigate("Mapa", {
                  setLatitude: setLatitude,
                  setLongitude: setLongitude,
                })
              }
            >
              <Icon style={styles.icon} name="location-arrow" />
            </Button>

            <View style={styles.buttonViewContainer}>
              <Button
                style={styles.button}
                mode="contained"
                onPress={() =>
                  navigate("Cámara", {
                    setImage: setImage,
                  })
                }
              >
                <Icon style={styles.icon} name="camera" />
              </Button>

              <Button
                style={styles.button}
                mode="contained"
                onPress={pickImage}
              >
                <Icon style={styles.icon} name="image" />
              </Button>
            </View>
            <View>
              {image === null ? (
                <View></View>
              ) : (
                <CarouselImg photos={image.split(",")} />
              )}
            </View>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 0.5,
                marginBottom: "4%",
                marginTop: "4%",
              }}
            ></View>

            <Button
              mode="contained"
              style={styles.green}
              onPress={handleSubmit(onSubmitReport)}
            >
              Reportar
            </Button>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    borderRadius: 3,
  },
  textPhoto: {
    margin: 20,
    marginTop: 25,
    marginLeft: 40,
    fontSize: 18,
  },
  green: {
    backgroundColor: "#3CBA69",
    margin: "10%",
  },
  orange: {
    backgroundColor: "#F8A513",
  },
  button: {
    width: "45%",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#F6F7F9",
    width: Dimensions.get("window").width,
  },
  scrollView: {
    backgroundColor: "#fff",
  },
  viewIn: {
    margin: "3%",
  },
  buttonViewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    fontSize: 26,
  },
  label: {
    textAlign: "center",
    marginTop: "1%",
    marginBottom: "2%",
    fontSize: 25,
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

  let filename = uri.substring(uri.lastIndexOf("/") + 1);
  const extension = filename.split(".").pop();
  const name = filename.split(".").slice(0, -1).join(".");
  filename = name + Date.now() + "." + extension;

  const ref = firebase.storage().ref().child(filename);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
