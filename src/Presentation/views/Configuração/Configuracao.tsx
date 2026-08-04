import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useTheme } from '../../context/ThemeContext';

const NOTIFICATIONS_SETTINGS_KEY = '@user_notifications_settings';

// Checa se a aplicação está rodando no Expo Go
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export default function ConfiguracoesScreen() {
    const { isDarkMode, toggleTheme, theme } = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [alertasEmail, setAlertasEmail] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [biometria, setBiometria] = useState(false);

    // Carrega as preferências salvas no dispositivo
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedSettings = await AsyncStorage.getItem(NOTIFICATIONS_SETTINGS_KEY);
                if (storedSettings !== null) {
                    const { email, push, bio } = JSON.parse(storedSettings);
                    if (email !== undefined) setAlertasEmail(email);
                    if (push !== undefined) setPushNotifications(push);
                    if (bio !== undefined) setBiometria(bio);
                }
            } catch (error) {
                console.error('Erro ao carregar configurações:', error);
            }
        };

        loadSettings();
    }, []);

    // Salva as configurações localmente
    const saveSettings = async (emailVal: boolean, pushVal: boolean, bioVal: boolean) => {
        try {
            await AsyncStorage.setItem(
                NOTIFICATIONS_SETTINGS_KEY,
                JSON.stringify({ email: emailVal, push: pushVal, bio: bioVal })
            );
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
        }
    };

    const handleToggleEmail = (value: boolean) => {
        setAlertasEmail(value);
        saveSettings(value, pushNotifications, biometria);
    };

    const handleTogglePush = async (value: boolean) => {
        if (value) {
            // Se estiver no Expo Go, avisa o usuário e ignora a chamada de permissão nativa para evitar o erro
            if (isExpoGo) {
                Alert.alert(
                    'Modo Expo Go',
                    'Push notifications remotas não são suportadas dentro do Expo Go no SDK 53+. Para testar notificações reais, utilize uma Development Build.'
                );
                setPushNotifications(true);
                saveSettings(alertasEmail, true, biometria);
                return;
            }

            // Se for em Build de Desenvolvimento ou Produção, pede a permissão normalmente
            try {
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Atenção', 'A permissão para enviar notificações foi negada no dispositivo.');
                    setPushNotifications(false);
                    saveSettings(alertasEmail, false, biometria);
                    return;
                }
            } catch (error) {
                console.warn('Erro ao solicitar permissões de notificação:', error);
            }
        }
        setPushNotifications(value);
        saveSettings(alertasEmail, value, biometria);
    };

    const handleToggleBiometria = (value: boolean) => {
        setBiometria(value);
        saveSettings(alertasEmail, pushNotifications, value);
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
                            <Text style={styles.profileAvatarText}>N</Text>
                        </View>
                        <View style={styles.profileTextContainer}>
                            <Text style={[styles.profileName, { color: theme.textPrimary }]}>Nickinho</Text>
                            <Text style={[styles.profilePlan, { color: theme.accentColor }]}>Plano Membro</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                </TouchableOpacity>

                {/* SEÇÃO APARÊNCIA */}
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

                    <View style={[styles.divider, { backgroundColor: theme.borderColor }]} />

                    <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
                        <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#1E293B' : '#EEF4FF' }]}>
                            <MaterialCommunityIcons name="format-size" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>Tamanho do texto</Text>
                            <Text style={[styles.optionSubtitle, { color: theme.textSecondary }]}>Médio</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* SEÇÃO NOTIFICAÇÃO */}
                <View style={styles.sectionHeader}>
                    <Ionicons name="notifications-outline" size={18} color={theme.accentColor} />
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>NOTIFICAÇÃO</Text>
                </View>

                <View style={[styles.optionsGroup, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                    <View style={styles.optionRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#1E293B' : '#EEF4FF' }]}>
                            <Ionicons name="mail-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>Alertas por e-mail</Text>
                            <Text style={[styles.optionSubtitle, { color: theme.textSecondary }]}>Atualizações sobre documentos</Text>
                        </View>
                        <Switch
                            value={alertasEmail}
                            onValueChange={handleToggleEmail}
                            trackColor={{ false: '#CBD5E1', true: theme.accentColor }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={[styles.divider, { backgroundColor: theme.borderColor }]} />

                    <View style={styles.optionRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#1E293B' : '#EEF4FF' }]}>
                            <Ionicons name="phone-portrait-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>Push Notifications</Text>
                            <Text style={[styles.optionSubtitle, { color: theme.textSecondary }]}>Diretamente no seu dispositivo</Text>
                        </View>
                        <Switch
                            value={pushNotifications}
                            onValueChange={handleTogglePush}
                            trackColor={{ false: '#CBD5E1', true: theme.accentColor }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>

                {/* SEÇÃO SEGURANÇA */}
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
                            <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>Biometria</Text>
                            <Text style={[styles.optionSubtitle, { color: theme.textSecondary }]}>Reconhecimento facial ou impressão digital</Text>
                        </View>
                        <Switch
                            value={biometria}
                            onValueChange={handleToggleBiometria}
                            trackColor={{ false: '#CBD5E1', true: theme.accentColor }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={[styles.divider, { backgroundColor: theme.borderColor }]} />

                    <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
                        <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#1E293B' : '#EEF4FF' }]}>
                            <Ionicons name="key-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>Mudar senha</Text>
                            <Text style={[styles.optionSubtitle, { color: theme.textSecondary }]}>Última atualização há 3 meses</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.helpBanner, { backgroundColor: isDarkMode ? theme.borderColor : theme.accentColor }]}>
                    <Text style={styles.helpTitle}>Precisar de ajuda?</Text>
                    <Text style={[styles.helpSubtitle, { color: isDarkMode ? theme.textSecondary : '#E0E7FF' }]}>
                        Nossa equipe de suporte está à sua disposição 24 horas por dia, 7 dias por semana.
                    </Text>
                </View>

                <View style={styles.footerInfo}>
                    <Text style={[styles.versionText, { color: theme.textSecondary }]}>CentralDocs v2.4.1</Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate('TelaPrincipal')}
                    >
                        <Text style={[styles.logoutText, { color: theme.accentColor }]}>Logout</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <FooterScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 110,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: '700',
        marginTop: 15,
        marginBottom: 20,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 25,
    },
    profileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    profileAvatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileAvatarText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    profileTextContainer: {
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '700',
    },
    profilePlan: {
        fontSize: 13,
        fontWeight: '500',
        marginTop: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    optionsGroup: {
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 16,
        marginBottom: 25,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
    },
    iconWrapper: {
        width: 38,
        height: 38,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    optionSubtitle: {
        fontSize: 11,
        marginTop: 2,
    },
    divider: {
        height: 1,
    },
    helpBanner: {
        borderRadius: 16,
        padding: 20,
        marginTop: 10,
        marginBottom: 30,
    },
    helpTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
    },
    helpSubtitle: {
        fontSize: 12,
        lineHeight: 18,
    },
    footerInfo: {
        alignItems: 'center',
        gap: 10,
        marginBottom: 15,
    },
    versionText: {
        fontSize: 11,
    },
    logoutText: {
        fontSize: 13,
        fontWeight: '600',
    },
});