import React, { Component } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";

export default class App extends React.Component {
  createTwoButtonAlert = (msg) =>
    Alert.alert(
      "Reporte",
      msg,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
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
    fetch("http://192.168.0.7:8080/reports", {
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
    }).then((response) => response.json())
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
      <View style={{ margin: 20, marginTop: 100 }}>
        <Text>Descripción</Text>
        <TextInput
          placeholder="   Ingresa la descripción del Reporte"
          onChangeText={(text) => {
            this.setState({ description: text });
          }}
          style={{ borderWidth: 2, borderColor: "black", margin: 30 }}
        />

        <Text>Estado</Text>
        <TextInput
          placeholder="   Ingresa el Estado"
          onChangeText={(text) => {
            this.setState({ state: text });
          }}
          style={{ borderWidth: 2, borderColor: "black", margin: 30 }}
        />

        <Text>Privacidad</Text>
        <TextInput
          placeholder="   Ingresa la privacidad del Reporte"
          onChangeText={(text) => {
            this.setState({ privacy: text });
          }}
          style={{ borderWidth: 2, borderColor: "black", margin: 30 }}
        />

        <Text>Id de Usuario</Text>
        <TextInput
          placeholder="   Ingresa el ID de tu Usuario"
          onChangeText={(text) => {
            this.setState({ user: text });
          }}
          style={{ borderWidth: 2, borderColor: "black", margin: 30 }}
        />

        <Button
          title="Reportar"
          onPress={() => {
            this.submit();
          }}
        />
      </View>
    );
  }
}
