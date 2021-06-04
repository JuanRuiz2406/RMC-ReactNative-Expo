import React, { useState } from 'react'
import Background from '../ComponetsLogin/Background'
import Logo from '../ComponetsLogin/Logo'
import Header from '../ComponetsLogin/Header'
import Button from '../ComponetsLogin/Button'
import BackButton from '../ComponetsLogin/BackButton'
import { useForm } from "react-hook-form";
import { TextInput } from "../hook-form/index";
import { StyleSheet, Dimensions, View, Alert } from "react-native";
import { verificationCode } from "../services/user";
import AsyncStorage from "@react-native-community/async-storage";


export default function updatePasswordWithCode({ navigation }) {
  const { handleSubmit, control, reset, errors } = useForm();


  const onSubmit = async (data) => {
    const emailCode = await AsyncStorage.getItem("emailCode");
    console.log(emailCode);
    if (data.password1 === data.password2) {
        console.log("passed");
        const response = await verificationCode(
          emailCode,
          data.code,
          data.password2,
        );
        console.log(response);
        if(response.code === 201){
            console.log("Contraseña cambiada")
            Alert.alert("Felicidades", "Haz logrado reestablecer tu contraseña, vuelve a inicar sesión para utilizar nuestros servicios.");
            navigation.navigate('LoginScreen');
        }
      } else {
        console.log("las contraseñas no coinciden");
      }
  
  }


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restaurar Contraseña</Header>
      <TextInput
            title="Código de Verificación"
            control={control}
            name="code"
            rules={{
              required: {
                value: true,
                message: "*El codigo es obligatoria*",
              },
              minLength: {
                value: 8,
                message: "*El codigo debe tener 8 caracteres mínimo*",
              },
            }}
            defaultValue=""
            errorMessage={errors?.code?.message}
            leftIconName="lock"
          />
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
            errorMessage={errors?.password?.message}
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
            errorMessage={errors?.password?.message}
            leftIconName="lock"
          />
      <Button mode="contained"
      onPress={handleSubmit(onSubmit)}
      >
      Enviar codigo
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get("window").width,
  }
});
