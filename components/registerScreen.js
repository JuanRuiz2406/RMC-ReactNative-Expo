import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Heading } from "./loginComponents/heading";
import { Input } from "./loginComponents/input";
import { FilledButton } from "./loginComponents/filledButton";
import { IconButton } from "./loginComponents/iconButton";
import { AuthContainer } from "./loginComponents/authContainer";
import { AuthContext } from "./contexts/authContext";

export function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("diegovillatj@gmail.com");
  const [name, setName] = useState("Diego");
  const [lasname, setLastname] = useState("Villarreal");
  const [idCard, setId] = useState("504200201");
  const [direction, setDirection] = useState("Liberia");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("abc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <AuthContainer>
      <IconButton
        style={styles.closeIcon}
        name={"close-circle-outline"}
        onPress={() => {
          navigation.pop();
        }}
      />

      <Heading style={styles.title}>REGISTRO</Heading>

      <Input
        style={styles.input}
        placeholder={"Nombre"}
        value={name}
        onChangeText={setName}
      />
      <Input
        style={styles.input}
        placeholder={"Apellido"}
        value={lasname}
        onChangeText={setLastname}
      />
      <Input
        style={styles.input}
        placeholder={"Numero de identificacion"}
        value={idCard}
        onChangeText={setId}
      />
      <Input
        style={styles.input}
        placeholder={"Nombre de Usuario"}
        keyboardType={"email-address"}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={"Contraseña"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <FilledButton
        title={"Registro"}
        style={styles.RegisterButton}
        onPress={() => {
          register();
        }}
      />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
  title: {
    marginBottom: 48,
  },
  RegisterButton: {
    marginVertical: 32,
  },
  closeIcon: {
    position: "absolute",
    top: 60,
    right: 16,
  },
});
