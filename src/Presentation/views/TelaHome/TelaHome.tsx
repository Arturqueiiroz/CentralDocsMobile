import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from "../../components/Footer";
import { useTheme } from '../../context/ThemeContext';
import styles from "../../theme/HomeCss";

// Dados mockados para exibição de atividades
const MOCK_ATIVIDADES = [
    {
        id: '1',
        title: 'Currículo_2026.pdf',
        subtitle: 'Editado há 2 horas',
        icon: 'file-text',
        badgeColor: '#EBF5FF',
    },
    {
        id: '2',
        title: 'Comprovante_Residencia.png',
        subtitle: 'Enviado ontem',
        icon: 'image',
        badgeColor: '#E1F5FE',
    },
    {
        id: '3',
        title: 'Formulário_Inscrição',
        subtitle: 'Concluído há 3 dias',
        icon: 'check-square',
        badgeColor: '#E8F5E9',
    },
];

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

    // NAVEGAÇÃO PARA O CHATBOT DO DOC
    const irParaChatbot = () => {
        setMenuVisivel(false);
        navigation.navigate('Chatbot');
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
                        Olá, <Text style={[styles.welcomeName, { color: theme.accentColor }]}>Usuário</Text>
                    </Text>
                </View>

                {/* CARDS SUPERIORES - SEM CONTRIBUINTE */}
                <View style={styles.cardsRow}>
                    <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                        <View style={[styles.cardIconCircle, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Feather name="file-text" size={20} color={theme.accentColor} />
                        </View>
                        <Text style={[styles.number, { color: theme.textPrimary }]}>8</Text>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>Documentos</Text>
                    </View>

                    <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                        <View style={[styles.cardIconCircle, { backgroundColor: isDarkMode ? theme.borderColor : '#FFF8E1' }]}>
                            <Feather name="clock" size={20} color="#F59E0B" />
                        </View>
                        <Text style={[styles.number, { color: theme.textPrimary }]}>2</Text>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>Pendentes</Text>
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

                {/* LISTA DE ATIVIDADES MOCKADAS */}
                {MOCK_ATIVIDADES.map((item) => (
                    <View key={item.id} style={[styles.activityCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                        <View style={[styles.activityIconContainer, { backgroundColor: isDarkMode ? theme.borderColor : item.badgeColor }]}>
                            <Feather name={item.icon as any} size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.activityBody}>
                            <View style={styles.activityHeader}>
                                <Text style={[styles.activityTitle, { color: theme.textPrimary }]} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <TouchableOpacity style={styles.moreButton}>
                                    <Ionicons name="ellipsis-vertical" size={18} color={theme.textSecondary} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.activitySubtitle, { color: theme.textSecondary }]}>
                                {item.subtitle}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* BOTÃO FLUTUANTE (FAB) */}
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}
                activeOpacity={0.8}
                onPress={() => setMenuVisivel(!menuVisivel)}
            >
                <Text style={styles.fabText}>{menuVisivel ? '×' : '+'}</Text>
            </TouchableOpacity>

            <FooterScreen />

            {/* MODAL DO MENU RÁPIDO COM OPÇÃO DO DOC */}
            <Modal
                transparent={true}
                visible={menuVisivel}
                animationType="fade"
                onRequestClose={() => setMenuVisivel(false)}
            >
                <Pressable style={styles.modalOverlayTransparent} onPress={() => setMenuVisivel(false)}>
                    <View style={styles.floatingMenu}>
                        
                        {/* OPÇÃO 1: FALAR COM O DOC */}
                        <TouchableOpacity
                            style={styles.speedDialRow}
                            activeOpacity={0.7}
                            onPress={irParaChatbot}
                        >
                            <View style={[styles.floatingLabelBlue, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}>
                                <Text style={styles.floatingLabelTextWhite}>Falar com o Doc</Text>
                            </View>
                            <View style={[styles.miniFabBlue, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}>
                                <Ionicons name="chatbubble-ellipses-outline" size={18} color="#FFF" />
                            </View>
                        </TouchableOpacity>

                        {/* OPÇÃO 2: ADICIONAR DOCUMENTO (QR CODE) */}
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

                        {/* OPÇÃO 3: FORMULÁRIO */}
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