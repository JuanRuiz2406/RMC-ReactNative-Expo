import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useContext,
} from "react";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

import { Provider, IconButton, Colors, Avatar } from "react-native-paper";
import { theme } from "./components/core/theme";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { NavBar } from "./components/Navigators/index";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  CompleteUser,
} from "./components/Navigators/index";
import logo from "./image/logoBar.png";

import { newUserThird, newUserFB } from "./components/services/user";

import AuthStackNavigator from "./components/Navigators/AuthStackNavigator";
import { AuthContext } from "./components/contexts/authContext";
//Storage
import AsyncStorage from "@react-native-community/async-storage";
//Login with google and facebook
import firebase from "firebase";
import expo from "expo";
import { firebaseConfig } from "./components/config/firebaseConfig";
import { androidClientId } from "./components/config/superKeyAndroid";
import { iosClientId } from "./components/config/superKeyIOS";
import { idAppFacebook } from "./components/config/idKeyFacebook";
import { Alert } from "react-native";
import { Button } from "react-native";
import updatePasswordWithCode from "./components/screens/updatePasswordWithCode";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Stack = createStackNavigator();

export default function App() {
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
    register: async (emailApi, token, user) => {
      console.log(token);
      if (token != null) {
        let userToken;
        userToken = token;
        console.log("user token: ", userToken);
        await AsyncStorage.setItem("userToken", userToken);
        await AsyncStorage.setItem("userEmail", emailApi);
        await AsyncStorage.setItem("user", JSON.stringify(user));

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
          console.log(result.user.givenName);
          const resposeLoginGSave = await newUserThird(result.user, "google");
          console.log(resposeLoginGSave);
          if (resposeLoginGSave.token != null) {
            await AsyncStorage.setItem("userToken", resposeLoginGSave.token);
            await AsyncStorage.setItem(
              "user",
              JSON.stringify(resposeLoginGSave.user)
            );
            dispatch({
              type: "LOGIN",
              id: result.user.email,
              token: resposeLoginGSave.token,
            });
            console.log("Inicio de sesion correcto");
          } else if (resposeLoginGSave.code === 400) {
            console.log(resposeLoginGSave.message);
          } else if (resposeLoginGSave.code === 404) {
            console.log(resposeLoginGSave.message);
          }
        }
      } catch (e) {
        Alert.alert("Error", e);
      }
    },
    loginWithFacebook: async () => {
      try {
        await Facebook.initializeAsync({
          appId: "490117555335289",
        });
        const {
          type,
          token,
          expirationDate,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
        });
        if (type === "success") {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
          );
          const resJSON = JSON.stringify(await response.json());
          console.log(resJSON, " ");
          const usertemp = JSON.parse(resJSON);
          console.log(usertemp.email);
          const resposeLoginFB = await newUserFB(usertemp, "facebook");
          if (resposeLoginFB.token != null) {
            await AsyncStorage.setItem("userToken", resposeLoginFB.token);
            await AsyncStorage.setItem(
              "user",
              JSON.stringify(resposeLoginFB.user)
            );
            dispatch({
              type: "LOGIN",
              id: usertemp.email,
              token: resposeLoginFB.token,
            });
          } else {
            console.log("Error en el inicio de sesion");
          }
        } else {
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
  return (
    <Provider theme={theme}>
      <AuthContext.Provider value={auth}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Stack.Navigator initialRouteName="ReportsMyCity">
              <Stack.Screen
                name="ReportsMyCity"
                component={NavBar}
                options={{
                  headerStyle: { backgroundColor: "#0277BD" },
                  headerTintColor: "#fff",
                  headerRight: () => (
                    <IconButton
                      icon="logout"
                      color={Colors.white}
                      size={25}
                      onPress={() => auth.logout()}
                    />
                  ),
                }}
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
                name="updatePasswordWithCode"
                component={updatePasswordWithCode}
              />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
              <Stack.Screen name="CompleteUser" component={CompleteUser} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}
