//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

import AuthStackNavigator from './components/Navigators/AuthStackNavigator';
import { lightTheme } from './theme/light'
import { AuthContext } from './components/contexts/authContext';
import { BASE_URL } from './components/config';

//import navBar from './components/navbarTap'

const Stack = createStackNavigator();

export default function () {

  const auth = React.useMemo(() => ({
    login: (email, password) => {
      console.log('login', email, password);
    },
    logout: () => {
      console.log('logout');
    },
    register: async (email, password) => {
      await fetch('http://192.168.1.111:8080/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'aplication/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
    },
  }),

  );


  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer theme={lightTheme}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name={'AuthStack2'} component={AuthStackNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

  );
}
