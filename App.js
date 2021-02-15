//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthStackNavigator from './components/Navigators/AuthStackNavigator';
import { lightTheme } from './theme/light'
import { AuthContext } from './components/contexts/authContext';
import { BASE_URL } from './components/config';
import { useEffect } from 'react';

import navBar from './components/navbarTap'

const Stack = createStackNavigator();


const App = () => {

  //const [isLoading, setIsLoding] = React.useState(true);
  //const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRUEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: true,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: true,
        };

    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const auth = React.useMemo(() => ({
    login: (userName, password) => {
      let userToken;
      console.log(userName, password);
      if (userName == 'user' && password == 'pass') {
        userToken = 'asdf';
      }
      console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    logout: () => {
      dispatch({ type: 'LOGOUT' });
    },
    register: () => {
      dispatch({ type: 'REGISTER', id: userName, token: userToken });
    },
  }),
  );

  useEffect(() => {
    setTimeout(() => {
      let userToken;
      userToken = 'fgg'
      console.log('user token: ', userToken)
      dispatch({ type: 'REGISTER', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ReportsMyCity">
          <Stack.Screen name="ReportsMyCity" component={navBar} options={{ headerStyle: { backgroundColor: '#008652' } }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer theme={lightTheme}>
        {loginState.userToken == ! null ? (
          <Stack.Navigator initialRouteName="ReportsMyCity">
            <Stack.Screen name="ReportsMyCity" component={navBar} options={{ headerStyle: { backgroundColor: '#008652' } }} />
          </Stack.Navigator>
        )
          :
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name={'AuthStack2'} component={AuthStackNavigator} />
          </Stack.Navigator>
        }


      </NavigationContainer>
    </AuthContext.Provider >

  );
}

export default App;
