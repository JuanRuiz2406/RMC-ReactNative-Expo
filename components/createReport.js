import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

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
  Btn: {
    color: "#F7751E",
    marginTop: 50,
  },
  button: {
    backgroundColor: "#FEB139",
    padding: 7,
    marginLeft: 120,
    marginRight: 120,
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
      description: "",
      state: "",
      privacy: "",
      user: "",
    };
  }

  submit() {
    fetch("http://192.168.0.3:8080/reports", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: this.state.description,
        state: this.state.state,
        privacy: this.state.privacy,
        user: this.state.user,
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
        <Text style={styles.Title}>Crear Reporte</Text>

        
        <Text style={styles.Text}>Descripción</Text>
        <TextInput
          placeholder="   Ingresa la descripción del Reporte"
          onChangeText={(text) => {
            this.setState({ description: text });
          }}
          style={styles.InputText}
        />

        <Text style={styles.Text}>Estado</Text>
        <TextInput
          placeholder="   Ingresa el Estado"
          onChangeText={(text) => {
            this.setState({ state: text });
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

        <Text style={styles.Text}>Id de Usuario</Text>
        <TextInput
          placeholder="   Ingresa el ID de tu Usuario"
          onChangeText={(text) => {
            this.setState({ user: text });
          }}
          style={styles.InputText}
        />

        <TouchableOpacity
          onPress={() => this.submit()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Reportar</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
