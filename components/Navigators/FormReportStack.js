import * as React from "react";
import { Camera, FormReport, ImagePicker, Map } from "../screens/index";
import { createStackNavigator } from "@react-navigation/stack";

const FormReportStack = createStackNavigator();

export default () => {
  return (
    <FormReportStack.Navigator>
      <FormReportStack.Screen name="Crear Reporte" component={FormReport} />
      <FormReportStack.Screen name="Mapa" component={Map} />
      <FormReportStack.Screen name="Cámara" component={Camera} />
      <FormReportStack.Screen name="Seleccionar Fotos" component={ImagePicker} />
    </FormReportStack.Navigator>
  );
};
