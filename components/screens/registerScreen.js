import React, { useContext } from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
      lastName: "",
      direction: "",
    });
    console.log(data);
    fetch("http://192.168.0.2:8080/auth/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        direction: data.direction,
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
          fetch("http://192.168.0.2:8080/auth/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          })
            .then((response) => response.json())
            .then((responseJsonLogin) => {
              register(responseJsonLogin.email, responseJsonLogin.token);
            });
        } else {
          console.log("Error al registrar usuario, cheque los campos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.scrollView}
      behavior={
        Platform.OS === "ios" || Platform.OS === "android" ? "padding" : null
      }
    >
      <ScrollView>
        <AuthContainer>
          <Heading style={styles.title}>REGISTRO</Heading>

          <TextInput
            title="Nombre"
            control={control}
            isPassword={false}
            name="name"
            rules={{
              required: {
                value: true,
                message: "*El Nombre es obligatorio*",
              },
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "*El Nombre solo puede tener letras*",
              },
            }}
            defaultValue=""
            errorMessage={errors?.name?.message}
          />
          <TextInput
            title="Apellido"
            control={control}
            isPassword={false}
            name="lastName"
            rules={{
              required: {
                value: true,
                message: "*El Apellido es obligatorio*",
              },
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "*El Apellido solo puede tener letras*",
              },
            }}
            defaultValue=""
            errorMessage={errors?.lastName?.message}
          />
          <TextInput
            title="Identificacion"
            control={control}
            isPassword={false}
            name="idCard"
            rules={{
              required: {
                value: true,
                message: "*La Cédula es obligatoria*",
              },
            }}
            defaultValue=""
            errorMessage={errors?.idCard?.message}
          />
          <TextInput
            title="Correo Electrónico"
            control={control}
            isPassword={false}
            name="email"
            rules={{
              required: {
                value: true,
                message: "*El Correo Electrónico es obligatorio*",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "*El Correo Electrónico debe tener un formato válido*",
              },
            }}
            defaultValue=""
            errorMessage={errors?.email?.message}
          />
          <TextInput
            title="Contraseña"
            control={control}
            isPassword={true}
            name="password"
            rules={{
              required: {
                value: true,
                message: "*La Contraseña es obligatoria*",
              },
              minLength: {
                value: 8,
                message: "*La Contraseña debe tener 8 caracteres mínimo*",
              },
            }}
            defaultValue=""
            errorMessage={errors?.password?.message}
          />
          <TextInput
            title="Dirección"
            control={control}
            isPassword={false}
            name="direction"
            rules={{
              required: {
                value: true,
                message: "*La Dirección es obligatoria*",
              },
            }}
            defaultValue=""
            errorMessage={errors?.direction?.message}
          />

          <TouchableOpacity
            style={styles.RegisterButton}
            onPress={handleSubmit(onSubmitRegister)}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </AuthContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
