import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import * as Location from "expo-location";

export default () => {
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      console.log(Latitude)
      console.log(Longitude)
      //let location2 = await Location.reverseGeocodeAsync(coordenates);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: Latitude,
          longitude: Longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
