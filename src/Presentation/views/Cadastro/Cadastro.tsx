import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../../App';

import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

// ✅ Caminhos corrigidos
import { CustomInput } from '../../components/CustomTextInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { register as registerService } from '../../../services/AuthServices';

export default function RegisterScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    const handleRegister = async () => {
        if (!email || !cpf || !password || !confirmPassword) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Atenção', 'As senhas não conferem.');
            return;
        }

        // Mapeando dados do formulário para o formato da API.
        const nomeDerivado = email.split('@')[0];
        const cpfLimpo = cpf.replace(/[^\d]/g, '');
        const nomeUsuario = cpfLimpo || email;

        setLoading(true);
        try {
            await registerService({
                nome: nomeDerivado,
                nomeUsuario: nomeUsuario,
                email: email,
                telefone: null,
                senha: password,
                imagemUrl: null,
            });

            Alert.alert('Sucesso', 'Conta criada com sucesso!', [
                {
                    text: 'Ok',
                    onPress: () => {
                        navigation.navigate('Login');
                    }
                }
            ]);
        } catch (error: any) {
            Alert.alert('Erro no Cadastro', error.message || 'Não foi possível realizar o cadastro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.card, { backgroundColor: theme.card }]}>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../../../assets/img/LogoCentralDocsNova.png')}
                        style={styles.logo}
                    />

                    <Text style={[styles.subtitle, { color: theme.textPrimary }]}>
                        Gerenciamento de documentos
                    </Text>
                </View>

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
                    onChangeText={(property, value) => setConfirmPassword(value)}
                />

                <CustomButton
                    title={loading ? "Cadastrando..." : "Criar Conta"}
                    onPress={handleRegister}
                />

                <View style={styles.loginContainer}>
                    <Text style={[styles.loginText, { color: theme.textSecondary }]}>
                        Já tem conta?
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={[styles.loginLink, { color: theme.accentColor }]}>
                            Fazer login
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.google}>
                    <Text style={{ color: theme.textSecondary }}>Ou criar com</Text>
                </View>

                <TouchableOpacity style={[styles.googleButton, { borderColor: theme.borderColor }]}>
                    <Image
                        source={require('../../../../assets/img/google-icon-1.png')}
                        style={styles.googleIcon}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F8FF',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 25,
        elevation: 5,
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },

    logo: {
        width: 300,
        height: 80,
        resizeMode: 'contain',
    },

    subtitle: {
        marginTop: 10,
        color: '#1f1f1f',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
    },

    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },

    loginText: {
        color: '#666',
        fontSize: 17,
    },

    loginLink: {
        color: '#0A5BC4',
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 17,
    },

    google: {
        alignItems: 'center',
        marginTop: 20,
    },

    googleButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
    },

    googleIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});