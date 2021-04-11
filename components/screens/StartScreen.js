import React from 'react'
import Background from '../ComponetsLogin/Background'
import Logo from '../ComponetsLogin/Logo'
import Header from '../ComponetsLogin/Header'
import Button from '../ComponetsLogin/Button'
import Paragraph from '../ComponetsLogin/Paragraph'

export default function StartScreen({ navigation }) {
    return (
        <Background>
            <Logo />
            <Header>Inicio de sesion</Header>
            <Paragraph>
                Reporta lo que necesites, que el pueblo te escuche...
        </Paragraph>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('LoginScreen')}
            >
                Inicia Sesion
        </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                Crear una cuenta
        </Button>
        </Background>
    )
}