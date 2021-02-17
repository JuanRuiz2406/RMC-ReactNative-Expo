import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import navBar from './components/navbarTap'
import { color } from 'react-native-reanimated';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ReportsMyCity">
        <Stack.Screen name="ReportsMyCity" component={navBar} options={{ headerStyle: { backgroundColor: '#008652' } }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#008652',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
