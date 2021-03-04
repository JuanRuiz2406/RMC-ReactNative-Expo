import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Button,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";

export default ({ navigation: { goBack } }) => {
  const route = useRoute();

  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [markerLatitude, setMarkerLatitude] = useState(0);
  const [markerLongitude, setMarkerLongitude] = useState(0);
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
      setUserLatitude(location.coords.latitude);
      setUserLongitude(location.coords.longitude);
    })();
  }, []);

  const onChangeActualCoordenates = () => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setUserLatitude(location.coords.latitude);
      setUserLongitude(location.coords.longitude);

      let locationData = await Location.reverseGeocodeAsync({
        latitude: userLatitude,
        longitude: userLongitude,
      });
      setCityName(locationData[0].city);
    })();

    setSettingLatitude(userLatitude);
    setSettingLongitude(userLongitude);
  };

  const handleLongPress = async ({ nativeEvent }) => {
    setMarkerLatitude(nativeEvent.coordinate.latitude);
    setMarkerLongitude(nativeEvent.coordinate.longitude);

    (async () => {
      let locationData = await Location.reverseGeocodeAsync({
        latitude: markerLatitude,
        longitude: markerLongitude,
      });

      let locationReponse = locationData[0];
      setCityName(locationReponse.city);
    })();

    setSettingLatitude(markerLatitude);
    setSettingLongitude(markerLongitude);

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
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        onLongPress={handleLongPress}
      >
        <MapView.Marker
          coordinate={{
            latitude: settingLatitude,
            longitude: settingLongitude,
          }}
        />
      </MapView>
      <Text>{settingLatitude}</Text>
      <Text>{settingLongitude}</Text>
      <Button
        onPress={onChangeActualCoordenates}
        title="Marcar Mi Ubicación Actual"
      />
      <Button onPress={chooseLocation} title="Seleccionar" />
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
    height: Dimensions.get("window").height - 300,
  },
});
