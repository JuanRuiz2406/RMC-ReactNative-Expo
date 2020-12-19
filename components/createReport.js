import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import foto from "../imgs/huracan-otto.jpg";
import foto2 from "../imgs/map2.jpg";

const styles = StyleSheet.create({
  Title: {
    textAlign: "center",
    fontSize: 25,
    margin: 20,
    fontWeight: "bold",
  },
  InputText: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    fontSize: 20,
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 40,
  },
  Img: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    width: 350,
    height: 200,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FEB139",
    padding: 7,
    marginLeft: 120,
    marginRight: 120,
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
});

export default class App extends React.Component {
  createTwoButtonAlert = (msg) =>
    Alert.alert(
      "Reporte",
      msg,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );

  constructor() {
    super();
    this.state = {
      title: "Tit1",
      description: "",
      state: "Pendiente",
      privacy: "",
      user: {
        direction: "string",
        email: "string@email.com",
        id: 1,
        idCard: "string",
        lastname: "string",
        name: "string",
        password: "string",
        role: "string"
      },
      coordenates: {
        id: 1,
        latitude: "string",
        longitude: "string"
      },
      municipality: {
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
          longitude: "string"
        }
      }
    };
  }

  submit() {
    fetch("http://192.168.0.13:8080/report", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        state: this.state.state,
        privacy: this.state.privacy,
        user: this.state.user,
        coordenates: this.state.coordenates,
        municipality: this.state.municipality,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          this.createTwoButtonAlert(responseJson.messageString)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Text style={styles.Title}>Crear Reporte</Text>

          <Text style={styles.Text}>Inserte una Imágen</Text>
          <Image style={styles.Img} source={foto}></Image>

          <Text style={styles.Text}>Escoge la Ubicación</Text>
          <Image style={styles.Img} source={foto2}></Image>

          <Text style={styles.Text}>Descripción</Text>
          <TextInput
            placeholder="   Ingresa la descripción del Reporte"
            onChangeText={(text) => {
              this.setState({ description: text });
            }}
            style={styles.InputText}
          />

          <Text style={styles.Text}>Privacidad</Text>
          <TextInput
            placeholder="   Ingresa la privacidad del Reporte"
            onChangeText={(text) => {
              this.setState({ privacy: text });
            }}
            style={styles.InputText}
          />

          <TouchableOpacity onPress={() => this.submit()} style={styles.button}>
            <Text style={styles.buttonText}>Reportar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
