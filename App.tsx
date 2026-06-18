import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from './src/Presentation/views/Login/Login';
import RegisterScreen from './src/Presentation/views/Cadastro/Cadastro';

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