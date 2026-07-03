import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderScreen } from '../../components/Header'; // Caminho baseado no explorador da image_95bbe7.png

export default function ConfiguracoesScreen() {
    // Estados para os Switches interativos baseados na image_07c98e.png
    const [modoEscuro, setModoEscuro] = useState(false);
    const [alertasEmail, setAlertasEmail] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [biometria, setBiometria] = useState(false);

    return (
        <View style={styles.container}>
            {/* Reutilizando seu cabeçalho global com o Avatar Dinâmico */}
            <HeaderScreen nome="Nickinho" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <Text style={styles.mainTitle}>Configurações</Text>

                {/* CARD DE PERFIL DO USUÁRIO */}
                <TouchableOpacity style={styles.profileCard} activeOpacity={0.9}>
                    <View style={styles.profileInfoContainer}>
                        {/* Avatar Interno do Card */}
                        <View style={styles.profileAvatar}>
                            <Text style={styles.profileAvatarText}>N</Text>
                        </View>
                        <View style={styles.profileTextContainer}>
                            <Text style={styles.profileName}>Nickinho</Text>
                            <Text style={styles.profilePlan}>Plano Membro</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                </TouchableOpacity>

                {/* SEÇÃO: APARÊNCIA */}
                <View style={styles.sectionHeader}>
                    <Ionicons name="eye-outline" size={18} color="#1D68E4" />
                    <Text style={styles.sectionTitle}>APARÊNCIA</Text>
                </View>

                <View style={styles.optionsGroup}>
                    <View style={styles.optionRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: '#EEF4FF' }]}>
                            <Ionicons name="moon-outline" size={20} color="#1D68E4" />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>Modo escuro</Text>
                            <Text style={styles.optionSubtitle}>Reduza o brilho e o cansaço visual</Text>
                        </View>
                        <Switch
                            value={modoEscuro}
                            onValueChange={setModoEscuro}
                            trackColor={{ false: '#CBD5E1', true: '#1D68E4' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
                        <View style={[styles.iconWrapper, { backgroundColor: '#EEF4FF' }]}>
                            <MaterialCommunityIcons name="format-text-size" size={20} color="#1D68E4" />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>Tamanho do texto</Text>
                            <Text style={styles.optionSubtitle}>Médio</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* SEÇÃO: NOTIFICAÇÃO */}
                <View style={styles.sectionHeader}>
                    <Ionicons name="notifications-outline" size={18} color="#1D68E4" />
                    <Text style={styles.sectionTitle}>NOTIFICAÇÃO</Text>
                </View>

                <View style={styles.optionsGroup}>
                    <View style={styles.optionRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: '#EEF4FF' }]}>
                            <Ionicons name="mail-outline" size={20} color="#1D68E4" />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>Alertas por e-mail</Text>
                            <Text style={styles.optionSubtitle}>Atualizações sobre documentos</Text>
                        </View>
                        <Switch
                            value={alertasEmail}
                            onValueChange={setAlertasEmail}
                            trackColor={{ false: '#CBD5E1', true: '#1D68E4' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.optionRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: '#EEF4FF' }]}>
                            <Ionicons name="smartphone-outline" size={20} color="#1D68E4" />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>Push Notifications</Text>
                            <Text style={styles.optionSubtitle}>Diretamente no seu dispositivo</Text>
                        </View>
                        <Switch
                            value={pushNotifications}
                            onValueChange={setPushNotifications}
                            trackColor={{ false: '#CBD5E1', true: '#1D68E4' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>

                {/* SEÇÃO: SEGURANÇA */}
                <View style={styles.sectionHeader}>
                    <Ionicons name="shield-checkmark-outline" size={18} color="#1D68E4" />
                    <Text style={styles.sectionTitle}>SEGURANÇA</Text>
                </View>

                <View style={styles.optionsGroup}>
                    <View style={styles.optionRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: '#EEF4FF' }]}>
                            <Ionicons name="finger-print-outline" size={20} color="#1D68E4" />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>Biometria</Text>
                            <Text style={styles.optionSubtitle}>Reconhecimento facial ou impressão digital</Text>
                        </View>
                        <Switch
                            value={biometria}
                            onValueChange={setBiometria}
                            trackColor={{ false: '#CBD5E1', true: '#1D68E4' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
                        <View style={[styles.iconWrapper, { backgroundColor: '#EEF4FF' }]}>
                            <Ionicons name="key-outline" size={20} color="#1D68E4" />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>Mudar senha</Text>
                            <Text style={styles.optionSubtitle}>Última atualização há 3 meses</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* BANNER: PRECISAR DE AJUDA? */}
                <View style={styles.helpBanner}>
                    <Text style={styles.helpTitle}>Precisar de ajuda?</Text>
                    <Text style={styles.helpSubtitle}>
                        Nossa equipe de suporte está à sua disposição 24 horas por dia, 7 dias por semana.
                    </Text>
                </View>

                {/* RODAPÉ DO CONTEÚDO (Versão e Logout) */}
                <View style={styles.footerInfo}>
                    <Text style={styles.versionText}>CentralDocs v2.4.1</Text>
                    <TouchableOpacity activeOpacity={0.6}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* BARRA DE NAVEGAÇÃO INFERIOR TAB BAR */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="grid-outline" size={22} color="#94A3B8" />
                    <Text style={styles.tabLabel}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="document-text-outline" size={22} color="#94A3B8" />
                    <Text style={styles.tabLabel}>Documentos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabItem, styles.tabItemActive]}>
                    <Ionicons name="person" size={22} color="#2563EB" />
                    <Text style={[styles.tabLabel, styles.tabLabelActive]}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 110,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1E293B',
        marginTop: 15,
        marginBottom: 20,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
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
        backgroundColor: '#1E293B',
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
        color: '#1E293B',
    },
    profilePlan: {
        fontSize: 13,
        color: '#2563EB',
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
        color: '#64748B',
        letterSpacing: 0.5,
    },
    optionsGroup: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
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
        color: '#1E293B',
    },
    optionSubtitle: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
    },
    helpBanner: {
        backgroundColor: '#4D84FF',
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
        color: '#E0E7FF',
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
        color: '#94A3B8',
    },
    logoutText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2563EB',
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    tabItemActive: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 14,
    },
    tabLabel: {
        fontSize: 11,
        color: '#94A3B8',
    },
    tabLabelActive: {
        color: '#2563EB',
        fontWeight: '600',
    },
});