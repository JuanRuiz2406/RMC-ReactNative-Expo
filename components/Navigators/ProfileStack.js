import * as React from "react";
import { Profile, Report, UserReports } from "../screens/index";
import { createStackNavigator } from "@react-navigation/stack";

const FormReportStack = createStackNavigator();

export default () => {
  return (
    <FormReportStack.Navigator>
      <FormReportStack.Screen name="Perfil" component={Profile} />
      <FormReportStack.Screen name="Reportes del Usuario" component={UserReports} />
      <FormReportStack.Screen name="Reporte Específico" component={Report} />
    </FormReportStack.Navigator>
  );
};
