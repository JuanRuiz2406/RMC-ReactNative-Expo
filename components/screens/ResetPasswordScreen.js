import React, { useState } from 'react'
import Background from '../ComponetsLogin/Background'
import Logo from '../ComponetsLogin/Logo'
import Header from '../ComponetsLogin/Header'
import Button from '../ComponetsLogin/Button'
import BackButton from '../ComponetsLogin/BackButton'
import { useForm } from "react-hook-form";
import { TextInput } from "../hook-form/index";

export default function ResetPasswordScreen({ navigation }) {
  const { handleSubmit, control, reset, errors } = useForm();

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
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
      />
      <Button mode="contained">
        Enviar codigo
            </Button>
    </Background>
  )
}
