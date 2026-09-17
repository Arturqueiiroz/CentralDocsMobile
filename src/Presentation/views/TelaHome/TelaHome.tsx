import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from "../../components/Footer";
import { useTheme } from '../../context/ThemeContext';
import styles from "../../theme/HomeCss";
import { api } from '../../services/api';
import { RootStackParamList } from '../../../../App';

interface DocumentoAPI {
    id: number;
    numero: string;
    orgaoEmissor: string;
    cidadeEmissao: string;
    dataEmissao: string;
    usuario?: string;
    tipo?: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TelaHomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { theme, isDarkMode } = useTheme();

    const [nomeUsuario, setNomeUsuario] = useState('');
    const [documentos, setDocumentos] = useState<DocumentoAPI[]>([]);
    const [carregando, setCarregando] = useState(true);

    /**
     * Carrega o nome do usuário logado e os documentos reais.
     * Roda toda vez que a tela ganha foco, pra refletir
     * documentos criados/excluídos em outras telas.
     */
    const carregarDados = useCallback(async () => {
        try {
            const usuarioSalvo = await AsyncStorage.getItem('usuario');
            const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
            setNomeUsuario(usuario?.nome?.split(' ')[0] || 'Usuário');
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
        }

        try {
            setCarregando(true);
            const response = await api.get<DocumentoAPI[]>('/Documento');
            setDocumentos(response.data);
        } catch (error) {
            console.error('Erro ao carregar documentos na Home:', error);
        } finally {
            setCarregando(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarDados();
        }, [carregarDados])
    );

    const irParaAdicionarDocumento = () => {
        navigation.navigate('AdicionarDocumento');
    };

    const irParaDocumentos = () => {
        navigation.navigate('Documentos');
    };

    function excluirDocumento(documento: DocumentoAPI) {
        Alert.alert(
            'Excluir documento',
            'Deseja realmente excluir este documento?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/Documento/${documento.id}`);
                            setDocumentos((atual) => atual.filter((doc) => doc.id !== documento.id));
                        } catch (error) {
                            console.error('Erro ao excluir documento:', error);
                            Alert.alert('Erro', 'Não foi possível excluir o documento.');
                        }
                    },
                },
            ]
        );
    }

    const atividadesRecentes = documentos.slice(0, 4);

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
                        Olá, <Text style={[styles.welcomeName, { color: theme.accentColor }]}>{nomeUsuario}</Text>
                    </Text>
                </View>

                {/* CARD DE DOCUMENTOS (dado real) */}
                <View style={[styles.infoCardFull, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
                    <View style={[styles.cardIconCircle, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF', marginBottom: 0 }]}>
                        <Feather name="file-text" size={20} color={theme.accentColor} />
                    </View>
                    <View style={styles.infoCardFullTextBox}>
                        <Text style={[styles.number, { color: theme.textPrimary }]}>
                            {carregando ? '-' : documentos.length}
                        </Text>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>
                            documento{documentos.length !== 1 ? 's' : ''} cadastrado{documentos.length !== 1 ? 's' : ''}
                        </Text>
                    </View>
                </View>

                {/* LEMBRETE — só aparece enquanto não houver nenhum documento */}
                {!carregando && documentos.length === 0 && (
                    <View style={[styles.pendingBanner, { backgroundColor: isDarkMode ? theme.card : '#FFF8E1', borderColor: isDarkMode ? theme.borderColor : '#FDE68A' }]}>
                        <View style={styles.pendingBannerRow}>
                            <View style={[styles.pendingIconCircle, { backgroundColor: isDarkMode ? theme.borderColor : '#FEF3C7' }]}>
                                <Feather name="alert-circle" size={20} color="#D97706" />
                            </View>
                            <View style={styles.pendingTextBox}>
                                <Text style={[styles.pendingTitle, { color: theme.textPrimary }]}>
                                    Comece cadastrando seu primeiro documento
                                </Text>
                                <Text style={[styles.pendingSubtitle, { color: theme.textSecondary }]}>
                                    Leva menos de um minuto.
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={[styles.pendingButton, { backgroundColor: theme.accentColor }]}
                            activeOpacity={0.85}
                            onPress={irParaAdicionarDocumento}
                        >
                            <Text style={styles.pendingButtonText}>Adicionar documento</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* SEÇÃO ATIVIDADE RECENTE */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Atividade recente</Text>
                    <TouchableOpacity onPress={irParaDocumentos}>
                        <Text style={[styles.seeAll, { color: theme.accentColor }]}>Ver tudo</Text>
                    </TouchableOpacity>
                </View>

                {carregando ? (
                    <View style={styles.emptyStateBox}>
                        <ActivityIndicator size="small" color={theme.accentColor} />
                    </View>
                ) : atividadesRecentes.length === 0 ? (
                    <View style={styles.emptyStateBox}>
                        <Feather name="inbox" size={32} color={theme.textSecondary} />
                        <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
                            Seus documentos recentes vão aparecer aqui.
                        </Text>
                    </View>
                ) : (
                    atividadesRecentes.map((documento) => (
                        <TouchableOpacity
                            key={documento.id}
                            style={[styles.activityCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}
                            activeOpacity={0.85}
                            onPress={irParaDocumentos}
                        >
                            <View style={[styles.activityIconContainer, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                                <Feather name="file-text" size={20} color={theme.accentColor} />
                            </View>
                            <View style={styles.activityBody}>
                                <View style={styles.activityHeader}>
                                    <Text style={[styles.activityTitle, { color: theme.textPrimary }]} numberOfLines={1}>
                                        {documento.tipo || 'Documento'}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.deleteActivityButton}
                                        onPress={() => excluirDocumento(documento)}
                                    >
                                        <Ionicons name="trash-outline" size={18} color="#DC2626" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.activitySubtitle, { color: theme.textSecondary }]} numberOfLines={1}>
                                    {documento.numero} • {documento.orgaoEmissor}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {/* BOTÃO FLUTUANTE — vai direto para Adicionar Documento */}
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}
                activeOpacity={0.8}
                onPress={irParaAdicionarDocumento}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <FooterScreen />
        </View>
    );
};

export default TelaHomeScreen;