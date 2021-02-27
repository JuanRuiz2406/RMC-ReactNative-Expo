import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";

export default ({ navigation: { goBack } }) => {
  const route = useRoute();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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
    })();
  }, []);

  const onChangeCoordenates = () => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      let locationData = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });

      route.params.setLatitude(latitude);
      route.params.setLongitude(longitude);
      route.params.setCityName(locationData[0].city);

      console.log(latitude, longitude, locationData[0].city);
    })();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        showsUserLocation
      />
      <Text>{latitude}</Text>
      <Text>{longitude}</Text>
      <Button onPress={onChangeCoordenates} title="Actualizar" />
      <Button onPress={() => goBack()} title="Seleccionar" />
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
