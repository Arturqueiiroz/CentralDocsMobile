import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Linking,
    Alert,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { HeaderScreen } from "../../components/Header";
import { FooterScreen } from "../../components/Footer";
import styles from "../../theme/SuporteCss";

const BRAND = {
    primary: "#2563EB",
    primaryDark: "#1D4ED8",
    primaryLight: "#DBEAFE",
    primarySoft: "#EFF6FF",
};

interface ContactChannel {
    id: string;
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
}

export default function SuporteTecnicoScreen() {
    const { theme, isDarkMode } = useTheme();
    const navigation = useNavigation();

    const [nome, setNome] = useState("");
    const [assunto, setAssunto] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [enviando, setEnviando] = useState(false);

    const canais: ContactChannel[] = [
        {
            id: "chat",
            title: "Chat ao vivo",
            subtitle: "Resposta em poucos minutos",
            icon: "chatbubbles-outline",
            onPress: () => {
                Alert.alert(
                    "Chat",
                    "Abrir o chat de suporte aqui."
                );
            },
        },
        {
            id: "email",
            title: "E-mail",
            subtitle: "suporte@centraldocs.com.br",
            icon: "mail-outline",
            onPress: () =>
                Linking.openURL(
                    "mailto:suporte@centraldocs.com.br"
                ),
        },
        {
            id: "telefone",
            title: "Telefone",
            subtitle: "(11) 4000-0000",
            icon: "call-outline",
            onPress: () =>
                Linking.openURL("tel:+551140000000"),
        },
        {
            id: "whatsapp",
            title: "WhatsApp",
            subtitle: "Atendimento rápido pelo app",
            icon: "logo-whatsapp",
            onPress: () =>
                Linking.openURL(
                    "https://wa.me/5511900000000"
                ),
        },
    ];

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.background },
            ]}
        >
            <StatusBar
                barStyle={
                    isDarkMode
                        ? "light-content"
                        : "dark-content"
                }
            />

            <HeaderScreen />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* INTRO */}
                <View style={styles.headerContainer}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: theme.textSecondary },
                        ]}
                    >
                        Escolha o canal que preferir ou nos envie uma
                        mensagem. Estamos aqui para ajudar.
                    </Text>
                </View>

                {/* STATUS */}
                <View
                    style={[
                        styles.statusBanner,
                        {
                            backgroundColor: isDarkMode
                                ? theme.card
                                : BRAND.primarySoft,

                            borderColor: isDarkMode
                                ? theme.borderColor
                                : BRAND.primaryLight,
                        },
                    ]}
                >
                    <View style={styles.statusDot} />

                    <Text
                        style={[
                            styles.statusText,
                            { color: theme.textPrimary },
                        ]}
                    >
                        Suporte online agora · tempo médio de resposta: 5 min
                    </Text>
                </View>

                {/* CANAIS */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: theme.textSecondary },
                    ]}
                >
                    Fale conosco
                </Text>

                <View style={styles.channelList}>
                    {canais.map((canal) => (
                        <TouchableOpacity
                            key={canal.id}
                            style={[
                                styles.channelCard,
                                {
                                    backgroundColor: theme.card,
                                    borderColor: theme.borderColor,
                                },
                            ]}
                            activeOpacity={0.7}
                            onPress={canal.onPress}
                        >
                            <View
                                style={[
                                    styles.channelIconWrapper,
                                    {
                                        backgroundColor: isDarkMode
                                            ? theme.borderColor
                                            : BRAND.primaryLight,
                                    },
                                ]}
                            >
                                <Ionicons
                                    name={canal.icon}
                                    size={20}
                                    color={BRAND.primary}
                                />
                            </View>

                            <View style={styles.channelTextColumn}>
                                <Text
                                    style={[
                                        styles.channelTitle,
                                        {
                                            color: theme.textPrimary,
                                        },
                                    ]}
                                >
                                    {canal.title}
                                </Text>

                                <Text
                                    style={[
                                        styles.channelSubtitle,
                                        {
                                            color: theme.textSecondary,
                                        },
                                    ]}
                                >
                                    {canal.subtitle}
                                </Text>
                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color={theme.textSecondary}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* VOLTAR PARA FAQ */}
                <TouchableOpacity
                    style={styles.faqLinkRow}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="help-circle-outline"
                        size={16}
                        color={BRAND.primary}
                    />

                    <Text style={styles.faqLinkText}>
                        Ver perguntas frequentes
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <FooterScreen />
        </SafeAreaView>
    );
}