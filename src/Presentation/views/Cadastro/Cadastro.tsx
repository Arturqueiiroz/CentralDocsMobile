import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../../App';

import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { CustomInput } from '../../components/CustomTextInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../theme/CadastroCss';

export default function RegisterScreen() {
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { theme } = useTheme();

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
                    onPress={() => {}}
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