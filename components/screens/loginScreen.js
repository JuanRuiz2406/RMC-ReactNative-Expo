import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { Heading } from "../loginComponents/heading";
import { TextButton } from "../loginComponents/textButton";
import { useForm } from "react-hook-form";
import { TextInput } from "../index";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContainer } from "../loginComponents/authContainer";
import { AuthContext } from "../contexts/authContext";

export function LoginScreen({ navigation }) {
  const { handleSubmit, control, reset, errors } = useForm();
  const { login } = useContext(AuthContext);

  const onSubmitLogin = (data) => {
    console.log(data);

    reset({
      email: "",
      password: "",
    });

    fetch(`http://192.168.0.2:8080/user/byEmail/${data.email}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(data.password, "fetch");
        login(responseJson.email, responseJson.password, data.email, data.password);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(errors);

  return (
    <ScrollView style={styles.scrollView}>
      <AuthContainer>
        <Heading style={styles.title}>ReportsMyCity</Heading>
        <Heading style={styles.title}>LOGIN</Heading>

        <TextInput
          title="Correo"
          control={control}
          name="email"
          error={errors.email}
          errorMessage="El correo es requerido"
        />

        <TextInput
          title="Contraseña"
          control={control}
          name="password"
          error={errors.password}
          errorMessage="La contraseña es obligatoria"
        />

        <TouchableOpacity
          style={styles.RegisterButton}
          onPress={handleSubmit(onSubmitLogin)}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TextButton
          title={"Tienes una cuanta? Crear una."}
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
        />

      </AuthContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 48,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  RegisterButton: {
    marginVertical: 32,
  },
  scrollView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
});
