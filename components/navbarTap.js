import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { Home, Reports, FormReport, Location } from "./screens/index";

import { createStackNavigator } from "react-navigation-stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default navBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#feB139"
      tabBarOptions={{ activeTintColor: "#FEB139" }}
      style={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Crear Reporte"
        component={FormReport}
        options={{
          tabBarLabel: "Crear Reporte",
          tabBarIcon: ({ color }) => (
            <AntDesign name="plus" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Reportes"
        component={Reports}
        options={{
          tabBarLabel: "Reportes",
          tabBarIcon: ({ color }) => (
            <AntDesign name="bells" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Location}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
