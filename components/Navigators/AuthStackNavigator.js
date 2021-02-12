//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../loginScreen';
import { RegisterScreen } from '../registerScreen';

const AuthStack2 = createStackNavigator();

const LoginStack = createStackNavigator();

export default function AutoStackNavigator() {
    return (

        <AuthStack2.Navigator screenOptions={{
            headerShown: false,
        }}>
            <AuthStack2.Screen name={'LoginStack'}>
                {() => (
                    <LoginStack.Navigator
                        mode={'card'}
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <LoginStack.Screen name={'Login'} component={LoginScreen} />
                    </LoginStack.Navigator>
                )}
            </AuthStack2.Screen>
            <AuthStack2.Screen name={'RegisterScreen'} component={RegisterScreen} ></AuthStack2.Screen>
        </AuthStack2.Navigator>

    );
}