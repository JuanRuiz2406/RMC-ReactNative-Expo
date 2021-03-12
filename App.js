//import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useReducer, useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import AuthStackNavigator from "./components/Navigators/AuthStackNavigator";
import { lightTheme } from "./theme/light";
import { AuthContext } from "./components/contexts/authContext";
import { BASE_URL } from "./components/config";

import { NavBar } from "./components/Navigators/index";

const Stack = createStackNavigator();

export default () => {
  //const [isLoading, setIsLoding] = React.useState(true);
  //const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: false,
    userName: null,
    userToken: null,
    code: null,
    apiEmail: null,
    apiPassword: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRUEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: true,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: true,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const auth = useMemo(() => ({
    login: (apiEmail, apiPassword, userName, password) => {
      let userToken;
      console.log(apiEmail, apiPassword);
      console.log(userName, password);
      if (userName == apiEmail && password == apiPassword) {
        userToken = "asdf";
        console.log("user token: ", userToken);
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      }
    },
    logout: () => {
      dispatch({ type: "LOGOUT" });
    },
    register: (messageString, userName) => {
      if (messageString == "ok") {
        let userToken = "asdf";
        dispatch({ type: "REGISTER", id: userName, token: userToken });
      } else {
        console.log("No se puede registrar, error");
      }

    },
  }));

  useEffect(() => {
    setTimeout(() => {
      let userToken;
      userToken = "fgg";
      console.log("user token: ", userToken);
      dispatch({ type: "RETRUEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ReportsMyCity">
          <Stack.Screen
            name="ReportsMyCity"
            component={NavBar}
            options={{ headerStyle: { backgroundColor: "#008652" } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer >
        {loginState.userToken == !null ? (
          <Stack.Navigator initialRouteName="ReportsMyCity">
            <Stack.Screen
              name="ReportsMyCity"
              component={NavBar}
              options={{ headerStyle: { backgroundColor: "#008652" } }}
            />
          </Stack.Navigator>
        ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name={"AuthStack2"} component={AuthStackNavigator} />
            </Stack.Navigator>
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
