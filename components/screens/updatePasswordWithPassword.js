import React, { useState } from "react";
import Background from "../ComponetsLogin/Background";
import Logo from "../ComponetsLogin/Logo";
import Header from "../ComponetsLogin/Header";
import Button from "../ComponetsLogin/Button";
import BackButton from "../ComponetsLogin/BackButton";
import { useForm } from "react-hook-form";
import { TextInput } from "../hook-form/index";
import { StyleSheet, Dimensions, ScrollView, Alert } from "react-native";
import { updateUserPassword } from "../services/user";
import AsyncStorage from "@react-native-community/async-storage";

export default function updatePasswordWithPassword({ navigation }) {
  const { handleSubmit, control, reset, errors } = useForm();

  const onSubmit = async (data) => {
    if (data.password1 === data.password2) {
      usuario = JSON.parse(await AsyncStorage.getItem("user"));
      console.log(usuario.lastname);
      updateResponse = await updateUserPassword(usuario, data.password2);
      if (updateResponse.code === 201) {
        Alert.alert("Felicidades", "Haz logrado cambiar tu contraseña.");
      }
    } else {
      Alert.alert("ERROR", "Las contraseñas no coinciden.");
    }
    console.log("finish");
    navigation.navigate("Perfil");
  };

  return (
    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Cambiar Contraseña</Header>
        <TextInput
          title="Contraseña"
          control={control}
          isPassword={true}
          name="password1"
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
          errorMessage={errors?.password1?.message}
          leftIconName="lock"
        />

        <TextInput
          title="Verificar Contraseña"
          control={control}
          isPassword={true}
          name="password2"
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
          errorMessage={errors?.password2?.message}
          leftIconName="lock"
        />
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Cambiar Contraseña
        </Button>
      </ScrollView>
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
});
