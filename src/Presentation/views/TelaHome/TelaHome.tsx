import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from '../../components/Footer';

export const TelaHomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Se o seu HeaderScreen customizado não tiver o menu lateral e a logo iguais à imagem, */}
            {/* você pode inspecioná-lo ou usar este abaixo */}
            <HeaderScreen />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* SAUDAÇÃO */}
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>
                        Bom dia, <Text style={styles.welcomeName}>Nickinho</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Seu espaço de trabalho foi <Text style={styles.highlightText}>atualizado</Text>.
                    </Text>
                </View>

                {/* CARDS SUPERIORES */}
                <View style={styles.cardsRow}>
                    <View style={styles.infoCard}>
                        <View style={[styles.cardIconCircle, { backgroundColor: '#EEF4FF' }]}>
                            <Feather name="file-text" size={20} color="#0061C4" />
                        </View>
                        <Text style={styles.number}>128</Text>
                        <Text style={styles.label}>Documentos</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={[styles.cardIconCircle, { backgroundColor: '#EEF4FF' }]}>
                            <Feather name="users" size={20} color="#0061C4" />
                        </View>
                        <Text style={styles.number}>14</Text>
                        <Text style={styles.label}>Contribuidores</Text>
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
                    <Text style={styles.sectionTitle}>Atividade recente</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>Ver tudo</Text>
                    </TouchableOpacity>
                </View>

                {/* LISTA DE ATIVIDADES */}
                {/* Item 1: Currículo */}
                <View style={styles.activityCard}>
                    <View style={[styles.activityIconContainer, { backgroundColor: '#EBF5FF' }]}>
                        <Feather name="file-text" size={20} color="#3182CE" />
                    </View>
                    <View style={styles.activityBody}>
                        <View style={styles.activityHeader}>
                            <Text style={styles.activityTitle} numberOfLines={1}>Curriculaum.</Text>
                            <TouchableOpacity style={styles.moreButton}>
                                <Ionicons name="ellipsis-vertical" size={18} color="#A0AEC0" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.activitySubtitle}>Editado há 2 horas</Text>
                    </View>
                </View>

                {/* Item 2: Relatório Financeiro */}
                <View style={styles.activityCard}>
                    <View style={[styles.activityIconContainer, { backgroundColor: '#E6F9EE' }]}>
                        <Feather name="share-2" size={20} color="#27AE60" />
                    </View>
                    <View style={styles.activityBody}>
                        <View style={styles.activityHeader}>
                            <Text style={styles.activityTitle} numberOfLines={1}>Relatório Financeiro do 4º Trimestre</Text>
                            <TouchableOpacity style={styles.moreButton}>
                                <Ionicons name="ellipsis-vertical" size={18} color="#A0AEC0" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.activitySubtitle}>Compartilhado com Sarah M.</Text>
                    </View>
                </View>

                {/* Item 3: CPF */}
                <View style={styles.activityCard}>
                    <View style={[styles.activityIconContainer, { backgroundColor: '#FFF3E0' }]}>
                        <FontAwesome5 name="star" size={18} color="#F2994A" solid />
                    </View>
                    <View style={styles.activityBody}>
                        <View style={styles.activityHeader}>
                            <Text style={styles.activityTitle} numberOfLines={1}>CPF</Text>
                            <TouchableOpacity style={styles.moreButton}>
                                <Ionicons name="ellipsis-vertical" size={18} color="#A0AEC0" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.activitySubtitle}>Adicionado aos favoritos</Text>
                    </View>
                </View>
            </ScrollView>

            {/* BOTÃO FLUTUANTE (FAB) */}
            <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <FooterScreen />
        </View>
    );
};

export default TelaHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC', // Fundo levemente azulado/cinza claro muito limpo
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 110,
    },
    welcomeContainer: {
        marginBottom: 25,
    },
    welcomeText: {
        fontSize: 16,
        color: '#1E293B',
        fontWeight: '500',
    },
    welcomeName: {
        color: '#0061C4',
        fontWeight: '600',
    },
    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: '#64748B',
    },
    highlightText: {
        color: '#0061C4',
    },
    cardsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoCard: {
        width: '47%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#EDF2F7',
        // Sombra suave para o efeito "clean blured"
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    cardIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    number: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1E293B',
    },
    label: {
        marginTop: 2,
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '500',
    },
    storageCard: {
        backgroundColor: '#1D68E4',
        borderRadius: 20,
        padding: 20,
        marginBottom: 25,
        shadowColor: '#1D68E4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    storageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    storageTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    storageTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
    },
    percent: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 16,
    },
    progressBackground: {
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.25)',
        overflow: 'hidden',
    },
    progressFill: {
        width: '82%',
        height: '100%',
        backgroundColor: '#FFF',
        borderRadius: 3,
    },
    storageText: {
        color: 'rgba(255,255,255,0.85)',
        marginTop: 10,
        fontSize: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    seeAll: {
        color: '#0061C4',
        fontWeight: '600',
        fontSize: 14,
    },
    activityCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EDF2F7',
    },
    activityIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    activityBody: {
        flex: 1,
    },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
        flex: 1,
        paddingRight: 5,
    },
    activitySubtitle: {
        marginTop: 2,
        color: '#94A3B8',
        fontSize: 12,
    },
    moreButton: {
        padding: 4,
    },
    fab: {
        position: 'absolute',
        bottom: 95, // Levemente ajustado para ficar perfeito acima do Footer
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
        zIndex: 99,
    },
    fabText: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: '300',
        marginTop: -2,
    },
});