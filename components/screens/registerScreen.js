import React, { useContext } from "react";
import { Alert, StyleSheet, Dimensions } from "react-native";
import { AuthContainer } from "../loginComponents/authContainer";
import { AuthContext } from "../contexts/authContext";
import { useForm } from "react-hook-form";
import { TextInput } from "../hook-form/index";
import { ScrollView } from "react-native-gesture-handler";
import { newUser, loginUser } from "../services/user";

import { Text } from "react-native-paper";
import Background from "../ComponetsLogin/Background";
import Logo from "../ComponetsLogin/Logo";
import Header from "../ComponetsLogin/Header";
import Button from "../ComponetsLogin/Button";
import BackButton from "../ComponetsLogin/BackButton";
import { theme } from "../core/theme";

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
    if (saveUser.code === 200) {
      console.log("El usuario ser registro correctamente")
      const responseLogin = await loginUser(data);
      console.log(responseLogin);
      if (responseLogin.code === 200) {
        console.log("El usuario ser loguio correctamente");
        register(responseLogin.user.email, responseLogin.token);
      }
      if (responseLogin.code === 401) {
        Alert.alert("Problemas para iniciar sesion, vuelva a intentar");
      }
    }
    if (saveUser.code === 401) {
      Alert.alert("Problemas al registrar usuario");
    }
  };

  return (
    <ScrollView>
      <Background>
        <BackButton goBack={navigation.goBack} />
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
            leftIconName="user"
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
            leftIconName="user"
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
            leftIconName="location-arrow"
          />

          <Button mode="contained" onPress={handleSubmit(onSubmitRegister)}>
            Registrar
          </Button>
        </AuthContainer>
      </Background>
    </ScrollView>
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
