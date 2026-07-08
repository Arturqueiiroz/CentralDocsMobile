import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeProvider } from './src/Presentation/context/ThemeContext';

import { TelaPrincipalScreen } from './src/Presentation/views/TelaPrincipal/TelaPrincipal';
import { LoginScreen } from './src/Presentation/views/Login/Login';
import RegisterScreen from './src/Presentation/views/Cadastro/Cadastro';
import TelaHomeScreen from './src/Presentation/views/TelaHome/TelaHome';
import ConfirmacaoBiometrica from "./src/Presentation/views/Biometria/Biometria";
import FormularioScreen from "./src/Presentation/views/Formulario/Formulario";
import DocumentosScreen from "./src/Presentation/views/Documentos/Documentos";
import PerfilScreen from "./src/Presentation/views/Perfil/Perfil";
import ConfiguracoesScreen from "./src/Presentation/views/Configuração/Configuracao";
import LerDocumentoScreen from "./src/Presentation/views/QRcode/Qrcode";
import SobreNosScreen from "./src/Presentation/views/SobreNos/Sobrenos";

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Biometria: undefined;
  TelaHome: undefined;
  TelaPrincipal: undefined;
  Formulario: undefined;
  Documentos: undefined;
  Perfil: undefined;
  Configuracoes: undefined;
  QRcode: undefined;
  SobreNos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (

    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TelaPrincipal"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="TelaPrincipal"
            component={TelaPrincipalScreen}
          />
          <Stack.Screen
            name="TelaHome"
            component={TelaHomeScreen}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Cadastro"
            component={RegisterScreen}
          />
          <Stack.Screen
            name="Biometria"
            component={ConfirmacaoBiometrica}
          />
          <Stack.Screen
            name="Formulario"
            component={FormularioScreen}
          />
          <Stack.Screen
            name="Documentos"
            component={DocumentosScreen}
          />
          <Stack.Screen
            name="Perfil"
            component={PerfilScreen}
          />
          <Stack.Screen
            name="Configuracoes"
            component={ConfiguracoesScreen}
          />
          <Stack.Screen
            name="QRcode"
            component={LerDocumentoScreen}
          />
          <Stack.Screen
            name="SobreNos"
            component={SobreNosScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}