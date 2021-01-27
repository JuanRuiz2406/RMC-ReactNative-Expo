import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';

import Home from './home'
import Reports from './reports'
import Report from './report'
import FormReport from './FormReport'
import CreateReport from './createReport'
import Profile from './profile'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#feB139"
            tabBarOptions={{ activeTintColor: '#FEB139' }}
            style={{ backgroundColor: 'white' }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, }) => (
                        <AntDesign name="home" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Buscar"
                component={CreateReport}
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="search1" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Crear Reporte"
                component={FormReport}
                options={{
                    tabBarLabel: 'Crear Reporte',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="plus" color={color} size={40} />
                    ),
                }}
            />
            <Tab.Screen
                name="Reports"
                component={Reports}
                options={{
                    tabBarLabel: 'Reports',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="bells" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" color={color} size={30} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}
