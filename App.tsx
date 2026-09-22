import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from 'expo-splash-screen';

import { ThemeProvider } from './src/Presentation/context/ThemeContext';
import { SplashView } from './src/Presentation/views/Splash/SplashView';

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
import PerguntasFrequentesScreen from "./src/Presentation/views/PerguntasFrequentes/PerguntasFrequentes";
import SuporteScreen from "./src/Presentation/views/Suporte/Suporte";
import EsqueceuSenhaScreen from "./src/Presentation/views/EsqueceuSenha/EsqueceuSenha";
import AdicionarDocumentoScreen from './src/Presentation/views/AdicionarDocumento/AdicionarDocumento';
import ChatbotScreen from './src/Presentation/views/Chatbot/ChatbotView';

// Manter o splash screen nativo visível enquanto carrega
SplashScreen.preventAutoHideAsync().catch(() => {});

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
  PerguntasFrequentes: undefined;
  Suporte: undefined;
  EsqueceuSenha: { email?: string };
  AdicionarDocumento: undefined;
  Chatbot: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isSplashLoading, setIsSplashLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Oculta a splash screen nativa assim que o JS carregar
        await SplashScreen.hideAsync().catch(() => {});
        
        // Exibe a splash animada por 2.5 segundos
        const timer = setTimeout(() => {
          setIsSplashLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
      } catch (e) {
        console.warn('Erro ao inicializar Splash:', e);
        setIsSplashLoading(false);
      }
    }

    prepare();
  }, []);

  if (isSplashLoading) {
    return <SplashView />;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TelaPrincipal" component={TelaPrincipalScreen} />
          <Stack.Screen name="TelaHome" component={TelaHomeScreen} />
          <Stack.Screen name="Cadastro" component={RegisterScreen} />
          <Stack.Screen name="Biometria" component={ConfirmacaoBiometrica} />
          <Stack.Screen name="Formulario" component={FormularioScreen} />
          <Stack.Screen name="Documentos" component={DocumentosScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
          <Stack.Screen name="QRcode" component={LerDocumentoScreen} />
          <Stack.Screen name="SobreNos" component={SobreNosScreen} />
          <Stack.Screen name="PerguntasFrequentes" component={PerguntasFrequentesScreen} />
          <Stack.Screen name="Suporte" component={SuporteScreen} />
          <Stack.Screen name="AdicionarDocumento" component={AdicionarDocumentoScreen} />
          <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
{/* 
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
                    <Stack.Screen
                        name="PerguntasFrequentes"
                        component={PerguntasFrequentesScreen}
                    />
                    <Stack.Screen
                        name="Suporte"
                        component={SuporteScreen}
                    />
                    <Stack.Screen
                        name="EsqueceuSenha"
                        component={EsqueceuSenhaScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
    */}
