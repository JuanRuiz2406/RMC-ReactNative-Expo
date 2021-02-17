import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

export default ({
  title,
  control,
  name,
  error,
  errorMessage,
  pickerOptions,
}) => {
  const [pickerSelectedOption, setPickerSelectedOption] = useState("");

  return (
    <>
      <Text style={styles.label}>{title}</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Picker
            onBlur={onBlur}
            selectedValue={pickerSelectedOption}
            style={styles.picker}
            onValueChange={(itemValue, itemPosition) => {
              onChange(itemValue);
              setPickerSelectedOption(itemValue);
            }}
            value={value}
          >
            <Picker.Item label="Seleccione..." value="" />

            {pickerOptions.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        )}
        name={name}
        defaultValue={pickerSelectedOption}
        rules={{ required: true }}
      />
      {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    margin: 20,
    marginTop: 25,
    marginLeft: 40,
    fontSize: 18,
  },
  errorMessage: {
    marginLeft: 35,
    fontSize: 12,
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    height: 50,
    marginLeft: 30,
    marginRight: 30,
  },
});
