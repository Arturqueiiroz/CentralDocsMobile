import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../theme/ConfiguracaoCss';
import { BiometricService } from '../../services/BiometricService';

const BIOMETRIA_STORAGE_KEY = '@biometria_ativa_v1';

export default function ConfiguracoesScreen() {
    const { isDarkMode, toggleTheme, theme } = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [nomeUsuario, setNomeUsuario] = useState('');
    const [biometria, setBiometria] = useState(false);
    const [alterandoBiometria, setAlterandoBiometria] = useState(false);

    useEffect(() => {
        const carregar = async () => {
            try {
                const usuarioSalvo = await AsyncStorage.getItem('usuario');
                const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
                setNomeUsuario(usuario?.nome || '');

                const biometriaSalva = await AsyncStorage.getItem(BIOMETRIA_STORAGE_KEY);
                setBiometria(biometriaSalva === 'true');
            } catch (error) {
                console.error('Erro ao carregar configurações:', error);
            }
        };

        carregar();
    }, []);

    const inicialAvatar = nomeUsuario.trim().charAt(0).toUpperCase() || '?';

    /**
     * Mesma lógica e mesma chave de armazenamento usadas no
     * Perfil — ativar/desativar aqui reflete lá, e vice-versa.
     */
    const handleToggleBiometria = async (value: boolean) => {
        if (alterandoBiometria) {
            return;
        }

        try {
            setAlterandoBiometria(true);

            if (!value) {
                setBiometria(false);
                await AsyncStorage.setItem(BIOMETRIA_STORAGE_KEY, 'false');
                return;
            }

            const disponivel = await BiometricService.isBiometricAvaliable();

            if (!disponivel) {
                Alert.alert('Biometria indisponível', 'Seu aparelho não possui suporte ou biometria cadastrada.');
                return;
            }

            const autenticou = await BiometricService.autenticarComBiometria(
                'Confirme sua identidade para ativar o login biométrico'
            );

            if (!autenticou) {
                return;
            }

            setBiometria(true);
            await AsyncStorage.setItem(BIOMETRIA_STORAGE_KEY, 'true');
        } catch (error) {
            console.error('Erro ao alternar biometria:', error);
            Alert.alert('Erro', 'Não foi possível alterar a configuração de biometria.');
        } finally {
            setAlterandoBiometria(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <HeaderScreen />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.mainTitle, { color: theme.textPrimary }]}>Configurações</Text>

                <TouchableOpacity
                    style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <View style={styles.profileInfoContainer}>
                        <View style={[styles.profileAvatar, { backgroundColor: isDarkMode ? theme.borderColor : '#1E293B' }]}>
                            <Text style={styles.profileAvatarText}>{inicialAvatar}</Text>
                        </View>
                        <View style={styles.profileTextContainer}>
                            <Text style={[styles.profileName, { color: theme.textPrimary }]}>{nomeUsuario}</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                </TouchableOpacity>

                {/* APARÊNCIA */}
                <View style={styles.sectionHeader}>
                    <Ionicons name="eye-outline" size={18} color={theme.accentColor} />
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>APARÊNCIA</Text>
                </View>

                <View style={[styles.optionsGroup, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                    <View style={styles.optionRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#1E293B' : '#EEF4FF' }]}>
                            <Ionicons name="moon-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>Modo escuro</Text>
                            <Text style={[styles.optionSubtitle, { color: theme.textSecondary }]}>Reduza o brilho e o cansaço visual</Text>
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#CBD5E1', true: theme.accentColor }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>

                {/* NOTIFICAÇÃO — indisponível por enquanto */}
                <View style={styles.sectionHeader}>
                    <Ionicons name="notifications-outline" size={18} color={theme.textSecondary} />
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>NOTIFICAÇÃO</Text>
                </View>

                <View style={[styles.optionsGroup, { backgroundColor: theme.card, borderColor: theme.borderColor, opacity: 0.5 }]}>
                    <View style={styles.optionRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#1E293B' : '#EEF4FF' }]}>
                            <Ionicons name="mail-outline" size={20} color={theme.textSecondary} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>Alertas por e-mail</Text>
                            <Text style={[styles.optionSubtitle, { color: theme.textSecondary }]}>Indisponível no momento</Text>
                        </View>
                        <Switch
                            value={false}
                            disabled
                            trackColor={{ false: '#CBD5E1', true: theme.accentColor }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={[styles.divider, { backgroundColor: theme.borderColor }]} />

                    <View style={styles.optionRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#1E293B' : '#EEF4FF' }]}>
                            <Ionicons name="phone-portrait-outline" size={20} color={theme.textSecondary} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>Push Notifications</Text>
                            <Text style={[styles.optionSubtitle, { color: theme.textSecondary }]}>Indisponível no momento</Text>
                        </View>
                        <Switch
                            value={false}
                            disabled
                            trackColor={{ false: '#CBD5E1', true: theme.accentColor }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>

                {/* SEGURANÇA */}
                <View style={styles.sectionHeader}>
                    <Ionicons name="shield-checkmark-outline" size={18} color={theme.accentColor} />
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>SEGURANÇA</Text>
                </View>

                <View style={[styles.optionsGroup, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                    <View style={styles.optionRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#1E293B' : '#EEF4FF' }]}>
                            <Ionicons name="finger-print-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>Login biométrico</Text>
                            <Text style={[styles.optionSubtitle, { color: theme.textSecondary }]}>Reconhecimento facial ou impressão digital</Text>
                        </View>
                        <Switch
                            value={biometria}
                            onValueChange={handleToggleBiometria}
                            disabled={alterandoBiometria}
                            trackColor={{ false: '#CBD5E1', true: theme.accentColor }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>
            </ScrollView>

            <FooterScreen />
        </View>
    );
}