import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderScreen } from '../../components/Header'; // Ajuste os pontinhos de acordo com a pasta onde criar este arquivo
import { FooterScreen } from "../../components/Footer";

export default function PerfilScreen() {
    return (
        <View style={styles.container}>
            {/* HEADER REUTILIZÁVEL */}
            <HeaderScreen nome="Nickinho" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* SEÇÃO DO AVATAR CENTRAL E BADGES */}
                <View style={styles.profileHeaderContainer}>
                    <View style={styles.avatarLargeContainer}>
                        {/* Mantendo o padrão do círculo azul com a letra que você definiu */}
                        <Text style={styles.avatarLargeText}>N</Text>
                        <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
                            <Ionicons name="pencil" size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.profileName}>Nickinho</Text>
                    <Text style={styles.profileRole}>Plano Membro</Text>

                    <View style={styles.badgeRow}>
                        <View style={[styles.statusBadge, { backgroundColor: '#EBF5FF' }]}>
                            <Text style={[styles.statusBadgeText, { color: '#1D68E4' }]}>VERIFICADO</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: '#F1F5F9' }]}>
                            <Text style={[styles.statusBadgeText, { color: '#64748B' }]}>MEMBRO DESDE 2025</Text>
                        </View>
                    </View>
                </View>

                {/* CARD: STATUS DA CONTA (ARMAZENAMENTO) */}
                <View style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardTitle}>Status da conta</Text>
                        <Ionicons name="shield-check-outline" size={20} color="#1D68E4" />
                    </View>

                    <View style={styles.storageTextRow}>
                        <Text style={styles.storageLabel}>Uso de armazenamento</Text>
                        <Text style={styles.storageValue}>12.4 GB / 50 GB</Text>
                    </View>

                    {/* Barra de progresso */}
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: '25%' }]} />
                    </View>

                    <TouchableOpacity style={styles.upgradeLink}>
                        <Ionicons name="arrow-up-circle-outline" size={16} color="#1D68E4" style={{ marginRight: 5 }} />
                        <Text style={styles.upgradeLinkText}>Faça upgrade para a versão</Text>
                    </TouchableOpacity>
                </View>

                {/* CARD: INFORMAÇÕES PESSOAIS */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Informações pessoais</Text>

                    {/* Item: Email */}
                    <TouchableOpacity style={styles.infoRow}>
                        <View style={[styles.infoIconBox, { backgroundColor: '#EEF4FF' }]}>
                            <Ionicons name="mail-outline" size={20} color="#1D68E4" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>EMAIL</Text>
                            <Text style={styles.infoValue}>nickinho@email.com</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
                    </TouchableOpacity>

                    {/* Item: Telefone */}
                    <TouchableOpacity style={styles.infoRow}>
                        <View style={[styles.infoIconBox, { backgroundColor: '#EEF4FF' }]}>
                            <Ionicons name="call-outline" size={20} color="#1D68E4" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>NÚMERO DE TELEFONE</Text>
                            <Text style={styles.infoValue}>(11)98765-4312</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
                    </TouchableOpacity>

                    {/* Item: Localização */}
                    <TouchableOpacity style={styles.infoRow}>
                        <View style={[styles.infoIconBox, { backgroundColor: '#EEF4FF' }]}>
                            <Ionicons name="location-outline" size={20} color="#1D68E4" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>LOCALIZAÇÃO</Text>
                            <Text style={styles.infoValue}>São Paulo - SP</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
                    </TouchableOpacity>
                </View>

                {/* CARD: SEGURANÇA */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Segurança</Text>

                    {/* Item: Alterar Senha */}
                    <TouchableOpacity style={styles.securityRow}>
                        <View style={styles.securityLeft}>
                            <Ionicons name="refresh-outline" size={20} color="#64748B" style={{ marginRight: 12 }} />
                            <Text style={styles.securityText}>Alterar a senha</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={18} color="#CBD5E1" />
                    </TouchableOpacity>

                    {/* Item: Login Biométrico */}
                    <TouchableOpacity style={styles.securityRow}>
                        <View style={styles.securityLeft}>
                            <Ionicons name="finger-print-outline" size={20} color="#64748B" style={{ marginRight: 12 }} />
                            <Text style={styles.securityText}>Login biométrico</Text>
                        </View>
                        <View style={styles.habilitadoBadge}>
                            <Text style={styles.habilitadoText}>HABILITADO</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Item: Autenticação de dois fatores */}
                    <TouchableOpacity style={styles.securityRow}>
                        <View style={styles.securityLeft}>
                            <Ionicons name="shield-checkmark-outline" size={20} color="#64748B" style={{ marginRight: 12 }} />
                            <Text style={styles.securityText}>Autenticação de dois fatores</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={18} color="#CBD5E1" />
                    </TouchableOpacity>
                </View>

                {/* BOTÃO SAIR */}
                <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
                    <Ionicons name="log-out-outline" size={22} color="#DC2626" style={{ marginRight: 8 }} />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>

                {/* VERSÃO DO APP */}
                <Text style={styles.versionText}>APP VERSION 2.4.1 (BUILD 829)</Text>

            </ScrollView>

            <FooterScreen />

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
        paddingBottom: 140, // Respiro confortável no final da rolagem
    },
    profileHeaderContainer: {
        alignItems: 'center',
        marginVertical: 25,
    },
    avatarLargeContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#1D68E4',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#1D68E4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    avatarLargeText: {
        color: '#FFFFFF',
        fontSize: 38,
        fontWeight: '700',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 2,
        backgroundColor: '#1D68E4',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F8FAFC',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginTop: 12,
    },
    profileRole: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 10,
    },
    storageTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    storageLabel: {
        fontSize: 13,
        color: '#64748B',
    },
    storageValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#F1F5F9',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 15,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#1D68E4',
        borderRadius: 4,
    },
    upgradeLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upgradeLinkText: {
        color: '#1D68E4',
        fontSize: 13,
        fontWeight: '600',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    infoIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '700',
    },
    infoValue: {
        fontSize: 14,
        color: '#334155',
        marginTop: 2,
    },
    securityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    securityLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    securityText: {
        fontSize: 14,
        color: '#334155',
        fontWeight: '500',
    },
    habilitadoBadge: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    habilitadoText: {
        color: '#1D68E4',
        fontSize: 10,
        fontWeight: '700',
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    logoutText: {
        color: '#DC2626',
        fontSize: 16,
        fontWeight: '700',
    },
    versionText: {
        textAlign: 'center',
        color: '#94A3B8',
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 0.8,
    },
});