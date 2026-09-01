import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CustomInput } from '../../components/CustomTextInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import styles from "../../theme/EsqueceuSenhaCss";

type NavigationProp = StackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'EsqueceuSenha'>;

export default function EsqueceuSenhaScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();
    const { theme } = useTheme();

    const [email, setEmail] = useState(route.params?.email ?? '');
    const [linkEnviado, setLinkEnviado] = useState(false);

    function handleEnviarLink() {
        if (!email.trim() || !email.includes('@')) {
            Alert.alert('Email inválido', 'Digite um email válido para receber o link de recuperação.');
            return;
        }

        // chamada para a API de recuperação de senha
        setLinkEnviado(true);
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.card, { backgroundColor: theme.card }]}>

                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: theme.borderColor }]}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={20} color={theme.textPrimary} />
                </TouchableOpacity>

                {!linkEnviado ? (
                    <>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../../../assets/img/LogoCentralDocsNova.png')}
                                style={styles.logo}
                            />
                            <Text style={[styles.title, { color: theme.textPrimary }]}>
                                Esqueceu sua senha?
                            </Text>
                            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                                Digite o email da sua conta e mandamos um link para você criar uma senha nova.
                            </Text>
                        </View>

                        <CustomInput
                            label="Email"
                            placeholder="Digite seu email"
                            value={email}
                            property="email"
                            onChangeText={(property, value) => setEmail(value)}
                            keyboardType="email-address"
                        />

                        <CustomButton
                            title="Enviar link de recuperação"
                            onPress={handleEnviarLink}
                        />

                        <View style={styles.loginContainer}>
                            <Text style={[styles.loginText, { color: theme.textSecondary }]}>
                                Lembrou a senha?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={[styles.loginLink, { color: theme.accentColor }]}>
                                    Fazer login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={styles.confirmationContainer}>
                        <View style={[styles.confirmationIcon, { backgroundColor: theme.accentColor }]}>
                            <Ionicons name="mail-open-outline" size={32} color="#FFFFFF" />
                        </View>

                        <Text style={[styles.confirmationTitle, { color: theme.textPrimary }]}>
                            Verifique seu email
                        </Text>
                        <Text style={[styles.confirmationText, { color: theme.textSecondary }]}>
                            Enviamos as instruções de recuperação para{' '}
                            <Text style={[styles.confirmationEmail, { color: theme.textPrimary }]}>{email}</Text>.
                            {'\n'}Pode levar alguns minutos para chegar.
                        </Text>

                        <CustomButton
                            title="Voltar para o login"
                            onPress={() => navigation.navigate('Login')}
                        />

                        <TouchableOpacity style={styles.resendLink} onPress={() => setLinkEnviado(false)}>
                            <Text style={[styles.resendLinkText, { color: theme.accentColor }]}>
                                Não recebeu? Tentar outro email
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
