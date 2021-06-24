import React from "react";
import Background from "../ComponetsLogin/Background";
import Logo from "../ComponetsLogin/Logo";
import Header from "../ComponetsLogin/Header";
import Button from "../ComponetsLogin/Button";
import Paragraph from "../ComponetsLogin/Paragraph";
import { View, StyleSheet, Dimensions } from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <View style={styles.scrollView}>
        <Logo  style={styles.logo}/>
      </View>
      <Header>Inicio de sesion</Header>
      <Paragraph>
        Reporta lo que necesites, que el pueblo te escuche...
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Inicia Sesion
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Crear una cuenta
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: Dimensions.get("window").width,
  },
  logo: {
    width: Dimensions.get("window").width,
  },
});
