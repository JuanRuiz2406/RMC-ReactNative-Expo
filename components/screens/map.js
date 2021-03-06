import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";

export default ({ navigation: { goBack } }) => {
  const route = useRoute();

  const [showMarker, setShowMarker] = useState(false);
  const [settingLatitude, setSettingLatitude] = useState(0);
  const [settingLongitude, setSettingLongitude] = useState(0);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Error",
          "No se pudo acceder a los permisos de ubicación, no podrás hacer reportes."
        );
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setSettingLatitude(location.coords.latitude);
      setSettingLongitude(location.coords.longitude);
    })();
  }, []);

  const chooseActualCoordenates = () => {
    setShowMarker(false);

    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setSettingLatitude(location.coords.latitude);
      setSettingLongitude(location.coords.longitude);

      let locationData = await Location.reverseGeocodeAsync({
        latitude: settingLatitude,
        longitude: settingLongitude,
      });
      setCityName(locationData[0].city);
    })();

    chooseLocation();
  };

  const handleLongPress = async ({ nativeEvent }) => {
    (async () => {
      let locationData = await Location.reverseGeocodeAsync({
        latitude: nativeEvent.coordinate.latitude,
        longitude: nativeEvent.coordinate.longitude,
      });

      let locationReponse = locationData[0];
      setCityName(locationReponse.city);
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
      <Button
        onPress={chooseActualCoordenates}
        title="Enviar Mi Ubicación Actual"
      />
      <Button onPress={chooseLocation} title="Enviar Punto Seleccionado" />
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
    height: Dimensions.get("window").height - 235,
  },
});
