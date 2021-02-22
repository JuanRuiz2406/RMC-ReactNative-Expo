import * as React from "react";
import { FormReport, Map } from "../screens/index";
import { createStackNavigator } from "@react-navigation/stack";

const FormReportStack = createStackNavigator();

export default () => {
  return (
    <FormReportStack.Navigator>
      <FormReportStack.Screen name="Crear Reporte" component={FormReport} />
      <FormReportStack.Screen name="Mapa" component={Map} />
    </FormReportStack.Navigator>
  );
};
