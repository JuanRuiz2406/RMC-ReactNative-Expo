import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Heading } from './loginComponents/heading';
import { Input } from './loginComponents/input';
import { FilledButton } from './loginComponents/filledButton';
import { TextButton } from './loginComponents/textButton';

export default function () {

    return (
        <View style={styles.container}>
            <Heading style={styles.title}>
                LOGIN
            </Heading>
            <Input style={styles.input} placeholder={'Nombre de Usuario'} keyboardType={'email-address'} />
            <Input style={styles.input} placeholder={'Contraseña'} secureTextEntry />

            <FilledButton
                title={'Login'}
                style={styles.loginButton}
                onPress={() => { }}
            />

            <TextButton
                title={'Tienes una cuanta? Crear una.'}
                onPress={() => { }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 120,
        alignItems: 'center',
        padding: 20,
    },

    input: {
        marginVertical: 20,
    },

    title: {
        marginBottom: 48,
    },

    loginButton: {
        marginVertical: 32,
    },
});