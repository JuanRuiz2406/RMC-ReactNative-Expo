import React from "react";
import { StyleSheet, TextInput, Text } from "react-native";
import { Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

export default ({
  title,
  control,
  isPassword,
  name,
  rules,
  defaultValue,
  errorMessage,
  leftIconName,
}) => {
  return (
    <>
      <Text style={styles.label}>{title}</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            leftIcon={{ type: 'font-awesome', name: leftIconName }}
            secureTextEntry={isPassword}
            //style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {<Text style={styles.errorMessage}>{errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    margin: 20,
    marginTop: '1%',
    marginLeft: 7,
    fontSize: 22,
    fontWeight: "bold",
  },
  errorMessage: {
    marginLeft: 35,
    fontSize: 12,
  },
  input: {
    backgroundColor: "white",
    height: 30,
    padding: 2,
    borderRadius: 4,
    borderBottomWidth: 1,
    marginLeft: '1%',
    marginRight: '1%',
    fontSize: 20,
  },
});
