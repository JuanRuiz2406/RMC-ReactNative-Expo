import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Heading } from './loginComponents/heading';
import { Input } from './loginComponents/input';
import { FilledButton } from './loginComponents/filledButton';
import { IconButton } from './loginComponents/iconButton'
import { AuthContainer } from './loginComponents/authContainer';
import { AuthContext } from './contexts/authContext';


export function RegisterScreen({ navigation }) {

    const { register } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState(() => 'diegovillatj@gmail.com');
    const [name, setName] = React.useState(() => 'Diego');
    const [lasname, setLastname] = React.useState(() => 'Villarreal');
    const [idCard, setId] = React.useState(() => '504200201');
    const [direction, setDirection] = React.useState(() => 'Liberia');
    const [role, setRole] = React.useState(() => 'user');
    const [password, setPassword] = React.useState(() => 'abc');
    const [loading, setLoading] = React.useState(() => false);
    const [error, setError] = React.useState(() => '');

    return (
        <AuthContainer>

            <IconButton style={styles.closeIcon} name={'close-circle-outline'} onPress={() => {
                navigation.pop();
            }} />

            <Heading style={styles.title}>
                REGISTRO
            </Heading>

            <Input style={styles.input} placeholder={'Nombre'} value={name} onChangeText={setName} />
            <Input style={styles.input} placeholder={'Apellido'} value={lasname} onChangeText={setLastname} />
            <Input style={styles.input} placeholder={'Numero de identificacion'} value={idCard} onChangeText={setId} />
            <Input style={styles.input} placeholder={'Nombre de Usuario'} keyboardType={'email-address'} value={email} onChangeText={setEmail} />
            <Input style={styles.input} placeholder={'Contraseña'} secureTextEntry value={password} onChangeText={setPassword} />

            <FilledButton
                title={'Registro'}
                style={styles.RegisterButton}
                onPress={async () => {
                    try {
                        setLoading(true);
                        await register(email, password);
                        navigation.pop();
                    } catch (e) {
                        setError(e.message);
                        setLoading(false);
                        console.log(e);
                    }
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
        position: 'absolute',
        top: 60,
        right: 16,

    },
});