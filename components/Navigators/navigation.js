import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import MapScreen from "../screens/map";

export default AppNavigator = createStackNavigator({
  Map: { screen: MapScreen },
});
