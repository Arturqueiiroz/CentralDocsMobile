import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from './src/Presentation/views/Login/Login';
import RegisterScreen from './src/Presentation/views/Cadastro/Cadastro';
import { HeaderScreen } from './src/Presentation/components/Header';
import ProfileScreen from './src/Presentation/views/TelaPrincipal/TelaPrincipal';
import TelaHomeScreen from './src/Presentation/views/TelaHome/TelaHome';

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                
                {/* <Stack.Screen
                    name="TelaPrincipl"
                    component={ProfileScreen}
                />                 */}
{/*                 
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />

                <Stack.Screen
                    name="Cadastro"
                    component={RegisterScreen}
                />
                
               
                
                <Stack.Screen
                    name="Header"
                    component={HeaderScreen}
                /> */}

                <Stack.Screen
                    name="TelaHome"
                    component={TelaHomeScreen}
                />



            </Stack.Navigator>
        </NavigationContainer>
    );
}