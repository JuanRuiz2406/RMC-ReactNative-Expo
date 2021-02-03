import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

export function Input({ style, ...props }) {

    return <TextInput {...props} style={[styles.Input, style]} />

}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ccc',
        width: '100%',
        padding: 20,
        borderRadius: 8,

    },
});