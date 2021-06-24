import React, { useContext } from "react";
import {
  Alert,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AuthContainer } from "../loginComponents/authContainer";
import { AuthContext } from "../contexts/authContext";
import { useForm } from "react-hook-form";
import { TextInput } from "../hook-form/index";
import { newUser, loginUser } from "../services/user";
import Background from "../ComponetsLogin/Background";
import Logo from "../ComponetsLogin/Logo";
import Header from "../ComponetsLogin/Header";
import Button from "../ComponetsLogin/Button";
import BackButton from "../ComponetsLogin/BackButton";
import { theme } from "../core/theme";

import AsyncStorage from "@react-native-community/async-storage";

export default function RegisterScreen({ navigation }) {
  const { handleSubmit, control, reset, errors } = useForm();
  const { register } = useContext(AuthContext);

  const onSubmitRegister = async (data) => {
    console.log(data);

    reset({
      email: "",
      password: "",
      name: "",
      lastName: "",
      direction: "",
    });
    console.log(data);
    const saveUser = await newUser(data);
    console.log(saveUser);
    if (saveUser.code === 201) {
      console.log("El usuario ser registro correctamente");
      const responseLogin = await loginUser(data, "normal", data.password);
      console.log(responseLogin);
      if (responseLogin.token != null) {
        console.log("El usuario ser loguio correctamente");
        register(
          responseLogin.user.email,
          responseLogin.token,
          responseLogin.user
        );
      }
      if (responseLogin.token === null) {
        Alert.alert("Problemas para iniciar sesion, vuelva a intentar");
      }
    }
    if (saveUser.code === 401) {
      Alert.alert("Problemas al registrar usuario");
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <ScrollView
        style={styles.scrollView}
        //ref={(ref) => (scrollView = ref)}
        //bounces={false}
      >
        <Logo />
        <Header>Crea una cuenta</Header>
        <AuthContainer>
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
            leftIconName="account"
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
            leftIconName="account-child"
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
            leftIconName="id-card"
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
            leftIconName="at"
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
            leftIconName="lock"
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
            leftIconName="map"
          />

          <Button mode="contained" onPress={handleSubmit(onSubmitRegister)}>
            Registrar
          </Button>
        </AuthContainer>
      </ScrollView>
    </Background>
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
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
