//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useReducer, useMemo } from "react";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

import { Provider } from "react-native-paper";
import { theme } from "./components/core/theme";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { NavBar } from "./components/Navigators/index";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from "./components/Navigators/index";

import AuthStackNavigator from "./components/Navigators/AuthStackNavigator";
import { AuthContext } from "./components/contexts/authContext";
//Storage
import AsyncStorage from "@react-native-community/async-storage";
//Login with google and facebook
import firebase from "firebase";
import { firebaseConfig } from "./components/config/firebaseConfig";
import Expo from "expo";
import { androidClientId } from "./components/config/superKeyAndroid";
import { iosClientId } from "./components/config/superKeyIOS";
import { idAppFacebook } from "./components/config/idKeyFacebook";
import { Alert } from "react-native";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  const [userTemp, setUserTemp] = useState();

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
      case "RETRIEVE_TOKEN":
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
    login: async (apiEmail, userName, token, user) => {
      console.log(userName, apiEmail);
      if (userName == apiEmail) {
        if (token != null) {
          try {
            console.log("user token: ", token);
            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("userEmail", userName);
            await AsyncStorage.setItem("user", JSON.stringify(user));
          } catch (e) {
            console.log(e);
          }
          dispatch({ type: "LOGIN", id: userName, token: token });
        } else {
          console.log("Error en el login");
          Alert.alert("Error en el login");
        }
      } else {
        console.log("El usuario no esta registrado");
        Alert.alert("El usuario no esta registrado");
      }
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userEmail");
        await AsyncStorage.removeItem("user");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "LOGOUT" });
    },
    register: async (emailApi, token) => {
      if (token != null) {
        let userToken;
        try {
          userToken = token;
          console.log("user token: ", userToken);
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userEmail", emailApi);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "REGISTER", id: emailApi, token: userToken });
      } else {
        console.log("Problemas al registrar usuario, error");
      }
    },
    loginWithGoogle: async () => {
      try {
        const result = await Google.logInAsync({
          androidClientId: androidClientId,
          iosClientId: iosClientId,
          scopes: ["profile", "email"],
        });

        if (result.type === "success") {
          console.log(result);
          await AsyncStorage.setItem("userToken", result.idToken);
          await AsyncStorage.setItem("user", JSON.stringify(result.user));
          dispatch({
            type: "LOGIN",
            id: result.user.email,
            token: result.accessToken,
          });
        } else {
          console.log("Cancelado");
        }
      } catch (e) {
        console.log("Error", e);
      }
    },
    loginWithFacebook: async () => {
      try {
        await Facebook.initializeAsync({
          appId: "<APP_ID>",
        });
        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email", "user_friends"],
        });
        if (type === "success") {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
          );
          const resJSON = JSON.stringify(await response.json());
          console.log(resJSON, " ");
          await AsyncStorage.setItem("userToken", token);
          dispatch({ type: "LOGIN", id: resJSON.email, token: token });
        } else {
          // type === 'cancel'
          Alert.alert("cancel");
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userToken, userName;
      userToken = null;
      userName = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        userName = await AsyncStorage.getItem("userEmail");
        console.log(userToken, userName);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <Provider theme={theme}>
        <AuthContext.Provider value={auth}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="ReportsMyCity"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="ReportsMyCity"
                component={NavBar}
                options={{ headerStyle: { backgroundColor: "#3E5EAB" } }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </Provider>
    );
  }
  return (
    <Provider theme={theme}>
      <AuthContext.Provider value={auth}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Stack.Navigator initialRouteName="ReportsMyCity">
              <Stack.Screen
                name="ReportsMyCity"
                component={NavBar}
                options={{ headerStyle: { backgroundColor: "#3E5EAB" } }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}
