import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar,  LayoutAnimation, Platform, UIManager, Animated, } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { HeaderScreen } from "../../components/Header";
import { FooterScreen } from "../../components/Footer";
import styles from '../../theme/PerguntasFrequentesCss';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BRAND = {
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    primaryLight: '#DBEAFE',
    primarySoft: '#EFF6FF',
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
    const navigation = useNavigation();
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

                {/* Card de suporte técnico */}
                <View style={styles.supportCard}>
                    <View style={styles.supportHeaderRow}>
                        <View style={styles.supportIconWrapper}>
                            <Ionicons name="chatbubbles-outline" size={18} color="#FFFFFF" />
                        </View>
                        <Text style={[styles.supportTitle, { color: theme.textPrimary }]}>
                            Precisa de mais ajuda?
                        </Text>
                    </View>

                    <Text style={[styles.supportText, { color: theme.textSecondary }]}>
                        Ainda não encontrou a resposta que procura? Entre em contato com nosso
                        suporte técnico e vamos te ajudar.
                    </Text>

                    <TouchableOpacity style={styles.supportButton} activeOpacity={0.85} onPress={() => navigation.navigate('Suporte' as never)}>
                        <Ionicons name="chatbubble-ellipses-outline" size={16} color="#FFFFFF" />
                        <Text style={styles.supportButtonText}>Suporte Técnico</Text>
                    </TouchableOpacity>
                </View>w
            </ScrollView>a
            <FooterScreen />
        </SafeAreaView>
    );
}