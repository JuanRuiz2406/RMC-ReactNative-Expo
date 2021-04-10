import React, { useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Heading } from "../loginComponents/heading";
import { TextButton } from "../loginComponents/textButton";
import { useForm } from "react-hook-form";
import { TextInput } from "../hook-form/index";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContainer } from "../loginComponents/authContainer";
import { AuthContext } from "../contexts/authContext";

export function LoginScreen({ navigation }) {
  const { handleSubmit, control, reset, errors } = useForm();
  const { login, loginWithGoogle, loginWithFacebook } = useContext(AuthContext);

  const onSubmitLogin = (data) => {
    console.log(data);

    reset({
      email: "",
      password: "",
      token: "",
    });

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
      .then((responseJson) => {
        console.log(responseJson);
        login(responseJson.email, data.email, responseJson.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(errors);

  return (
    <KeyboardAvoidingView
      style={styles.scrollView}
      behavior={
        Platform.OS === "ios" || Platform.OS === "android" ? "padding" : null
      }
    >
      <ScrollView>
        <AuthContainer>
          <Heading style={styles.title}>ReportsMyCity</Heading>
          <Heading style={styles.title}>LOGIN</Heading>

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
          <TouchableOpacity
            style={styles.RegisterButton}
            onPress={handleSubmit(onSubmitLogin)}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.RegisterButton}
            onPress={() => loginWithGoogle()}
          >
            <Text style={styles.buttonTextGoogle}>Entrar con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.RegisterButton}
            onPress={() => loginWithFacebook()}
          >
            <Text style={styles.buttonTextFacebook}>Entrar con Facebook</Text>
          </TouchableOpacity>

          <TextButton
            title={"¿No tienes una cuenta? Crea una"}
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          />
        </AuthContainer>
      </ScrollView>
    </KeyboardAvoidingView>
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
  buttonTextGoogle: {
    fontSize: 20,
    textAlign: "center",
    color: "#FF0A0A",
    fontWeight: "bold",
  },
  buttonTextFacebook: {
    fontSize: 20,
    textAlign: "center",
    color: "#0A5CFF",
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
