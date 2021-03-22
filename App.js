//import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useReducer, useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import AuthStackNavigator from "./components/Navigators/AuthStackNavigator";
import { AuthContext } from "./components/contexts/authContext";

import navBar from "./components/navbarTap";

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

  const [loginState, dispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  const auth = useMemo(() => ({
    login: (apiEmail, userName, token) => {
      let userToken;
      console.log(userName, apiEmail);
      if (userName == apiEmail) {
        if (token != null) {
          userToken = token;
          console.log("user token: ", userToken);
          dispatch({ type: "LOGIN", id: userName, token: userToken });
        } else {
          console.log("Error en el login");
        }
      } else {
        console.log("El correo no esta registrado");
      }
    },
    logout: () => {
      dispatch({ type: "LOGOUT" });
    },
    register: (emailApi, token) => {
      let userToken2;
      if (token != null) {
        userToken2 = token;
        dispatch({ type: "REGISTER", id: emailApi, token: userToken2 });
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
            component={navBar}
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
              component={navBar}
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
