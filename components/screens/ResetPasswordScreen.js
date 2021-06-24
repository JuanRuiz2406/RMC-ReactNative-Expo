import React, { useState } from "react";
import Background from "../ComponetsLogin/Background";
import Logo from "../ComponetsLogin/Logo";
import Header from "../ComponetsLogin/Header";
import Button from "../ComponetsLogin/Button";
import BackButton from "../ComponetsLogin/BackButton";
import { useForm } from "react-hook-form";
import { TextInput } from "../hook-form/index";
import { StyleSheet, Dimensions, View, Alert, ScrollView } from "react-native";
import { updateVerificationCode } from "../services/user";
import AsyncStorage from "@react-native-community/async-storage";

export default function ResetPasswordScreen({ navigation }) {
  const { handleSubmit, control, reset, errors } = useForm();

  const onSubmit = async (data) => {
    await AsyncStorage.setItem("emailCode", data.email);
    const responseUpdateVerificationCode = await updateVerificationCode(
      data.email
    );
    console.log(responseUpdateVerificationCode);
    if (responseUpdateVerificationCode.code === 201) {
      console.log("inside");
      Alert.alert(
        "Código Enviado",
        "Revisa tu correo electrónico para encontrar tu código."
      );
      navigation.navigate("updatePasswordWithCode");
    } else {
      Alert.alert("ERROR", "No existe el usuario.");
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.scrollView}>
        <Header>Restaurar Contraseñas</Header>

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
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          leftIconName="email"
        />
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Enviar codigo
        </Button>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get("window").width,
  },
  scrollView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  logo: {
    width: Dimensions.get("window").width - 50,
    marginTop: "150%",
    marginLeft: "-10%",
  },
});
