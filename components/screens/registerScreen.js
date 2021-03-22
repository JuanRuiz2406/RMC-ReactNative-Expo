import React, { useContext } from "react";
import { Alert, StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";
import { Heading } from "../loginComponents/heading";
import { AuthContainer } from "../loginComponents/authContainer";
import { AuthContext } from "../contexts/authContext";
import { useForm } from "react-hook-form";
import { TextInput } from "../index";
import { ScrollView } from "react-native-gesture-handler";

export function RegisterScreen({ navigation }) {

  const { handleSubmit, control, reset, errors } = useForm();
  const { register } = useContext(AuthContext);

  const onSubmitRegister = (data) => {
    console.log(data);

    reset({
      email: "",
      password: "",
      name: "",
      lastName: "",
      direction: "",
    });
    console.log(data);
    fetch("http://192.168.0.3:8080/auth/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        direction: "Liberia",
        email: data.email,
        idCard: data.idCard,
        lastName: data.lastName,
        name: data.name,
        password: data.password,
        role: "user",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.code);
        if (responseJson.code == 201) {
          fetch("http://192.168.0.3:8080/auth/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          }).then((response) => response.json())
            .then((responseJsonLogin) => {
              register(responseJsonLogin.email, responseJsonLogin.token);
            })
        } else {
          console.log("Error al registrar usuario, cheque los campos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <AuthContainer>
        <Heading style={styles.title}>REGISTRO</Heading>

        <TextInput
          title="Nombre"
          control={control}
          name="name"
          error={errors.name}
          errorMessage="El nombre es requerido"
        />
        <TextInput
          title="Apellido"
          control={control}
          name="lastName"
          error={errors.lastName}
          errorMessage="El apellido es requerido"
        />
        <TextInput
          title="Identificacion"
          control={control}
          name="idCard"
          error={errors.idCard}
          errorMessage="La identificacion es requerido"
        />
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
          errorMessage="El contraseña es requerido"
        />

        <TouchableOpacity
          style={styles.RegisterButton}
          onPress={handleSubmit(onSubmitRegister)}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

      </AuthContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
  title: {
    marginBottom: 48,
    textAlign: "center",
  },
  RegisterButton: {
    marginVertical: 32,
  },
  closeIcon: {
    position: "absolute",
    top: 60,
    right: 16,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  scrollView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
});
