import * as React from "react";
import { StyleSheet } from "react-native";
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
        style={styles.container}
        component={ReportStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="bells" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Crear Reporte"
        style={styles.container}
        component={FormReportStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="plus" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F7F9",
    margin: "5%",
  },
});
