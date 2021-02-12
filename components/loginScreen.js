import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Heading } from './loginComponents/heading';
import { Input } from './loginComponents/input';
import { FilledButton } from './loginComponents/filledButton';
import { TextButton } from './loginComponents/textButton';
//import { Error } from './loginComponents/error';
import { AuthContainer } from './loginComponents/authContainer';
import { AuthContext } from './contexts/authContext';

export function LoginScreen({ navigation }) {

    const { login } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState(() => 'diegovillatj@gmail.com');
    const [password, setPassword] = React.useState(() => 'abc');

    return (
        <AuthContainer>
            <Heading style={styles.title}>
                ReportMyCity
            </Heading>
            <Heading style={styles.title}>
                LOGIN
            </Heading>

            <Input style={styles.input} placeholder={'Nombre de Usuario'} keyboardType={'email-address'} value={email} onChangeText={setEmail} />
            <Input style={styles.input} placeholder={'Contraseña'} secureTextEntry value={password} onChangeText={setPassword} />

            <FilledButton
                title={'Login'}
                style={styles.loginButton}
                onPress={() => {
                    login(email, password);
                }}
            />

            <TextButton
                title={'Tienes una cuanta? Crear una.'}
                onPress={() => {
                    navigation.navigate('RegisterScreen');
                }}
            />
        </AuthContainer>
    );
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
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