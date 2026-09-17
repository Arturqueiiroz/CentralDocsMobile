import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    Modal,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HeaderScreen } from "../../components/Header";
import { FooterScreen } from "../../components/Footer";
import { useTheme } from "../../context/ThemeContext";
import styles from "../../theme/DocumentosCss";
import { api } from "../../services/api";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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

interface DocumentItem {
    id: string;
    title: string;
    type: string;
    info: string;
    iconType: "RG" | "CNH" | "RA" | "e-titulo" | "DOC";
    uri?: string;
    // campos "crus", usados no modal de detalhes (só existem pra documentos vindos da API)
    numero?: string;
    orgaoEmissor?: string;
    cidadeEmissao?: string;
    dataEmissao?: string;
}

const STORAGE_KEY = "@meus_documentos_v1";

function formatarData(dataIso?: string) {
    if (!dataIso) {
        return "-";
    }

    const data = new Date(dataIso);

    if (isNaN(data.getTime())) {
        return "-";
    }

    return data.toLocaleDateString("pt-BR");
}

export default function DocumentosScreen() {
    const { theme, isDarkMode } = useTheme();
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<NavigationProp>();

    const [documentos, setDocumentos] = useState<DocumentItem[]>([]);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [categoriaAtiva, setCategoriaAtiva] = useState("Tudo");

    const [modalVisivel, setModalVisivel] = useState(false);
    const [documentoSelecionado, setDocumentoSelecionado] = useState<DocumentItem | null>(null);

    /**
     * Converte o documento da API
     * para o formato utilizado pela interface.
     */
    function converterDocumento(documento: DocumentoAPI): DocumentItem {
        const tipo = documento.tipo || "Documento";

        let iconType: DocumentItem["iconType"] = "DOC";

        const tipoNormalizado = tipo.toLowerCase();

        if (
            tipoNormalizado.includes("rg") ||
            tipoNormalizado.includes("registro geral")
        ) {
            iconType = "RG";
        } else if (
            tipoNormalizado.includes("cnh") ||
            tipoNormalizado.includes("habilitação") ||
            tipoNormalizado.includes("habilitacao")
        ) {
            iconType = "CNH";
        } else if (
            tipoNormalizado.includes("reservista")
        ) {
            iconType = "RA";
        } else if (
            tipoNormalizado.includes("eleitoral") ||
            tipoNormalizado.includes("título de eleitor") ||
            tipoNormalizado.includes("titulo de eleitor")
        ) {
            iconType = "e-titulo";
        }

        return {
            id: documento.id.toString(),
            title: tipo,
            // O "type" também vira a categoria usada no filtro e no badge do card.
            type: tipo,
            info: `${documento.numero} • ${documento.orgaoEmissor}`,
            iconType,
            numero: documento.numero,
            orgaoEmissor: documento.orgaoEmissor,
            cidadeEmissao: documento.cidadeEmissao,
            dataEmissao: documento.dataEmissao,
        };
    }

    /**
     * Busca os documentos na API.
     */
    /**
     * Busca os documentos: da API e também os anexados
     * localmente pela galeria (que não somem mais ao navegar).
     */
    async function carregarDocumentos() {
        try {
            setCarregando(true);

            const response = await api.get<DocumentoAPI[]>("/Documento");
            const documentosConvertidos = response.data.map(converterDocumento);

            const localSalvo = await AsyncStorage.getItem(STORAGE_KEY);
            const documentosLocais: DocumentItem[] = localSalvo ? JSON.parse(localSalvo) : [];

            setDocumentos([...documentosLocais, ...documentosConvertidos]);
        } catch (error: any) {
            console.error("Erro ao carregar documentos:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Resposta:", error.response.data);
            }

            Alert.alert(
                "Erro",
                "Não foi possível carregar seus documentos."
            );
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarDocumentos();
    }, []);

    /**
     * Categorias disponíveis pro filtro, montadas a partir
     * dos documentos que realmente existem (não é uma lista fixa).
     */
    const categorias = [
        "Tudo",
        ...Array.from(new Set(documentos.map((documento) => documento.type))),
    ];

    /**
     * Pesquisa e filtra os documentos.
     */
    const documentosFiltrados = documentos.filter((documento) => {
        const texto = busca.toLowerCase().trim();

        const bateBusca =
            !texto ||
            documento.title.toLowerCase().includes(texto) ||
            documento.info.toLowerCase().includes(texto);

        const bateCategoria =
            categoriaAtiva === "Tudo" || documento.type === categoriaAtiva;

        return bateBusca && bateCategoria;
    });

    /**
     * Seleciona uma imagem da galeria e anexa como documento local.
     *
     * Continua sendo apenas local (a equipe optou por manter as duas
     * formas de adicionar: galeria E o formulário do AdicionarDocumento).
     */
    const adicionarDocumentoGaleria = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permissão necessária",
                "Precisamos de acesso à sua galeria para adicionar documentos."
            );
            return;
        }

        const resultado =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
            });

        if (
            !resultado.canceled &&
            resultado.assets &&
            resultado.assets.length > 0
        ) {
            const uriImagem = resultado.assets[0].uri;

            const novoDocumento: DocumentItem = {
                id: Date.now().toString(),
                title: "Novo Documento Anexado",
                type: "Anexo",
                info: "Adicionado hoje",
                iconType: "DOC",
                uri: uriImagem,
            };

            const listaAtualizada = [
                novoDocumento,
                ...documentos,
            ];

            setDocumentos(listaAtualizada);

            try {
                await AsyncStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(listaAtualizada)
                );
            } catch (error) {
                console.error(
                    "Erro ao salvar documento local:",
                    error
                );
            }
        }
    };

    /**
     * Abre o modal com os detalhes do documento.
     */
    function abrirDetalhes(documento: DocumentItem) {
        setDocumentoSelecionado(documento);
        setModalVisivel(true);
    }

    function fecharDetalhes() {
        setModalVisivel(false);
        setDocumentoSelecionado(null);
    }

    /**
     * Exclui documento.
     *
     * Documentos que vieram da API (sem "uri") são excluídos de
     * verdade via DELETE (que agora, no back-end, faz soft delete —
     * o registro continua no banco, só marcado como inativo). Os
     * adicionados localmente pela galeria continuam sendo removidos
     * só do estado local.
     */
    const excluirDocumento = (documento: DocumentItem) => {
        Alert.alert(
            "Excluir documento",
            "Deseja realmente excluir este documento?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        const ehDocumentoLocal = !!documento.uri;

                        if (ehDocumentoLocal) {
                            try {
                                const novaLista = documentos.filter(
                                    (doc) => doc.id !== documento.id
                                );

                                setDocumentos(novaLista);

                                await AsyncStorage.setItem(
                                    STORAGE_KEY,
                                    JSON.stringify(novaLista)
                                );
                            } catch (error) {
                                console.error(
                                    "Erro ao remover documento local:",
                                    error
                                );
                            }
                            return;
                        }

                        try {
                            await api.delete(`/Documento/${documento.id}`);

                            setDocumentos((atual) =>
                                atual.filter((doc) => doc.id !== documento.id)
                            );
                        } catch (error: any) {
                            console.error(
                                "Erro ao excluir documento:",
                                error
                            );

                            const mensagem =
                                error.response?.data?.mensagem ||
                                "Não foi possível excluir o documento.";

                            Alert.alert("Erro", mensagem);
                        }
                    },
                },
            ]
        );
    };

    /**
     * Escolhe o ícone de acordo com o tipo do documento.
     */
    function renderIcone(documento: DocumentItem, size: number = 25) {
        switch (documento.iconType) {
            case "RG":
                return (
                    <Ionicons
                        name="card-outline"
                        size={size}
                        color={theme.accentColor}
                    />
                );

            case "CNH":
                return (
                    <Ionicons
                        name="car-outline"
                        size={size}
                        color={theme.accentColor}
                    />
                );

            case "RA":
                return (
                    <Ionicons
                        name="shield-outline"
                        size={size}
                        color={theme.accentColor}
                    />
                );

            case "e-titulo":
                return (
                    <Ionicons
                        name="document-text-outline"
                        size={size}
                        color={theme.accentColor}
                    />
                );

            default:
                return (
                    <Ionicons
                        name="document-outline"
                        size={size}
                        color={theme.accentColor}
                    />
                );
        }
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.background,
                },
            ]}
        >
            <HeaderScreen />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* HERO */}
                <View
                    style={[
                        styles.heroCard,
                        {
                            backgroundColor: theme.card,
                            borderColor: theme.borderColor,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.heroEyebrow,
                            {
                                color: theme.accentColor,
                            },
                        ]}
                    >
                        CentralDocs
                    </Text>

                    <Text
                        style={[
                            styles.heroTitle,
                            {
                                color: theme.textPrimary,
                            },
                        ]}
                    >
                        Seus documentos em um só lugar
                    </Text>

                    {/* PESQUISA */}
                    <View
                        style={[
                            styles.searchSection,
                            {
                                backgroundColor: theme.background,
                                borderColor: theme.borderColor,
                            },
                        ]}
                    >
                        <View
                            style={[
                                styles.searchIconWrapper,
                                {
                                    backgroundColor: isDarkMode
                                        ? theme.borderColor
                                        : "#EEF4FF",
                                },
                            ]}
                        >
                            <Ionicons
                                name="search-outline"
                                size={18}
                                color={theme.accentColor}
                            />
                        </View>

                        <TextInput
                            style={[
                                styles.input,
                                {
                                    color: theme.textPrimary,
                                },
                            ]}
                            placeholder="Pesquisar documentos..."
                            placeholderTextColor={
                                theme.textSecondary
                            }
                            value={busca}
                            onChangeText={setBusca}
                        />
                    </View>

                    {/* ADICIONAR — duas opções: formulário e galeria */}
                    <View style={styles.addButtonsRow}>
                        <TouchableOpacity
                            style={[styles.addButton, { backgroundColor: theme.accentColor, flex: 1 }]}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('AdicionarDocumento')}
                        >
                            <View style={styles.addButtonContent}>
                                <View style={styles.addButtonIconWrapper}>
                                    <Ionicons
                                        name="add"
                                        size={18}
                                        color="#FFFFFF"
                                    />
                                </View>

                                <Text style={styles.addButtonText}>
                                    Cadastrar
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.addButtonSecondary,
                                {
                                    borderColor: theme.accentColor,
                                    backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF',
                                },
                            ]}
                            activeOpacity={0.8}
                            onPress={adicionarDocumentoGaleria}
                        >
                            <View style={styles.addButtonSecondaryContent}>
                                <View style={styles.addButtonSecondaryIconWrapper}>
                                    <Ionicons
                                        name="image-outline"
                                        size={18}
                                        color={theme.accentColor}
                                    />
                                </View>

                                <Text style={[styles.addButtonSecondaryText, { color: theme.accentColor }]}>
                                    Da galeria
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* FILTROS */}
                <View style={styles.filterHeader}>
                    <Text
                        style={[
                            styles.filterTitle,
                            {
                                color: theme.textPrimary,
                            },
                        ]}
                    >
                        Filtrar documentos
                    </Text>

                    <Text
                        style={[
                            styles.filterSubtitle,
                            {
                                color: theme.textSecondary,
                            },
                        ]}
                    >
                        Encontre rapidamente o que precisa
                    </Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.chipsContainer}
                >
                    {categorias.map((categoria) => {
                        const selecionada = categoria === categoriaAtiva;

                        return (
                            <TouchableOpacity
                                key={categoria}
                                style={[
                                    styles.chip,
                                    {
                                        backgroundColor: selecionada
                                            ? theme.accentColor
                                            : isDarkMode
                                                ? 'rgba(255,255,255,0.05)'
                                                : '#F1F5F9',
                                        borderColor: selecionada ? theme.accentColor : theme.borderColor,
                                    },
                                ]}
                                onPress={() => setCategoriaAtiva(categoria)}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        {
                                            color: selecionada ? "#FFFFFF" : theme.textSecondary,
                                            fontWeight: selecionada ? "700" : "600",
                                        },
                                    ]}
                                >
                                    {categoria}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* ARQUIVOS RECENTES */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    color: theme.textPrimary,
                                },
                            ]}
                        >
                            Arquivos recentes
                        </Text>

                        <Text
                            style={[
                                styles.sectionSubtitle,
                                {
                                    color: theme.textSecondary,
                                },
                            ]}
                        >
                            {documentosFiltrados.length} documento
                            {documentosFiltrados.length !== 1
                                ? "s"
                                : ""}
                        </Text>
                    </View>
                </View>

                {/* LOADING */}
                {carregando ? (
                    <View
                        style={{
                            paddingVertical: 40,
                            alignItems: "center",
                        }}
                    >
                        <ActivityIndicator
                            size="large"
                            color={theme.accentColor}
                        />

                        <Text
                            style={{
                                marginTop: 12,
                                color: theme.textSecondary,
                            }}
                        >
                            Carregando documentos...
                        </Text>
                    </View>
                ) : documentosFiltrados.length === 0 ? (
                    /* SEM DOCUMENTOS */
                    <View
                        style={{
                            alignItems: "center",
                            paddingVertical: 40,
                        }}
                    >
                        <Ionicons
                            name="document-outline"
                            size={48}
                            color={theme.textSecondary}
                        />

                        <Text
                            style={{
                                marginTop: 12,
                                fontSize: 16,
                                fontWeight: "700",
                                color: theme.textPrimary,
                            }}
                        >
                            Nenhum documento encontrado
                        </Text>

                        <Text
                            style={{
                                marginTop: 6,
                                textAlign: "center",
                                color: theme.textSecondary,
                            }}
                        >
                            {categoriaAtiva === "Tudo"
                                ? "Seus documentos aparecerão aqui."
                                : "Nenhum documento nessa categoria ainda."}
                        </Text>
                    </View>
                ) : (
                    /* LISTA */
                    documentosFiltrados.map((documento) => (
                        <TouchableOpacity
                            key={documento.id}
                            activeOpacity={0.85}
                            onPress={() => abrirDetalhes(documento)}
                            style={[
                                styles.docCard,
                                {
                                    backgroundColor:
                                        theme.card,
                                    borderColor:
                                        theme.borderColor,
                                },
                            ]}
                        >
                            {/* ÍCONE */}
                            <View
                                style={[
                                    styles.iconContainer,
                                    {
                                        backgroundColor:
                                            isDarkMode
                                                ? theme.borderColor
                                                : "#EEF4FF",
                                    },
                                ]}
                            >
                                {renderIcone(documento)}
                            </View>

                            {/* INFORMAÇÕES */}
                            <View style={styles.docInfo}>
                                <View
                                    style={
                                        styles.docTopRow
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.docTitle,
                                            {
                                                color: theme.textPrimary,
                                            },
                                        ]}
                                        numberOfLines={2}
                                    >
                                        {documento.title}
                                    </Text>

                                    <TouchableOpacity
                                        style={[
                                            styles.deleteButton,
                                            {
                                                borderColor: isDarkMode ? 'rgba(248,113,113,0.4)' : '#FCA5A5',
                                                backgroundColor: isDarkMode ? 'rgba(248,113,113,0.1)' : '#FEF2F2',
                                            },
                                        ]}
                                        onPress={() =>
                                            excluirDocumento(
                                                documento
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name="trash-outline"
                                            size={16}
                                            color="#DC2626"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={
                                        styles.docBottomRow
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.docMeta,
                                            {
                                                color: theme.textSecondary,
                                            },
                                        ]}
                                        numberOfLines={2}
                                    >
                                        {documento.info}
                                    </Text>

                                    <View
                                        style={[
                                            styles.badge,
                                            {
                                                backgroundColor:
                                                    isDarkMode
                                                        ? theme.borderColor
                                                        : "#EFF6FF",
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.badgeText,
                                                {
                                                    color: theme.accentColor,
                                                },
                                            ]}
                                        >
                                            {documento.type.toUpperCase()}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}

                {/* BANNER */}
                <View
                    style={[
                        styles.upgradeBanner,
                        {
                            backgroundColor:
                                theme.accentColor,
                        },
                    ]}
                >
                    <View style={styles.bannerPill}>
                        <Text style={styles.bannerPillText}>
                            CENTRALDOCS PRO
                        </Text>
                    </View>

                    <Text style={styles.bannerTitle}>
                        Tenha mais espaço para seus documentos
                    </Text>

                    <Text style={styles.bannerSubtitle}>
                        Organize seus arquivos com ainda mais
                        espaço e praticidade.
                    </Text>

                    <TouchableOpacity
                        style={styles.upgradeButton}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={[
                                styles.upgradeButtonText,
                                {
                                    color: theme.accentColor,
                                },
                            ]}
                        >
                            Conhecer plano
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <FooterScreen />

            {/* MODAL DE DETALHES DO DOCUMENTO */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisivel}
                onRequestClose={fecharDetalhes}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
                        <View style={styles.modalHeaderRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                                    {documentoSelecionado?.title}
                                </Text>
                                <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                                    Detalhes do documento
                                </Text>
                            </View>

                            <TouchableOpacity onPress={fecharDetalhes}>
                                <Ionicons name="close" size={24} color={theme.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {documentoSelecionado?.uri ? (
                                <Image
                                    source={{ uri: documentoSelecionado.uri }}
                                    style={styles.previewImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View
                                    style={[
                                        styles.modalIconBadge,
                                        { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' },
                                    ]}
                                >
                                    {documentoSelecionado && renderIcone(documentoSelecionado, 28)}
                                </View>
                            )}

                            {documentoSelecionado?.numero && (
                                <View style={[styles.modalRow, { borderBottomColor: theme.borderColor }]}>
                                    <Text style={[styles.modalLabel, { color: theme.textSecondary }]}>Número</Text>
                                    <Text style={[styles.modalValue, { color: theme.textPrimary }]}>
                                        {documentoSelecionado.numero}
                                    </Text>
                                </View>
                            )}

                            {documentoSelecionado?.orgaoEmissor && (
                                <View style={[styles.modalRow, { borderBottomColor: theme.borderColor }]}>
                                    <Text style={[styles.modalLabel, { color: theme.textSecondary }]}>Órgão emissor</Text>
                                    <Text style={[styles.modalValue, { color: theme.textPrimary }]}>
                                        {documentoSelecionado.orgaoEmissor}
                                    </Text>
                                </View>
                            )}

                            {documentoSelecionado?.cidadeEmissao && (
                                <View style={[styles.modalRow, { borderBottomColor: theme.borderColor }]}>
                                    <Text style={[styles.modalLabel, { color: theme.textSecondary }]}>Cidade de emissão</Text>
                                    <Text style={[styles.modalValue, { color: theme.textPrimary }]}>
                                        {documentoSelecionado.cidadeEmissao}
                                    </Text>
                                </View>
                            )}

                            {documentoSelecionado?.dataEmissao && (
                                <View style={[styles.modalRow, { borderBottomColor: theme.borderColor }]}>
                                    <Text style={[styles.modalLabel, { color: theme.textSecondary }]}>Data de emissão</Text>
                                    <Text style={[styles.modalValue, { color: theme.textPrimary }]}>
                                        {formatarData(documentoSelecionado.dataEmissao)}
                                    </Text>
                                </View>
                            )}

                            {!documentoSelecionado?.numero && (
                                <View style={[styles.modalRow, { borderBottomColor: theme.borderColor }]}>
                                    <Text style={[styles.modalLabel, { color: theme.textSecondary }]}>Origem</Text>
                                    <Text style={[styles.modalValue, { color: theme.textPrimary }]}>
                                        Anexado pela galeria
                                    </Text>
                                </View>
                            )}
                        </ScrollView>

                        <TouchableOpacity
                            style={[styles.modalCloseButton, { backgroundColor: theme.accentColor }]}
                            onPress={fecharDetalhes}
                        >
                            <Text style={styles.modalCloseButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}