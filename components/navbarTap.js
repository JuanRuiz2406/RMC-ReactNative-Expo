import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';

import Home from './home'
import Reports from './reports'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="black"
            style={{ backgroundColor: 'white' }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Reports"
                component={Reports}
                options={{
                    tabBarLabel: 'Reports',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="notification" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
