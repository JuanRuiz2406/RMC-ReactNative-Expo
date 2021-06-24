import React from "react";
import { StyleSheet, Text } from "react-native";
import { Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { TextInput, HelperText } from "react-native-paper";
import { theme } from "../core/theme";

export default ({
  title,
  control,
  isPassword,
  name,
  rules,
  defaultValue,
  errorMessage,
  leftIconName,
  placeholder,
}) => {
  return (
    <>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            mode="flat"
            style={{ backgroundColor: "transparent", fontSize: 20 }}
            label={title}
            left={<TextInput.Icon name={leftIconName} />}
            secureTextEntry={isPassword}
            //style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder={placeholder}
          />
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {<HelperText type="error">{errorMessage}</HelperText>}
    </>
  );
};
