import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Modal,
    Pressable
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';
import {
    useNavigation,
    useFocusEffect
} from '@react-navigation/native';

import {
    NativeStackNavigationProp
} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../theme/HomeCss';
import { api } from '../../services/api';
import { RootStackParamList } from '../../../../App';

// ======================================================
// TIPOS
// ======================================================

interface DocumentoAPI {
    id: number;
    numero: string;
    orgaoEmissor: string;
    cidadeEmissao: string;
    dataEmissao: string;
    usuario?: string;
    tipo?: string;
}

interface DocumentoLocal {
    id: string;
    title: string;
    type: string;
    info: string;
    uri?: string;
}

interface AtividadeItem {
    id: string;
    title: string;
    subtitle: string;
    isLocal: boolean;
}

// ======================================================
// STORAGE
// ======================================================

const STORAGE_KEY = '@meus_documentos_v1';

// ======================================================
// NAVEGAÇÃO
// ======================================================

type NavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

// ======================================================
// TELA HOME
// ======================================================

export const TelaHomeScreen = () => {

    const navigation =
        useNavigation<NavigationProp>();

    const {
        theme,
        isDarkMode
    } = useTheme();


    // ==================================================
    // ESTADOS
    // ==================================================

    const [
        nomeUsuario,
        setNomeUsuario
    ] = useState('');

    const [
        documentosApi,
        setDocumentosApi
    ] = useState<DocumentoAPI[]>([]);

    const [
        documentosLocais,
        setDocumentosLocais
    ] = useState<DocumentoLocal[]>([]);

    const [
        carregando,
        setCarregando
    ] = useState(true);

    const [
        menuVisivel,
        setMenuVisivel
    ] = useState(false);


    // ==================================================
    // CARREGAR DADOS
    // ==================================================

    const carregarDados = useCallback(
        async () => {

            // ------------------------------------------
            // CARREGAR USUÁRIO
            // ------------------------------------------

            try {

                const usuarioSalvo =
                    await AsyncStorage.getItem('usuario');

                const usuario =
                    usuarioSalvo
                        ? JSON.parse(usuarioSalvo)
                        : null;

                setNomeUsuario(
                    usuario?.nome?.split(' ')[0]
                    || 'Usuário'
                );

            } catch (error) {

                console.error(
                    '❌ Erro ao carregar usuário:',
                    error
                );

                setNomeUsuario('Usuário');
            }


            setCarregando(true);


            // ------------------------------------------
            // CARREGAR DOCUMENTOS DA API
            // ------------------------------------------

            try {

                console.log(
                    '📄 Buscando documentos na API...'
                );

                const response =
                    await api.get<DocumentoAPI[]>(
                        '/Documento'
                    );

                console.log(
                    '✅ Documentos recebidos da API:',
                    response.data
                );

                setDocumentosApi(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );

            } catch (error: any) {

                console.error(
                    '❌ ERRO AO BUSCAR DOCUMENTOS DA API:',
                    error
                );

                if (error?.response) {

                    console.error(
                        '📡 Status da API:',
                        error.response.status
                    );

                    console.error(
                        '📡 Resposta da API:',
                        error.response.data
                    );

                } else {

                    console.error(
                        '📡 Sem resposta da API:',
                        error?.message
                    );
                }

                // Não quebra a Home caso a API falhe.
                setDocumentosApi([]);

            }


            // ------------------------------------------
            // CARREGAR DOCUMENTOS LOCAIS
            // ------------------------------------------

            try {

                console.log(
                    '💾 Buscando documentos locais...'
                );

                const localSalvo =
                    await AsyncStorage.getItem(
                        STORAGE_KEY
                    );

                console.log(
                    '📦 Dados locais encontrados:',
                    localSalvo
                );


                if (!localSalvo) {

                    console.log(
                        'ℹ️ Nenhum documento local salvo.'
                    );

                    setDocumentosLocais([]);

                } else {

                    const dadosParseados =
                        JSON.parse(localSalvo);

                    if (
                        Array.isArray(dadosParseados)
                    ) {

                        setDocumentosLocais(
                            dadosParseados
                        );

                        console.log(
                            '✅ Documentos locais carregados:',
                            dadosParseados
                        );

                    } else {

                        console.warn(
                            '⚠️ Dados locais não são uma lista.'
                        );

                        setDocumentosLocais([]);
                    }
                }


            } catch (error) {

                console.error(
                    '❌ ERRO AO CARREGAR DOCUMENTOS LOCAIS:',
                    error
                );

                // Se o JSON salvo estiver corrompido,
                // a Home continua funcionando.

                setDocumentosLocais([]);
            }


            // ------------------------------------------
            // FINALIZAR CARREGAMENTO
            // ------------------------------------------

            setCarregando(false);

        },
        []
    );


    // ==================================================
    // ATUALIZAR HOME AO VOLTAR PARA ELA
    // ==================================================

    useFocusEffect(
        useCallback(
            () => {

                carregarDados();

            },
            [carregarDados]
        )
    );


    // ==================================================
    // NAVEGAÇÕES
    // ==================================================

    const irParaAdicionarDocumento = () => {

        setMenuVisivel(false);

        navigation.navigate(
            'AdicionarDocumento'
        );
    };


    const irParaFormulario = () => {

        setMenuVisivel(false);

        navigation.navigate(
            'Formulario'
        );
    };


    const irParaQR = () => {

        setMenuVisivel(false);

        navigation.navigate(
            'QRcode'
        );
    };


    const irParaChatbot = () => {

        setMenuVisivel(false);

        navigation.navigate(
            'Chatbot'
        );
    };


    const irParaDocumentos = () => {

        navigation.navigate(
            'Documentos'
        );
    };


    // ==================================================
    // EXCLUIR DOCUMENTO DA API
    // ==================================================

    function excluirDocumentoApi(
        documento: DocumentoAPI
    ) {

        Alert.alert(
            'Excluir documento',
            'Deseja realmente excluir este documento?',
            [

                {
                    text: 'Cancelar',
                    style: 'cancel'
                },

                {
                    text: 'Excluir',
                    style: 'destructive',

                    onPress: async () => {

                        try {

                            await api.delete(
                                `/ Documento / ${documento.id} `
                            );

                            setDocumentosApi(
                                (atual) =>
                                    atual.filter(
                                        (doc) =>
                                            doc.id !==
                                            documento.id
                                    )
                            );

                        } catch (error) {

                            console.error(
                                '❌ Erro ao excluir documento:',
                                error
                            );

                            Alert.alert(
                                'Erro',
                                'Não foi possível excluir o documento.'
                            );
                        }
                    }
                }

            ]
        );
    }


    // ==================================================
    // EXCLUIR DOCUMENTO LOCAL
    // ==================================================

    function excluirDocumentoLocal(
        documento: DocumentoLocal
    ) {

        Alert.alert(
            'Excluir documento',
            'Deseja realmente excluir este documento?',
            [

                {
                    text: 'Cancelar',
                    style: 'cancel'
                },

                {
                    text: 'Excluir',
                    style: 'destructive',

                    onPress: async () => {

                        try {

                            const novaLista =
                                documentosLocais.filter(
                                    (doc) =>
                                        doc.id !==
                                        documento.id
                                );

                            setDocumentosLocais(
                                novaLista
                            );

                            await AsyncStorage.setItem(
                                STORAGE_KEY,
                                JSON.stringify(
                                    novaLista
                                )
                            );

                        } catch (error) {

                            console.error(
                                '❌ Erro ao excluir documento local:',
                                error
                            );
                        }
                    }
                }

            ]
        );
    }


    // ==================================================
    // TOTAL DE DOCUMENTOS
    // ==================================================

    const totalDocumentos =
        documentosApi.length +
        documentosLocais.length;


    // ==================================================
    // ATIVIDADES RECENTES
    // ==================================================

    const atividadesRecentes:
        AtividadeItem[] = [

            ...documentosLocais.map(
                (documento) => ({

                    id:
                        `local - ${documento.id} `,

                    title:
                        documento.title,

                    subtitle:
                        'Anexado pela galeria',

                    isLocal:
                        true
                })
            ),

            ...documentosApi.map(
                (documento) => ({

                    id:
                        `api - ${documento.id} `,

                    title:
                        documento.tipo ||
                        'Documento',

                    subtitle:
                        `${documento.numero} • ${documento.orgaoEmissor} `,

                    isLocal:
                        false
                })
            )

        ].slice(0, 4);


    // ==================================================
    // EXCLUIR ATIVIDADE
    // ==================================================

    function excluirAtividade(
        item: AtividadeItem
    ) {

        if (item.isLocal) {

            const documento =
                documentosLocais.find(
                    (doc) =>
                        `local - ${doc.id} ` ===
                        item.id
                );

            if (documento) {

                excluirDocumentoLocal(
                    documento
                );
            }

            return;
        }


        const documento =
            documentosApi.find(
                (doc) =>
                    `api - ${doc.id} ` ===
                    item.id
            );

        if (documento) {

            excluirDocumentoApi(
                documento
            );
        }
    }


    // ==================================================
    // RENDER
    // ==================================================

    return (

        <View
            style={[
                styles.container,
                {
                    backgroundColor:
                        theme.background
                }
            ]}
        >

            <HeaderScreen />


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.content
                }
            >

                {/* ======================================
                SAUDAÇÃO
            ====================================== */}

                <View
                    style={
                        styles.welcomeContainer
                    }
                >

                    <Text
                        style={[
                            styles.welcomeText,
                            {
                                color:
                                    theme.textPrimary
                            }
                        ]}
                    >

                        Olá,{' '}

                        <Text
                            style={[
                                styles.welcomeName,
                                {
                                    color:
                                        theme.accentColor
                                }
                            ]}
                        >
                            {nomeUsuario}
                        </Text>

                    </Text>

                </View>


                {/* ======================================
                CARD DE DOCUMENTOS
            ====================================== */}

                <View
                    style={[
                        styles.infoCardFull,
                        {
                            backgroundColor:
                                theme.card,

                            borderColor:
                                theme.borderColor
                        }
                    ]}
                >

                    <View
                        style={[
                            styles.cardIconCircle,
                            {
                                backgroundColor:
                                    isDarkMode
                                        ? theme.borderColor
                                        : '#EEF4FF',

                                marginBottom: 0
                            }
                        ]}
                    >

                        <Feather
                            name="file-text"
                            size={20}
                            color={
                                theme.accentColor
                            }
                        />

                    </View>


                    <View
                        style={
                            styles.infoCardFullTextBox
                        }
                    >

                        <Text
                            style={[
                                styles.number,
                                {
                                    color:
                                        theme.textPrimary
                                }
                            ]}
                        >

                            {
                                carregando
                                    ? '-'
                                    : totalDocumentos
                            }

                        </Text>


                        <Text
                            style={[
                                styles.label,
                                {
                                    color:
                                        theme.textSecondary
                                }
                            ]}
                        >

                            documento
                            {
                                totalDocumentos !== 1
                                    ? 's'
                                    : ''
                            }

                            {' '}

                            cadastrado
                            {
                                totalDocumentos !== 1
                                    ? 's'
                                    : ''
                            }

                        </Text>

                    </View>

                </View>


                {/* ======================================
                LEMBRETE
            ====================================== */}

                {
                    !carregando &&
                    totalDocumentos === 0 && (

                        <View
                            style={[
                                styles.pendingBanner,
                                {
                                    backgroundColor:
                                        isDarkMode
                                            ? theme.card
                                            : '#FFF8E1',

                                    borderColor:
                                        isDarkMode
                                            ? theme.borderColor
                                            : '#FDE68A'
                                }
                            ]}
                        >

                            <View
                                style={
                                    styles.pendingBannerRow
                                }
                            >

                                <View
                                    style={[
                                        styles.pendingIconCircle,
                                        {
                                            backgroundColor:
                                                isDarkMode
                                                    ? theme.borderColor
                                                    : '#FEF3C7'
                                        }
                                    ]}
                                >

                                    <Feather
                                        name="alert-circle"
                                        size={20}
                                        color="#D97706"
                                    />

                                </View>


                                <View
                                    style={
                                        styles.pendingTextBox
                                    }
                                >

                                    <Text
                                        style={[
                                            styles.pendingTitle,
                                            {
                                                color:
                                                    theme.textPrimary
                                            }
                                        ]}
                                    >

                                        Comece cadastrando seu primeiro documento

                                    </Text>


                                    <Text
                                        style={[
                                            styles.pendingSubtitle,
                                            {
                                                color:
                                                    theme.textSecondary
                                            }
                                        ]}
                                    >

                                        Leva menos de um minuto.

                                    </Text>

                                </View>

                            </View>


                            <TouchableOpacity
                                style={[
                                    styles.pendingButton,
                                    {
                                        backgroundColor:
                                            theme.accentColor
                                    }
                                ]}
                                activeOpacity={0.85}
                                onPress={
                                    irParaAdicionarDocumento
                                }
                            >

                                <Text
                                    style={
                                        styles.pendingButtonText
                                    }
                                >

                                    Adicionar documento

                                </Text>

                            </TouchableOpacity>

                        </View>
                    )
                }


                {/* ======================================
                ARMAZENAMENTO
            ====================================== */}

                <View
                    style={
                        styles.storageCard
                    }
                >

                    <View
                        style={
                            styles.storageHeader
                        }
                    >

                        <View
                            style={
                                styles.storageTitleRow
                            }
                        >

                            <Feather
                                name="cloud"
                                size={18}
                                color="#FFF"
                                style={{
                                    marginRight: 8
                                }}
                            />

                            <Text
                                style={
                                    styles.storageTitle
                                }
                            >

                                Armazenamento

                            </Text>

                        </View>


                        <Text
                            style={
                                styles.percent
                            }
                        >

                            82%

                        </Text>

                    </View>


                    <View
                        style={
                            styles.progressBackground
                        }
                    >

                        <View
                            style={
                                styles.progressFill
                            }
                        />

                    </View>


                    <Text
                        style={
                            styles.storageText
                        }
                    >

                        4,1 GB de 5 GB utilizados

                    </Text>

                </View>


                {/* ======================================
                ATIVIDADE RECENTE
            ====================================== */}

                <View
                    style={
                        styles.sectionHeader
                    }
                >

                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color:
                                    theme.textPrimary
                            }
                        ]}
                    >

                        Atividade recente

                    </Text>


                    <TouchableOpacity
                        onPress={
                            irParaDocumentos
                        }
                    >

                        <Text
                            style={[
                                styles.seeAll,
                                {
                                    color:
                                        theme.accentColor
                                }
                            ]}
                        >

                            Ver tudo

                        </Text>

                    </TouchableOpacity>

                </View>


                {
                    carregando ? (

                        <View
                            style={
                                styles.emptyStateBox
                            }
                        >

                            <ActivityIndicator
                                size="small"
                                color={
                                    theme.accentColor
                                }
                            />

                        </View>

                    ) : atividadesRecentes.length === 0 ? (

                        <View
                            style={
                                styles.emptyStateBox
                            }
                        >

                            <Feather
                                name="inbox"
                                size={32}
                                color={
                                    theme.textSecondary
                                }
                            />


                            <Text
                                style={[
                                    styles.emptyStateText,
                                    {
                                        color:
                                            theme.textSecondary
                                    }
                                ]}
                            >

                                Seus documentos recentes vão aparecer aqui.

                            </Text>

                        </View>

                    ) : (

                        atividadesRecentes.map(
                            (item) => (

                                <TouchableOpacity
                                    key={
                                        item.id
                                    }
                                    style={[
                                        styles.activityCard,
                                        {
                                            backgroundColor:
                                                theme.card,

                                            borderColor:
                                                theme.borderColor
                                        }
                                    ]}
                                    activeOpacity={0.85}
                                    onPress={
                                        irParaDocumentos
                                    }
                                >

                                    <View
                                        style={[
                                            styles.activityIconContainer,
                                            {
                                                backgroundColor:
                                                    isDarkMode
                                                        ? theme.borderColor
                                                        : '#EEF4FF'
                                            }
                                        ]}
                                    >

                                        <Feather
                                            name={
                                                item.isLocal
                                                    ? 'image'
                                                    : 'file-text'
                                            }
                                            size={20}
                                            color={
                                                theme.accentColor
                                            }
                                        />

                                    </View>


                                    <View
                                        style={
                                            styles.activityBody
                                        }
                                    >

                                        <View
                                            style={
                                                styles.activityHeader
                                            }
                                        >

                                            <Text
                                                style={[
                                                    styles.activityTitle,
                                                    {
                                                        color:
                                                            theme.textPrimary
                                                    }
                                                ]}
                                                numberOfLines={1}
                                            >

                                                {item.title}

                                            </Text>


                                            <TouchableOpacity
                                                style={
                                                    styles.deleteActivityButton
                                                }
                                                onPress={() =>
                                                    excluirAtividade(
                                                        item
                                                    )
                                                }
                                            >

                                                <Ionicons
                                                    name="trash-outline"
                                                    size={18}
                                                    color="#DC2626"
                                                />

                                            </TouchableOpacity>

                                        </View>


                                        <Text
                                            style={[
                                                styles.activitySubtitle,
                                                {
                                                    color:
                                                        theme.textSecondary
                                                }
                                            ]}
                                            numberOfLines={1}
                                        >

                                            {item.subtitle}

                                        </Text>

                                    </View>

                                </TouchableOpacity>
                            )
                        )
                    )
                }

            </ScrollView>


            {/* ==========================================
            BOTÃO FLUTUANTE
        ========================================== */}

            <TouchableOpacity
                style={[
                    styles.fab,
                    {
                        backgroundColor:
                            theme.accentColor,

                        shadowColor:
                            theme.accentColor
                    }
                ]}
                activeOpacity={0.8}
                onPress={() =>
                    setMenuVisivel(
                        !menuVisivel
                    )
                }
            >

                <Text
                    style={
                        styles.fabText
                    }
                >

                    {
                        menuVisivel
                            ? '×'
                            : '+'
                    }

                </Text>

            </TouchableOpacity>


            <FooterScreen />


            {/* ==========================================
            MENU RÁPIDO
        ========================================== */}

            <Modal
                transparent={true}
                visible={menuVisivel}
                animationType="fade"
                onRequestClose={() =>
                    setMenuVisivel(false)
                }
            >

                <Pressable
                    style={
                        styles.modalOverlayTransparent
                    }
                    onPress={() =>
                        setMenuVisivel(false)
                    }
                >

                    <View
                        style={
                            styles.floatingMenu
                        }
                    >

                        {/* ==================================
                        FALAR COM O DOC
                    ================================== */}

                        <TouchableOpacity
                            style={
                                styles.speedDialRow
                            }
                            activeOpacity={0.7}
                            onPress={
                                irParaChatbot
                            }
                        >

                            <View
                                style={[
                                    styles.floatingLabelBlue,
                                    {
                                        backgroundColor:
                                            theme.accentColor,

                                        shadowColor:
                                            theme.accentColor
                                    }
                                ]}
                            >

                                <Text
                                    style={
                                        styles.floatingLabelTextWhite
                                    }
                                >

                                    Falar com o Doc

                                </Text>

                            </View>


                            <View
                                style={[
                                    styles.miniFabBlue,
                                    {
                                        backgroundColor:
                                            theme.accentColor,

                                        shadowColor:
                                            theme.accentColor
                                    }
                                ]}
                            >

                                <Ionicons
                                    name="chatbubble-ellipses-outline"
                                    size={18}
                                    color="#FFF"
                                />

                            </View>

                        </TouchableOpacity>


                        {/* ==================================
                        ADICIONAR DOCUMENTO
                    ================================== */}

                        <TouchableOpacity
                            style={
                                styles.speedDialRow
                            }
                            activeOpacity={0.7}
                            onPress={
                                irParaAdicionarDocumento
                            }
                        >

                            <View
                                style={[
                                    styles.floatingLabelBlue,
                                    {
                                        backgroundColor:
                                            theme.accentColor,

                                        shadowColor:
                                            theme.accentColor
                                    }
                                ]}
                            >

                                <Text
                                    style={
                                        styles.floatingLabelTextWhite
                                    }
                                >

                                    Adicionar Documento

                                </Text>

                            </View>


                            <View
                                style={[
                                    styles.miniFabBlue,
                                    {
                                        backgroundColor:
                                            theme.accentColor,

                                        shadowColor:
                                            theme.accentColor
                                    }
                                ]}
                            >

                                <Ionicons
                                    name="add"
                                    size={20}
                                    color="#FFF"
                                />

                            </View>

                        </TouchableOpacity>


                        {/* ==================================
                        QR CODE
                    ================================== */}

                        <TouchableOpacity
                            style={
                                styles.speedDialRow
                            }
                            activeOpacity={0.7}
                            onPress={
                                irParaQR
                            }
                        >

                            <View
                                style={[
                                    styles.floatingLabelBlue,
                                    {
                                        backgroundColor:
                                            theme.accentColor,

                                        shadowColor:
                                            theme.accentColor
                                    }
                                ]}
                            >

                                <Text
                                    style={
                                        styles.floatingLabelTextWhite
                                    }
                                >

                                    Ler QR Code

                                </Text>

                            </View>


                            <View
                                style={[
                                    styles.miniFabBlue,
                                    {
                                        backgroundColor:
                                            theme.accentColor,

                                        shadowColor:
                                            theme.accentColor
                                    }
                                ]}
                            >

                                <Ionicons
                                    name="qr-code-outline"
                                    size={18}
                                    color="#FFF"
                                />

                            </View>

                        </TouchableOpacity>


                        {/* ==================================
                        FORMULÁRIO
                    ================================== */}

                        <TouchableOpacity
                            style={
                                styles.speedDialRow
                            }
                            activeOpacity={0.7}
                            onPress={
                                irParaFormulario
                            }
                        >

                            <View
                                style={[
                                    styles.floatingLabelBlue,
                                    {
                                        backgroundColor:
                                            theme.accentColor,

                                        shadowColor:
                                            theme.accentColor
                                    }
                                ]}
                            >

                                <Text
                                    style={
                                        styles.floatingLabelTextWhite
                                    }
                                >

                                    Formulário

                                </Text>

                            </View>


                            <View
                                style={[
                                    styles.miniFabBlue,
                                    {
                                        backgroundColor:
                                            theme.accentColor,

                                        shadowColor:
                                            theme.accentColor
                                    }
                                ]}
                            >

                                <Feather
                                    name="clipboard"
                                    size={18}
                                    color="#FFF"
                                />

                            </View>

                        </TouchableOpacity>

                    </View>

                </Pressable>

            </Modal>

        </View>
    );

};

export default TelaHomeScreen;
