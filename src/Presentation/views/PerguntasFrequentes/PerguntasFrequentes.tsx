import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar,  LayoutAnimation, Platform, UIManager, Animated, } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Ajuste/remova se não usar React Navigation
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext'; // Ajuste o caminho se necessário
import { HeaderScreen } from "../../components/Header";

// Habilita animações no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Paleta azul de apoio (independente do tema, usada como "cor de marca")
const BRAND = {
    primary: '#2563EB',      // azul principal
    primaryDark: '#1D4ED8',
    primaryLight: '#DBEAFE', // fundo tintado claro
    primarySoft: '#EFF6FF',  // fundo bem suave
};

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    icon: keyof typeof Ionicons.glyphMap;
    badge?: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        id: '1',
        question: 'O que é o CentralDocs?',
        answer:
            'O CentralDocs é uma plataforma de gerenciamento de documentos de nível empresarial projetada para centralizar, organizar e proteger os ativos de informação da sua instituição. Oferecemos ferramentas avançadas de indexação, busca inteligente e conformidade regulatória.',
        icon: 'layers-outline',
    },
    {
        id: '2',
        question: 'Meus dados estão seguros?',
        answer:
            'Sim! Utilizamos criptografia de ponta a ponta (AES-256) tanto para dados armazenados quanto em trânsito, garantindo total conformidade com a LGPD e altos padrões de segurança cibernética.',
        icon: 'shield-checkmark-outline',
    },
    {
        id: '3',
        question: 'Como posso fazer o upload de vários documentos?',
        answer:
            'Você pode selecionar múltiplos arquivos na tela de envio ou utilizar a função de drag-and-drop (no app desktop/web). No aplicativo móvel, basta ir na seção "Formulário" ou "Documentos" e selecionar mais de um item por vez.',
        icon: 'cloud-upload-outline',
    },
    {
        id: '4',
        question: 'Existe um limite de armazenamento?',
        answer:
            'O limite varia conforme o plano contratado pela sua instituição. Você pode verificar seu uso de espaço atual acessando as configurações da sua conta ou o perfil.',
        icon: 'server-outline',
    },
    {
        id: '5',
        question: 'Como funciona o suporte técnico?',
        answer:
            'Nosso suporte está disponível 24/7 via chat no aplicativo e e-mail. Para contas empresariais, também disponibilizamos atendimento prioritário por telefone.',
        icon: 'headset-outline',
    },
];

function FAQCard({
    item,
    isExpanded,
    onToggle,
    theme,
}: {
    item: FAQItem;
    isExpanded: boolean;
    onToggle: () => void;
    theme: any;
}) {
    const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: isExpanded ? 1 : 0,
            duration: 220,
            useNativeDriver: true,
        }).start();
    }, [isExpanded]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: isExpanded ? BRAND.primarySoft : theme.card,
                    borderColor: isExpanded ? BRAND.primary : theme.borderColor,
                    borderWidth: isExpanded ? 1.5 : 1,
                },
            ]}
        >
            <TouchableOpacity
                style={styles.cardHeader}
                onPress={onToggle}
                activeOpacity={0.7}
            >
                <View
                    style={[
                        styles.iconBadge,
                        { backgroundColor: isExpanded ? BRAND.primary : BRAND.primaryLight },
                    ]}
                >
                    <Ionicons
                        name={item.icon}
                        size={18}
                        color={isExpanded ? '#FFFFFF' : BRAND.primaryDark}
                    />
                </View>

                <View style={styles.questionColumn}>
                    {item.badge && (
                        <View style={styles.badgePill}>
                            <Text style={styles.badgeText}>{item.badge}</Text>
                        </View>
                    )}
                    <Text style={[styles.questionText, { color: theme.textPrimary }]}>
                        {item.question}
                    </Text>
                </View>

                <Animated.View style={{ transform: [{ rotate }] }}>
                    <Ionicons
                        name="chevron-down"
                        size={20}
                        color={isExpanded ? BRAND.primary : theme.textSecondary}
                    />
                </Animated.View>
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.cardBody}>
                    <View style={styles.divider} />
                    <Text style={[styles.answerText, { color: theme.textSecondary }]}>
                        {item.answer}
                    </Text>
                </View>
            )}
        </View>
    );
}

export default function PerguntasFrequentesScreen() {
    const { theme, isDarkMode } = useTheme();
    const navigation = useNavigation(); // Remova se a tela não estiver dentro de um Stack Navigator
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>('1');

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredFaq = FAQ_DATA.filter(
        (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            {/* Header fixo de navegação */}

            <HeaderScreen/>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Intro */}
                <View style={styles.headerContainer}>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        Encontre respostas rápidas sobre segurança, armazenamento e gerenciamento
                        de documentos.
                    </Text>
                </View>

                {/* Input de Pesquisa */}
                <View
                    style={[
                        styles.searchContainer,
                        {
                            backgroundColor: theme.card,
                            borderColor: searchQuery ? BRAND.primary : theme.borderColor,
                        },
                    ]}
                >
                    <Ionicons
                        name="search-outline"
                        size={20}
                        color={searchQuery ? BRAND.primary : theme.textSecondary}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={[styles.searchInput, { color: theme.textPrimary }]}
                        placeholder="Como podemos ajudar você hoje?"
                        placeholderTextColor={theme.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>

                {searchQuery.length > 0 && (
                    <Text style={[styles.resultsCount, { color: theme.textSecondary }]}>
                        {filteredFaq.length}{' '}
                        {filteredFaq.length === 1
                            ? 'resultado encontrado'
                            : 'resultados encontrados'}
                    </Text>
                )}

                {/* Lista de FAQ */}
                <View style={styles.listContainer}>
                    {filteredFaq.length > 0 ? (
                        filteredFaq.map((item) => (
                            <FAQCard
                                key={item.id}
                                item={item}
                                isExpanded={expandedId === item.id}
                                onToggle={() => toggleExpand(item.id)}
                                theme={theme}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyIconWrapper}>
                                <Ionicons
                                    name="file-tray-outline"
                                    size={32}
                                    color={BRAND.primary}
                                />
                            </View>
                            <Text style={[styles.emptyText, { color: theme.textPrimary }]}>
                                Nenhuma pergunta encontrada
                            </Text>
                            <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
                                Tente pesquisar com outras palavras-chave.
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
    },
    navBackButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navTitle: {
        flex: 1,
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
    },
    navIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: BRAND.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 52,
        marginBottom: 8,
        elevation: 2,
        shadowColor: BRAND.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
    },
    resultsCount: {
        fontSize: 12,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    listContainer: {
        gap: 12,
        marginTop: 8,
    },
    card: {
        borderRadius: 14,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    iconBadge: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionColumn: {
        flex: 1,
    },
    badgePill: {
        alignSelf: 'flex-start',
        backgroundColor: BRAND.primary,
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginBottom: 4,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    questionText: {
        fontSize: 15,
        fontWeight: '600',
    },
    cardBody: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: BRAND.primaryLight,
        marginBottom: 12,
    },
    answerText: {
        fontSize: 14,
        lineHeight: 22,
        paddingLeft: 48, // alinha com o texto da pergunta (ícone + gap)
    },
    emptyContainer: {
        padding: 30,
        alignItems: 'center',
    },
    emptyIconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: BRAND.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    emptyText: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    emptySubtext: {
        fontSize: 13,
        textAlign: 'center',
    },
});