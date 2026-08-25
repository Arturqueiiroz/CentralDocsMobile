import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from "../../components/Footer";
import { useTheme } from '../../context/ThemeContext';
import styles from "../../theme/HomeCss";

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
                        Olá, <Text style={[styles.welcomeName, { color: theme.accentColor }]}>Usuário</Text>
                    </Text>
                </View>

                {/* CARDS SUPERIORES */}
                <View style={styles.cardsRow}>
                    <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                        <View style={[styles.cardIconCircle, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Feather name="file-text" size={20} color={theme.accentColor} />
                        </View>
                        <Text style={[styles.number, { color: theme.textPrimary }]}>8</Text>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>Documentos</Text>
                    </View>

                    <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                        <View style={[styles.cardIconCircle, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Feather name="users" size={20} color={theme.accentColor} />
                        </View>
                        <Text style={[styles.number, { color: theme.textPrimary }]}>1</Text>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>   Contribuidores</Text>
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

            <TouchableOpacity
                style={[styles.fab, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}
                activeOpacity={0.8}
                onPress={() => setMenuVisivel(!menuVisivel)}
            >
                <Text style={styles.fabText}>{menuVisivel ? '×' : '+'}</Text>
            </TouchableOpacity>

            <FooterScreen />

            <Modal
                transparent={true}
                visible={menuVisivel}
                animationType="fade"
                onRequestClose={() => setMenuVisivel(false)}
            >
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
