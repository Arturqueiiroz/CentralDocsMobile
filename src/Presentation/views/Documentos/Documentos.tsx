import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Image, Dimensions} from 'react-native';

// Tipagem básica para os itens de arquivo
interface DocumentItem {
    id: string;
    title: string;
    type: 'TRABALHO' | 'PESSOAL';
    info: string;
    iconType: 'pdf' | 'image' | 'excel' | 'folder';
}

const { width } = Dimensions.get('window');

export default function DocumentosScreen() {
    const [activeTab, setActiveTab] = useState<'Tudo' | 'Pessoal' | 'Trabalho'>('Tudo');

    // Dados fictícios baseados na imagem image_945fa9.png
    const documentos: DocumentItem[] = [
        {
            id: '1',
            title: 'Relatório Financeiro do 4º Trimestre.pdf',
            type: 'TRABALHO',
            info: 'Modificado há 2 horas • 2,4 MB',
            iconType: 'pdf',
        },
        {
            id: '2',
            title: 'Passport_Scan_Front.jpg',
            type: 'PESSOAL',
            info: 'Modificado ontem • 1,1 MB',
            iconType: 'image',
        },
        {
            id: '3',
            title: 'Project Timeline v3.xlsx',
            type: 'TRABALHO',
            info: 'Modificado há 3 dias • 840 KB',
            iconType: 'excel',
        },
        {
            id: '4',
            title: 'Fotos de férias de 2024',
            type: 'PESSOAL',
            info: '14 itens • Modificado há 1 semana atrás',
            iconType: 'folder',
        },
    ];

    const renderIcon = (type: string) => {
        // Cores de fundo e emojis simulando os ícones da imagem
        switch (type) {
            case 'pdf': return <View style={[styles.iconContainer, { backgroundColor: '#EEF4FF' }]}><Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>📄</Text></View>;
            case 'image': return <View style={[styles.iconContainer, { backgroundColor: '#F5EEFF' }]}><Text style={{ color: '#9B51E0' }}>🖼️</Text></View>;
            case 'excel': return <View style={[styles.iconContainer, { backgroundColor: '#E6F9EE' }]}><Text style={{ color: '#27AE60' }}>📊</Text></View>;
            case 'folder': return <View style={[styles.iconContainer, { backgroundColor: '#FFF8EC' }]}><Text style={{ color: '#F2994A' }}>📁</Text></View>;
            default: return <View style={styles.iconContainer}><Text>📄</Text></View>;
        }
    };

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuText}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.logoText}>CentralDocs</Text>
                <Image
                    source={{ uri: 'https://via.placeholder.com/40' }}
                    style={styles.avatar}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* BARRA DE PESQUISA */}
                <View style={styles.searchSection}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Pesquise seus arquivos..."
                        placeholderTextColor="#A0AEC0"
                    />
                </View>

                {/* BOTÃO ADICIONAR DOCUMENTO */}
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Adicionar documento</Text>
                </TouchableOpacity>

                {/* FILTROS (CHIPS) */}
                <View style={styles.chipsContainer}>
                    {(['Tudo', 'Pessoal', 'Trabalho'] as const).map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.chip, activeTab === tab && styles.chipActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.chipText, activeTab === tab && styles.chipTextActive]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* SEÇÃO ARQUIVOS RECENTES */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Arquivos recentes</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>Ver tudo</Text>
                    </TouchableOpacity>
                </View>

                {/* LISTA DE DOCUMENTOS */}
                {documentos.map((item) => (
                    <View key={item.id} style={styles.docCard}>
                        {renderIcon(item.iconType)}
                        <View style={styles.docInfo}>
                            <View style={styles.docTitleRow}>
                                <Text style={styles.docTitle} numberOfLines={2}>{item.title}</Text>
                                <View style={[
                                    styles.badge,
                                    { backgroundColor: item.type === 'TRABALHO' ? '#EBF5FF' : '#F3E8FF' }
                                ]}>
                                    <Text style={[
                                        styles.badgeText,
                                        { color: item.type === 'TRABALHO' ? '#3182CE' : '#6B46C1' }
                                    ]}>{item.type}</Text>
                                </View>
                            </View>
                            <Text style={styles.docMeta}>{item.info}</Text>
                        </View>
                        <TouchableOpacity style={styles.moreButton}>
                            <Text style={styles.moreButtonText}>⋮</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {/* BANNER PROMOÇÃO (UPGRADE) */}
                <View style={styles.upgradeBanner}>
                    <Text style={styles.bannerTitle}>Armazenamento em nuvem cheio?</Text>
                    <Text style={styles.bannerSubtitle}>
                        Faça upgrade para a versão Pro e obtenha 2 TB de armazenamento criptografado de documentos.
                    </Text>
                    <TouchableOpacity style={styles.upgradeButton}>
                        <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
                    </TouchableOpacity>
                </View>

                {/* GRID INFERIOR (Cofre / Links) */}
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.gridCard}>
                        <Text style={styles.gridIcon}>🛡️</Text>
                        <Text style={styles.gridText}>Cofre seguro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridCard}>
                        <Text style={styles.gridIcon}>🔗</Text>
                        <Text style={styles.gridText}>Links compartilhados</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* FOOTER TAB BAR BAR (Simulação da barra inferior ativa em Documentos) */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={styles.tabIcon}>🎛️</Text>
                    <Text style={styles.tabLabel}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabItem, styles.tabItemActive]}>
                    <Text style={[styles.tabIcon, styles.tabIconActive]}>📄</Text>
                    <Text style={[styles.tabLabel, styles.tabLabelActive]}>Documentos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={styles.tabIcon}>👤</Text>
                    <Text style={styles.tabLabel}>perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    menuButton: {
        padding: 5,
    },
    menuText: {
        fontSize: 24,
        color: '#3B82F6',
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2B6CB0',
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Espaço para não cobrir atrás da TabBar
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        marginVertical: 15,
        paddingHorizontal: 15,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
        fontSize: 16,
    },
    input: {
        flex: 1,
        color: '#1A202C',
    },
    addButton: {
        backgroundColor: '#0061C4',
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#0061C4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    chipsContainer: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    chip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F1F5F9',
        marginRight: 10,
    },
    chipActive: {
        backgroundColor: '#0061C4',
    },
    chipText: {
        color: '#475569',
        fontWeight: '500',
    },
    chipTextActive: {
        color: '#FFFFFF',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
    },
    viewAllText: {
        color: '#3B82F6',
        fontWeight: '600',
    },
    docCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    docInfo: {
        flex: 1,
    },
    docTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingRight: 5,
    },
    docTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
        flex: 1,
        marginRight: 10,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
    },
    docMeta: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 5,
    },
    moreButton: {
        paddingHorizontal: 5,
    },
    moreButtonText: {
        fontSize: 20,
        color: '#94A3B8',
    },
    upgradeBanner: {
        backgroundColor: '#4D84FF',
        borderRadius: 16,
        padding: 20,
        marginVertical: 15,
    },
    bannerTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
    },
    bannerSubtitle: {
        color: '#E0E7FF',
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 15,
    },
    upgradeButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    upgradeButtonText: {
        color: '#4D84FF',
        fontWeight: '700',
        fontSize: 14,
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    gridCard: {
        backgroundColor: '#FFFFFF',
        width: (width - 55) / 2,
        padding: 15,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    gridIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    gridText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1E293B',
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
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 12,
    },
    tabItemActive: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
    },
    tabIcon: {
        fontSize: 20,
        color: '#94A3B8',
    },
    tabIconActive: {
        color: '#2563EB',
    },
    tabLabel: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 4,
    },
    tabLabelActive: {
        color: '#2563EB',
        fontWeight: '600',
    },
});