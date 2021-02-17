import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Heading,
  Input,
  FilledButton,
  TextButton,
  AuthContainer,
  AuthContext,
  //Error,
} from "./index";

export function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({
    username: "",
    password: "",
    check_textInputChange: true,
    secureTextEntry: true,
  });

  const inputChange = (val) => {
    setData({
      ...data,
      username: val,
    });
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const loginHandle = (username, password) => {
    login(username, password);
  };

  return (
    <AuthContainer>
      <Heading style={styles.title}>ReportMyCity</Heading>
      <Heading style={styles.title}>LOGIN</Heading>

      <Input
        style={styles.input}
        placeholder={"Nombre de Usuario"}
        keyboardType={"email-address"}
        onChangeText={(val) => inputChange(val)}
      />

      <Input
        style={styles.input}
        placeholder={"Contraseña"}
        secureTextEntry={true}
        onChangeText={(val) => handlePasswordChange(val)}
      />

      <FilledButton
        title={"Login"}
        style={styles.loginButton}
        onPress={() => {
          loginHandle(data.username, data.password);
        }}
      />

      <TextButton
        title={"No tienes una cuenta? Crea una"}
        onPress={() => {
          navigation.navigate("RegisterScreen");
        }}
      />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    marginVertical: 8,
  },
  title: {
    marginBottom: 48,
  },
  loginButton: {
    marginVertical: 32,
  },
});
