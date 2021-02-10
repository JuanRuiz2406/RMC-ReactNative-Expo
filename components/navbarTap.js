import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';

import { Home, Reports, FormReport, Profile, Location } from './index';

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
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color, }) => (
                        <AntDesign name="home" color={color} size={30} />
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
                name="Reportes"
                component={Reports}
                options={{
                    tabBarLabel: 'Reportes',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="bells" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Location}
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
