import React, { useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Alert,
  ScrollView
} from "react-native";
import { useForm } from "react-hook-form";
import { TextInput } from "../hook-form/index";
import { AuthContainer } from "../loginComponents/authContainer";
import { AuthContext } from "../contexts/authContext";
import { loginUser } from "../services/user";

import { Text } from 'react-native-paper'
import Background from '../ComponetsLogin/Background'
import Logo from '../ComponetsLogin/Logo'
import Header from '../ComponetsLogin/Header'
import Button from '../ComponetsLogin/Button'
import BackButton from '../ComponetsLogin/BackButton'
import { theme } from '../core/theme'

export default function LoginScreen({ navigation }) {
  const { handleSubmit, control, reset, errors } = useForm();
  const { login, loginWithGoogle, loginWithFacebook } = useContext(AuthContext);

  const onSubmitLogin = async (data) => {
    console.log(data);

    reset({
      email: "",
      password: "",
      token: "",
    });

    const createResponse = await loginUser(data, "normal", data.password);
    console.log(createResponse);
    if (createResponse.email != null) {
      login(createResponse.email, data.email, createResponse.token, createResponse.user);
    }
    else {
      Alert.alert("Campos mal rellenados, revise y vuelva a intentar");
    }
  };

  console.log(errors);

  return (

    <Background>
      <BackButton goBack={navigation.goBack} />
      <ScrollView
        ref={(ref) => (scrollView = ref)}
        style={styles.scrollView} bounces={false}>

        <Logo />
        <Header>Bienvenido de nuevo</Header>
        <AuthContainer>

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
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate('resetPasswordScreen')}
            >
              <Text style={styles.forgot}>Olvido su contraseña?</Text>
            </TouchableOpacity>
          </View>

          <Button mode="contained" onPress={handleSubmit(onSubmitLogin)}>
            Iniciar Sesion
            </Button>
          <Button mode="outlined" onPress={() => loginWithGoogle()}>
            Google
            </Button>
          <Button mode="outlined" onPress={() => loginWithFacebook()}>
            Facebook
            </Button>
        </AuthContainer>
      </ScrollView>
    </Background>
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
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
