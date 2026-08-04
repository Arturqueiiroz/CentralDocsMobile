import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { CustomInput } from '../../components/CustomTextInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';

export const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useTheme();

    // Função de login que navega para a Home
    const handleLogin = () => {
        // Aqui você pode adicionar a lógica de autenticação futuramente
        navigation.reset({
            index: 0,
            routes: [{ name: 'TelaHome' as any }], // Garante que o usuário não volte para o login
        });
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

                <TouchableOpacity style={styles.forgotPasswordContainer}>
                    <Text style={[styles.forgotPassword, { color: theme.accentColor }]}>
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity>

                {/* Botão configurado para chamar o handleLogin */}
                <CustomButton
                    title="Entrar"
                    onPress={handleLogin}
                />

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

                <View style={styles.google}>
                    <Text style={{ color: theme.textSecondary }}>Ou entre com</Text>
                </View>

                <TouchableOpacity style={[styles.googleButton, { borderColor: theme.borderColor }]}>
                    <Image
                        source={require('../../../../assets/img/google-icon-1.png')}
                        style={styles.googleIcon}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    card: {
        borderRadius: 20,
        padding: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 250,
        height: 60,
        resizeMode: 'contain',
    },
    subtitle: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: '600',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: 5,
        marginBottom: 15,
    },
    forgotPassword: {
        fontSize: 14,
        fontWeight: '500',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerText: {
        fontSize: 16,
    },
    registerLink: {
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 16,
    },
    google: {
        alignItems: 'center',
        marginTop: 25,
    },
    googleButton: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
    },
    googleIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
});