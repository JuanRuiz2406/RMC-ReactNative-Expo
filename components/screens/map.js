import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { useRoute } from "@react-navigation/native";

export default ({ navigation: { goBack } }) => {
  const route = useRoute();

  const [showMarker, setShowMarker] = useState(false);
  const [settingLatitude, setSettingLatitude] = useState(0);
  const [settingLongitude, setSettingLongitude] = useState(0);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Error",
          "No se pudo acceder a los permisos de ubicación, no podrás hacer reportes."
        );
        return;
      }

      let location = await getCurrentPositionAsync({});
      setSettingLatitude(location.coords.latitude);
      setSettingLongitude(location.coords.longitude);
    })();
  }, []);

  const chooseActualCoordenates = () => {
    setShowMarker(false);

    (async () => {
      let location = await getCurrentPositionAsync({});
      setSettingLatitude(location.coords.latitude);
      setSettingLongitude(location.coords.longitude);

      let locationData = await reverseGeocodeAsync({
        latitude: settingLatitude,
        longitude: settingLongitude,
      });
      setCityName(locationData[0].city);
    })();

    chooseLocation();
  };

  const handleLongPress = async ({ nativeEvent }) => {
    (async () => {
      let locationData = await reverseGeocodeAsync({
        latitude: nativeEvent.coordinate.latitude,
        longitude: nativeEvent.coordinate.longitude,
      });

      let locationResponse = locationData[0];
      setCityName(locationResponse.city);
    })();

    setSettingLatitude(nativeEvent.coordinate.latitude);
    setSettingLongitude(nativeEvent.coordinate.longitude);

    setShowMarker(true);

    console.log(settingLatitude, settingLongitude, cityName);
  };

  const chooseLocation = () => {
    route.params.setLatitude(settingLatitude);
    route.params.setLongitude(settingLongitude);
    route.params.setCityName(cityName);

    console.log(settingLatitude, settingLongitude, cityName);

    goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        region={{
          latitude: settingLatitude,
          longitude: settingLongitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        onLongPress={handleLongPress}
      >
        {showMarker ? (
          <Marker
            coordinate={{
              latitude: settingLatitude,
              longitude: settingLongitude,
            }}
          />
        ) : null}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={chooseActualCoordenates}>
        <Text style={styles.buttonText}>Enviar Mi Ubicación Actual</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={chooseLocation}>
        <Text style={styles.buttonText}>Enviar Punto Seleccionado</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 255,
  },
  button: {
    backgroundColor: "#008652",
    padding: 7,
    width: Dimensions.get("window").width,
    marginBottom: 5,
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
});
