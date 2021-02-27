import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";
import * as Location from "expo-location";

export default () => {
  const [Latitude, setLatitude] = useState(10.62947078326518);
  const [Longitude, setLongitude] = useState(-85.44107408966472);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const onChangeCoordenates = () => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      console.log(Latitude);
      console.log(Longitude);
      //let location2 = await Location.reverseGeocodeAsync(coordenates);
    })();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: Latitude,
          longitude: Longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        showsUserLocation
      />
      <Text>{Latitude}</Text>
      <Text>{Longitude}</Text>
      <Button onPress={onChangeCoordenates} title="Actualizar" />
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
