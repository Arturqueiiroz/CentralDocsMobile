import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../../App';

import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

import { CustomInput } from '../../components/CustomTextInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../theme/CadastroCss';

import { api } from '../../services/api';

export default function RegisterScreen() {
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nome, setNome] = useState('');

    const { theme } = useTheme();

async function handleRegister() {
    const cpfLimpo = cpf.replace(/\D/g, '');

    if ( !nome.trim() || !email.trim() || !cpfLimpo.trim() || !password.trim() || !confirmPassword.trim()
    ) {
        Alert.alert('Erro de cadastro', 'Por favor, preencha todos os campos.' );
        return;
    }

    if ( !email.includes('@') || !email.includes('.') || email.length <= 5
    ) {
        Alert.alert('Erro de cadastro','Por favor, insira um email válido.');
        return;
    }

    if (cpfLimpo.length !== 11) {
        Alert.alert( 'Erro de cadastro', 'Por favor, insira um CPF válido.' );
        return;
    }

    if (password.length < 6) {
        Alert.alert( 'Erro de cadastro', 'A senha deve ter pelo menos 6 caracteres.' );
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert( 'Erro de cadastro', 'As senhas não coincidem.' );
        return;
    }

    try {
        const response = await api.post('/Usuario/CriarUsuario', {
            nome: nome.trim(), email: email.trim(), cpf: cpfLimpo, senha: password, confirmarSenha: confirmPassword,
        });

        console.log('Resposta da API:', response.data);

        if (!response.data.erro) {
            Alert.alert( 'Cadastro realizado!', 'Sua conta foi criada com sucesso.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login'),
                    },
                ]
            );
        }
    } catch (error: any) {
        console.log('Erro no cadastro:', error);

        const mensagem =
            error.response?.data?.mensagem ||
            'Não foi possível realizar o cadastro.';

        Alert.alert(
            'Erro de cadastro',
            mensagem
        );
    }
}

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.background }
            ]}
        >
            <View
                style={[
                    styles.card,
                    { backgroundColor: theme.card }
                ]}
            >

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../../../assets/img/LogoCentralDocsNova.png')}
                        style={styles.logo}
                    />

                    <Text
                        style={[
                            styles.subtitle,
                            { color: theme.textPrimary }
                        ]}
                    >
                        Gerenciamento de documentos
                    </Text>
                </View>
                <CustomInput
                    label="Nome"
                    placeholder="Digite seu nome"
                    value={nome}
                    property="nome"
                    onChangeText={(property, value) => setNome(value)}
                />                

                <CustomInput
                    label="Email"
                    placeholder="Digite seu email"
                    value={email}
                    property="email"
                    onChangeText={(property, value) => setEmail(value)}
                />

                <CustomInput
                    label="CPF"
                    placeholder="CPF"
                    value={cpf}
                    property="cpf"
                    onChangeText={(property, value) => setCpf(value)}
                />

                <CustomInput
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={password}
                    property="password"
                    secureTextEntry
                    onChangeText={(property, value) => setPassword(value)}
                />

                <CustomInput
                    label="Confirmar Senha"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    property="confirmPassword"
                    secureTextEntry
                    onChangeText={(property, value) =>
                        setConfirmPassword(value)
                    }
                />

                <CustomButton
                    title="Criar Conta"
                    onPress={handleRegister}
                />

                <View style={styles.loginContainer}>
                    <Text
                        style={[
                            styles.loginText,
                            { color: theme.textSecondary }
                        ]}
                    >
                        Já tem conta?
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text
                            style={[
                                styles.loginLink,
                                { color: theme.accentColor }
                            ]}
                        >
                            Fazer login
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.google}>
                    <Text style={{ color: theme.textSecondary }}>
                        Ou criar com
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.googleButton,
                        { borderColor: theme.borderColor }
                    ]}
                >
                    <Image
                        source={require('../../../../assets/img/google-icon-1.png')}
                        style={styles.googleIcon}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}