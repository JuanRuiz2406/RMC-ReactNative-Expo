import * as React from "react";
import { Reports, Report } from "../screens/index";
import { createStackNavigator } from "@react-navigation/stack";

const FormReportStack = createStackNavigator();

export default () => {
  return (
    <FormReportStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <FormReportStack.Screen name="Reportes" component={Reports} />
      <FormReportStack.Screen name="Reporte Específico" component={Report} />
    </FormReportStack.Navigator>
  );
};
