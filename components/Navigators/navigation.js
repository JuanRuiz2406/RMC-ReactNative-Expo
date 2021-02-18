import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { Map, SpecificReport } from '../screensRoutes'

export default createAppContainer(AppNavigator);

const AppNavigator = createStackNavigator({
  Map: {
    screen: Map,
  },
  Report: {
    screen: SpecificReport,
  },
});
