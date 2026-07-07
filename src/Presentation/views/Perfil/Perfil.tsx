import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderScreen } from '../../components/Header'; // Ajuste os pontinhos de acordo com a pasta onde criar este arquivo
import { FooterScreen } from "../../components/Footer";
import { useTheme } from '../../context/ThemeContext';
import styles from "../../theme/PerfilCss";

export default function PerfilScreen() {
    const { theme, isDarkMode } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* HEADER REUTILIZÁVEL */}
            <HeaderScreen />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* SEÇÃO DO AVATAR CENTRAL E BADGES */}
                <View style={styles.profileHeaderContainer}>
                    <View style={[styles.avatarLargeContainer, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}>
                        {/* Mantendo o padrão do círculo azul com a letra que você definiu */}
                        <Text style={styles.avatarLargeText}>N</Text>
                        <TouchableOpacity style={[styles.editBadge, { backgroundColor: theme.accentColor, borderColor: theme.background }]} activeOpacity={0.8}>
                            <Ionicons name="pencil" size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.profileName, { color: theme.textPrimary }]}>Nickinho</Text>
                    <Text style={[styles.profileRole, { color: theme.textSecondary }]}>Plano Membro</Text>

                    <View style={styles.badgeRow}>
                        <View style={[styles.statusBadge, { backgroundColor: isDarkMode ? theme.borderColor : '#EBF5FF' }]}>
                            <Text style={[styles.statusBadgeText, { color: theme.accentColor }]}>VERIFICADO</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: isDarkMode ? theme.borderColor : '#F1F5F9' }]}>
                            <Text style={[styles.statusBadgeText, { color: theme.textSecondary }]}>MEMBRO DESDE 2025</Text>
                        </View>
                    </View>
                </View>

                {/* CARD: STATUS DA CONTA (ARMAZENAMENTO) */}
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Status da conta</Text>
                        <Ionicons name="arrow-up-circle-outline" size={20} color={theme.accentColor} />
                    </View>

                    <View style={styles.storageTextRow}>
                        <Text style={[styles.storageLabel, { color: theme.textSecondary }]}>Uso de armazenamento</Text>
                        <Text style={[styles.storageValue, { color: theme.textPrimary }]}>12.4 GB / 50 GB</Text>
                    </View>

                    {/* Barra de progresso */}
                    <View style={[styles.progressBarBackground, { backgroundColor: theme.borderColor }]}>
                        <View style={[styles.progressBarFill, { width: '25%', backgroundColor: theme.accentColor }]} />
                    </View>

                    <TouchableOpacity style={styles.upgradeLink}>
                        <Ionicons name="arrow-up-circle-outline" size={16} color={theme.accentColor} style={{ marginRight: 5 }} />
                        <Text style={[styles.upgradeLinkText, { color: theme.accentColor }]}>Faça upgrade para a versão</Text>
                    </TouchableOpacity>
                </View>

                {/* CARD: INFORMAÇÕES PESSOAIS */}
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Informações pessoais</Text>

                    {/* Item: Email */}
                    <TouchableOpacity style={[styles.infoRow, { borderBottomColor: theme.borderColor }]}>
                        <View style={[styles.infoIconBox, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Ionicons name="mail-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>EMAIL</Text>
                            <Text style={[styles.infoValue, { color: theme.textPrimary }]}>nickinho@email.com</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {/* Item: Telefone */}
                    <TouchableOpacity style={[styles.infoRow, { borderBottomColor: theme.borderColor }]}>
                        <View style={[styles.infoIconBox, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Ionicons name="call-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>NÚMERO DE TELEFONE</Text>
                            <Text style={[styles.infoValue, { color: theme.textPrimary }]}>(11)98765-4312</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {/* Item: Localização */}
                    <TouchableOpacity style={[styles.infoRow, { borderBottomColor: theme.borderColor }]}>
                        <View style={[styles.infoIconBox, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Ionicons name="location-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>LOCALIZAÇÃO</Text>
                            <Text style={[styles.infoValue, { color: theme.textPrimary }]}>São Paulo - SP</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* CARD: SEGURANÇA */}
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Segurança</Text>

                    {/* Item: Alterar Senha */}
                    <TouchableOpacity style={[styles.securityRow, { borderBottomColor: theme.borderColor }]}>
                        <View style={styles.securityLeft}>
                            <Ionicons name="refresh-outline" size={20} color={theme.textSecondary} style={{ marginRight: 12 }} />
                            <Text style={[styles.securityText, { color: theme.textPrimary }]}>Alterar a senha</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>

                    {/* Item: Login Biométrico */}
                    <TouchableOpacity style={[styles.securityRow, { borderBottomColor: theme.borderColor }]}>
                        <View style={styles.securityLeft}>
                            <Ionicons name="finger-print-outline" size={20} color={theme.textSecondary} style={{ marginRight: 12 }} />
                            <Text style={[styles.securityText, { color: theme.textPrimary }]}>Login biométrico</Text>
                        </View>
                        <View style={[styles.habilitadoBadge, { backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF' }]}>
                            <Text style={[styles.habilitadoText, { color: theme.accentColor }]}>HABILITADO</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Item: Autenticação de dois fatores */}
                    <TouchableOpacity style={[styles.securityRow, { borderBottomColor: theme.borderColor }]}>
                        <View style={styles.securityLeft}>
                            <Ionicons name="shield-checkmark-outline" size={20} color={theme.textSecondary} style={{ marginRight: 12 }} />
                            <Text style={[styles.securityText, { color: theme.textPrimary }]}>Autenticação de dois fatores</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* BOTÃO SAIR */}
                <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.card, borderColor: theme.borderColor }]} activeOpacity={0.7}>
                    <Ionicons name="log-out-outline" size={22} color="#DC2626" style={{ marginRight: 8 }} />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>

                {/* VERSÃO DO APP */}
                <Text style={[styles.versionText, { color: theme.textSecondary }]}>APP VERSION 2.4.1 (BUILD 829)</Text>

            </ScrollView>

            <FooterScreen />

        </View>
    );
}