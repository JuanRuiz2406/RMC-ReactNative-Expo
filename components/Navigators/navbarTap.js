import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import FormReportStack from "./FormReportStack";
import ReportStack from "./ReportsStack";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

export default navBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#F8A513"
      tabBarOptions={{ activeTintColor: "#F8A513" }}
      style={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Home"
        component={ReportStack}
        options={{
          tabBarLabel: "Reportes",
          tabBarIcon: ({ color }) => (
            <AntDesign name="bells" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Crear Reporte"
        component={FormReportStack}
        options={{
          tabBarLabel: "Crear Reporte",
          tabBarIcon: ({ color }) => (
            <AntDesign name="plus" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
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
