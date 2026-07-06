import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from "../../components/Footer";
import { useTheme } from '../../context/ThemeContext';

export const TelaHomeScreen = () => {
    const navigation = useNavigation<any>();
    const [menuVisivel, setMenuVisivel] = useState(false);
    const { theme, isDarkMode } = useTheme();

    const irParaFormulario = () => {
        setMenuVisivel(false);
        navigation.navigate('Formulario');
    };

    const irParaQR = () => {
        setMenuVisivel(false);
        navigation.navigate('QRcode');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <HeaderScreen />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* SAUDAÇÃO */}
                <View style={styles.welcomeContainer}>
                    <Text style={[styles.welcomeText, { color: theme.textPrimary }]}>
                        Bom dia, <Text style={[styles.welcomeName, { color: theme.accentColor }]}>Nickinho</Text>
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        Seu espaço de trabalho foi <Text style={[styles.highlightText, { color: theme.accentColor }]}>atualizado</Text>.
                    </Text>
                </View>

                {/* CARDS SUPERIORES */}
                <View style={styles.cardsRow}>
                    <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                        <View style={[styles.cardIconCircle, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Feather name="file-text" size={20} color={theme.accentColor} />
                        </View>
                        <Text style={[styles.number, { color: theme.textPrimary }]}>128</Text>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>Documentos</Text>
                    </View>

                    <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                        <View style={[styles.cardIconCircle, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Feather name="users" size={20} color={theme.accentColor} />
                        </View>
                        <Text style={[styles.number, { color: theme.textPrimary }]}>14</Text>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>Contribuidores</Text>
                    </View>
                </View>

                {/* CARD DE ARMAZENAMENTO */}
                <View style={styles.storageCard}>
                    <View style={styles.storageHeader}>
                        <View style={styles.storageTitleRow}>
                            <Feather name="cloud" size={18} color="#FFF" style={{ marginRight: 8 }} />
                            <Text style={styles.storageTitle}>Armazenamento</Text>
                        </View>
                        <Text style={styles.percent}>82%</Text>
                    </View>

                    <View style={styles.progressBackground}>
                        <View style={styles.progressFill} />
                    </View>

                    <Text style={styles.storageText}>4,1 GB de 5 GB utilizados</Text>
                </View>

                {/* SEÇÃO ATIVIDADE RECENTE */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Atividade recente</Text>
                    <TouchableOpacity>
                        <Text style={[styles.seeAll, { color: theme.accentColor }]}>Ver tudo</Text>
                    </TouchableOpacity>
                </View>

                {/* ATIVIDADE */}
                <View style={[styles.activityCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                    <View style={[styles.activityIconContainer, { backgroundColor: isDarkMode ? theme.borderColor : '#EBF5FF' }]}>
                        <Feather name="file-text" size={20} color={theme.accentColor} />
                    </View>
                    <View style={styles.activityBody}>
                        <View style={styles.activityHeader}>
                            <Text style={[styles.activityTitle, { color: theme.textPrimary }]} numberOfLines={1}>Curriculaum.</Text>
                            <TouchableOpacity style={styles.moreButton}>
                                <Ionicons name="ellipsis-vertical" size={18} color={theme.textSecondary} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.activitySubtitle, { color: theme.textSecondary }]}>Editado há 2 horas</Text>
                    </View>
                </View>
            </ScrollView>

            {/* BOTÃO FLUTUANTE BASE (FAB) - Sempre fixo e visível abaixo ou acima do modal */}
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}
                activeOpacity={0.8}
                onPress={() => setMenuVisivel(!menuVisivel)}
            >
                <Text style={styles.fabText}>{menuVisivel ? '×' : '+'}</Text>
            </TouchableOpacity>

            <FooterScreen />

            {/* === SPEED DIAL MODAL TOTALMENTE TRANSPARENTE === */}
            <Modal
                transparent={true}
                visible={menuVisivel}
                animationType="fade"
                onRequestClose={() => setMenuVisivel(false)}
            >
                {/* Modificado para transparent conforme pedido da imagem (1).png */}
                <Pressable style={styles.modalOverlayTransparent} onPress={() => setMenuVisivel(false)}>

                    {/* Container das opções posicionado logo acima do botão fixo */}
                    <View style={styles.floatingMenu}>

                        {/* Opção 1: Adicionar Documento */}
                        <TouchableOpacity
                            style={styles.speedDialRow}
                            activeOpacity={0.7}
                            onPress={irParaQR}
                        >
                            <View style={[styles.floatingLabelBlue, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}>
                                <Text style={styles.floatingLabelTextWhite}>Adicionar Documento</Text>
                            </View>
                            <View style={[styles.miniFabBlue, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}>
                                <Ionicons name="qr-code-outline" size={18} color="#FFF" />
                            </View>
                        </TouchableOpacity>

                        {/* Opção 2: Formulário */}
                        <TouchableOpacity
                            style={styles.speedDialRow}
                            activeOpacity={0.7}
                            onPress={irParaFormulario}
                        >
                            <View style={[styles.floatingLabelBlue, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}>
                                <Text style={styles.floatingLabelTextWhite}>Formulário</Text>
                            </View>
                            <View style={[styles.miniFabBlue, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}>
                                <Feather name="clipboard" size={18} color="#FFF" />
                            </View>
                        </TouchableOpacity>

                    </View>

                </Pressable>
            </Modal>
        </View>
    );
};

export default TelaHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 140,
    },
    welcomeContainer: { marginBottom: 25 },
    welcomeText: { fontSize: 16, color: '#1E293B', fontWeight: '500' },
    welcomeName: { color: '#0061C4', fontWeight: '600' },
    subtitle: { marginTop: 4, fontSize: 14, color: '#64748B' },
    highlightText: { color: '#0061C4' },
    cardsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    infoCard: { width: '47%', backgroundColor: '#FFF', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#EDF2F7', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
    cardIconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    number: { fontSize: 22, fontWeight: '700', color: '#1E293B' },
    label: { marginTop: 2, fontSize: 13, color: '#94A3B8', fontWeight: '500' },
    storageCard: { backgroundColor: '#1D68E4', borderRadius: 20, padding: 20, marginBottom: 25, shadowColor: '#1D68E4', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 4 },
    storageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    storageTitleRow: { flexDirection: 'row', alignItems: 'center' },
    storageTitle: { color: '#FFF', fontSize: 15, fontWeight: '600' },
    percent: { color: '#FFF', fontWeight: '700', fontSize: 16 },
    progressBackground: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)', overflow: 'hidden' },
    progressFill: { width: '82%', height: '100%', backgroundColor: '#FFF', borderRadius: 3 },
    storageText: { color: 'rgba(255,255,255,0.85)', marginTop: 10, fontSize: 12 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
    seeAll: { color: '#0061C4', fontWeight: '600', fontSize: 14 },
    activityCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 16, padding: 12, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EDF2F7' },
    activityIconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    activityBody: { flex: 1 },
    activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    activityTitle: { fontSize: 14, fontWeight: '600', color: '#1E293B', flex: 1, paddingRight: 5 },
    activitySubtitle: { marginTop: 2, color: '#94A3B8', fontSize: 12 },
    moreButton: { padding: 4 },

    // BOTÃO FAB FIXO NA TELA
    fab: {
        position: 'absolute',
        bottom: 95,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        zIndex: 999, // Fica visível abaixo do toque do modal, ou acima de tudo.
    },
    fabText: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: '300',
        marginTop: -4,
    },

    // OVERLAY COMPLETAMENTE TRANSPARENTE
    modalOverlayTransparent: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    floatingMenu: {
        position: 'absolute',
        bottom: 165, // Posicionado cirurgicamente acima dos 56px + 95px do FAB original
        right: 20,
        alignItems: 'flex-end',
    },
    speedDialRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    // BALÃO COM FUNDO AZUL
    floatingLabelBlue: {
        backgroundColor: '#3B82F6',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    // TEXTO BRANCO
    floatingLabelTextWhite: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    // MINI BOTÃO CIRCULAR AZUL E ALINHADO COM O CENTRO DO FAB PRINCIPAL
    miniFabBlue: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginRight: 8, // Alinhamento exato para bater com o centro do FAB de 56px de largura
    },
});