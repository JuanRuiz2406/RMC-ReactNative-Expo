import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";
import { Heading } from "../loginComponents/heading";
import { AuthContainer } from "../loginComponents/authContainer";
import { AuthContext } from "../contexts/authContext";
import { useForm } from "react-hook-form";
import { TextInput } from "../hook-form/index";
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
      lastname: "",
      direction: "",
    });

    fetch("http://192.168.0.2:8080/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        direction: "Liberia",
        email: data.email,
        idCard: data.idCard,
        lastname: data.lastname,
        name: data.name,
        password: data.password,
        role: "user",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.messageString);
        register(responseJson.messageString, data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(errors);

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
          name="lastname"
          error={errors.lastname}
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
          <Text style={styles.buttonText}>Reportar</Text>
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
    color: "#fff",
    fontWeight: "bold",
  },
  scrollView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
});
