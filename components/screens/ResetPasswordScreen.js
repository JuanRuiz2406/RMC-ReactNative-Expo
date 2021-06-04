import React, { useState } from 'react'
import Background from '../ComponetsLogin/Background'
import Logo from '../ComponetsLogin/Logo'
import Header from '../ComponetsLogin/Header'
import Button from '../ComponetsLogin/Button'
import BackButton from '../ComponetsLogin/BackButton'
import { useForm } from "react-hook-form";
import { TextInput } from "../hook-form/index";
import { StyleSheet, Dimensions, View, Alert } from "react-native";
import { updateVerificationCode } from "../services/user";
import AsyncStorage from "@react-native-community/async-storage";


export default function ResetPasswordScreen({ navigation }) {
  const { handleSubmit, control, reset, errors } = useForm();


  const onSubmit = async (data) => {
    await AsyncStorage.setItem("emailCode", data.email);
    responseUpdateVerificationCode = await updateVerificationCode(data.email);
    console.log(responseUpdateVerificationCode);
    if(responseUpdateVerificationCode.code === 201){
      
      console.log("inside");
      Alert.alert("Código Enviado", "Revisa tu correo electrónico para encontrar tu código.");
      navigation.navigate('updatePasswordWithCode');
    }else{
      Alert.alert("ERROR", "No existe el usuario.");
    }
    
  }


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
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
        leftIconName="unlock"
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
