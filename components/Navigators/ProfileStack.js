import * as React from "react";
import { Profile, Report, UserReports, UpdatePassword } from "../screens/index";
import { createStackNavigator } from "@react-navigation/stack";

const FormReportStack = createStackNavigator();

export default () => {
  return (
    <FormReportStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <FormReportStack.Screen name="Perfil" component={Profile} />
      <FormReportStack.Screen name="Reportes del Usuario" component={UserReports} />
      <FormReportStack.Screen name="Reporte Específico" component={Report} />
      <FormReportStack.Screen name="Cambiar Contraseña" component={UpdatePassword} />
    </FormReportStack.Navigator>
  );
};
