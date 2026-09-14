import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { CustomInput } from '../../components/CustomTextInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import styles from "../../theme/LoginCss";
import { BiometricService } from '../../services/BiometricService';

const NOTIFICATIONS_SETTINGS_KEY = '@user_notifications_settings';

import { api } from '../../services/api';
export const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useTheme();

const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
        Alert.alert(
            'Erro de login',
            'Por favor, preencha todos os campos.'
        );
        return;
    }

    if (
        !email.includes('@') ||
        !email.includes('.') ||
        email.length <= 5
    ) {
        Alert.alert(
            'Erro de login',
            'Por favor, insira um email válido.'
        );
        return;
    }

    if (password.length < 6) {
        Alert.alert(
            'Erro de login',
            'A senha deve ter pelo menos 6 caracteres.'
        );
        return;
    }

    try {
        const response = await api.post('/Usuario/login', {
            email: email.trim(),
            senha: password,
        });

        console.log('Resposta do login:', response.data);

        if (!response.data.erro) {
        const token = response.data.token;
        const usuario = response.data.usuario;

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('usuario', JSON.stringify(usuario));

        console.log('Token salvo!');
        console.log('Usuário:', usuario);

            Alert.alert(
                'Login realizado!',
                `Bem-vindo, ${usuario.nome}!`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'TelaHome' as any }],
                            });
                        },
                    },
                ]
            );
        }

    } catch (error: any) {
        console.log('Erro no login:', error);

        const mensagem =
            error.response?.data?.mensagem ||
            'Não foi possível realizar o login.';

        Alert.alert(
            'Erro de login',
            mensagem
        );
    }
};

    const handleBiometricLogin = async () => {
        // 1. Verifica se o usuário ativou a biometria nas Configurações
        const storedSettings = await AsyncStorage.getItem(NOTIFICATIONS_SETTINGS_KEY);
        if (storedSettings) {
            const { bio } = JSON.parse(storedSettings);
            if (bio === false) {
                Alert.alert("Biometria Desativada", "Ative a biometria nas configurações do aplicativo para utilizar esse recurso.");
                return;
            }
        }

        // 2. Verifica se o dispositivo possui suporte
        const disponivel = await BiometricService.isBiometricAvaliable();
        if (!disponivel) {
            Alert.alert("Biometria Indisponível", "Seu dispositivo não possui biometria configurada.");
            return;
        }

        // 3. Solicita autenticação biométrica
        const autenticado = await BiometricService.autenticarComBiometria("Biometria CentralDocs");
        if (autenticado) {
            handleLogin();
        } else {
            Alert.alert("Erro", "Autenticação biométrica falhou ou foi cancelada.");
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.card, { backgroundColor: theme.card }]}>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../../../assets/img/LogoCentralDocsNova.png')}
                        style={styles.logo}
                    />
                    <Text style={[styles.subtitle, { color: theme.textPrimary }]}>
                        Gerencie seus documentos de forma simples e segura
                    </Text>
                </View>

                <CustomInput
                    label="Email"
                    placeholder="Digite seu email"
                    value={email}
                    property="email"
                    onChangeText={(property, value) => setEmail(value)}
                />

                <View style={styles.passwordHeader}>
                    <Text style={[styles.label, { color: theme.textPrimary }]}>Senha</Text>
                </View>

                <CustomInput
                    placeholder="Digite sua senha"
                    value={password}
                    property="password"
                    secureTextEntry
                    onChangeText={(property, value) => setPassword(value)}
                />

                <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={() => navigation.navigate('EsqueceuSenha', { email })}
                >
                    <Text style={[styles.forgotPassword, { color: theme.accentColor }]}>
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity>

                <CustomButton
                    title="Entrar"
                    onPress={handleLogin}
                />

                {/* Acesso por Biometria / Face ID */}
                <TouchableOpacity
                    style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
                    onPress={handleBiometricLogin}
                >
                    <Ionicons name="finger-print-outline" size={24} color={theme.accentColor} style={{ marginRight: 8 }} />
                    <Text style={{ color: theme.accentColor, fontWeight: 'bold', fontSize: 14 }}>
                        Entrar com Biometria / Face ID
                    </Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={[styles.registerText, { color: theme.textSecondary }]}>
                        Não tem conta?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Cadastro')}
                    >
                        <Text style={[styles.registerLink, { color: theme.accentColor }]}>
                            Criar conta
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};