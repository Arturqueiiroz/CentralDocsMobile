import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "./src/Presentation/views/Login/Login";
import RegisterScreen from "./src/Presentation/views/Cadastro/Cadastro";
import ConfirmacaoBiometrica from "./src/Presentation/views/Biometria/Biometria";

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Biometria: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Biometria"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Biometria"
          component={ConfirmacaoBiometrica}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Cadastro"
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}