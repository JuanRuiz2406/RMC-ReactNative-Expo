import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { FAB, Portal, Provider } from "react-native-paper";
import { theme } from "../core/theme";

import Button from "../ComponetsLogin/Button";

import { ThemeProvider, useRoute } from "@react-navigation/native";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);
export default ({ navigation: { goBack } }) => {
  const route = useRoute();

  const [showMarker, setShowMarker] = useState(false);
  const [settingLatitude, setSettingLatitude] = useState(0);
  const [settingLongitude, setSettingLongitude] = useState(0);
  const [fab, setFab] = useState({ open: false });

  const onStateChange = ({ open }) => setFab({ open });

  const { open } = fab;

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
    chooseLocation();
  };

  const handleLongPress = async ({ nativeEvent }) => {
    setSettingLatitude(nativeEvent.coordinate.latitude);
    setSettingLongitude(nativeEvent.coordinate.longitude);

    setShowMarker(true);

    console.log(settingLatitude, settingLongitude);
  };

  const chooseLocation = () => {
    route.params.setLatitude(settingLatitude);
    route.params.setLongitude(settingLongitude);

    console.log(settingLatitude, settingLongitude);

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

      <Provider>
        <Portal>
          <FAB.Group
            style={styles.fab}
            open={open}
            icon={open ? "map-marker" : "dots-vertical"}
            color="#03A9F4"
            fabStyle={{ backgroundColor: "#011B42" }}
            actions={[
              {
                icon: "map-outline",
                label: "Mi Ubicacion",
                color: "#fff",
                style: { backgroundColor: "#009de0" },
                onPress: () => chooseActualCoordenates(),
              },
              {
                icon: "map-marker-check",
                label: "Punto Selecionado",
                color: "#fff",
                style: { backgroundColor: "#0277BD" },
                onPress: () => chooseLocation(),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              //hola
            }}
          />
        </Portal>
      </Provider>
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
    height: Dimensions.get("window").height,
  },
  button: {
    backgroundColor: "#F8A513",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  buttonViewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: "2%",
  },
  label: {
    textAlign: "center",
    marginTop: "1%",
    marginBottom: "2%",
    fontSize: 25,
  },
  fab: {
    color: "#03A9F4",
  },
});
