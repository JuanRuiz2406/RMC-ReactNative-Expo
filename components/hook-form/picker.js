import React, { useState } from "react";
import { StyleSheet, Text, Pi } from "react-native";
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
    marginTop: '1%',
    marginLeft: 7,
    fontSize: 22,
    fontWeight: "bold",
  },
  errorMessage: {
    marginLeft: 35,
    fontSize: 12,
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    height: '10%',
    marginLeft: '5%',
    marginRight: '5%',
  },
});
