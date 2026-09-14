import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from '../../components/Footer';
import { CustomInput } from '../../components/CustomTextInput';
import { useTheme } from '../../context/ThemeContext';
import { RootStackParamList } from '../../../../App';
import { api } from '../../services/api';
import styles from '../../theme/AdicionarDocumentoCss';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface TipoDocumentoAPI {
    id: number;
    nome: string;
}

type FormularioDocumento = {
    numero: string;
    orgaoEmissor: string;
    cidadeEmissao: string;
    dataEmissao: string;
};

const formularioVazio: FormularioDocumento = {
    numero: '',
    orgaoEmissor: '',
    cidadeEmissao: '',
    dataEmissao: '',
};

export default function AdicionarDocumentoScreen() {
    const { theme, isDarkMode } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const [tipos, setTipos] = useState<TipoDocumentoAPI[]>([]);
    const [carregandoTipos, setCarregandoTipos] = useState(true);
    const [tipoSelecionadoId, setTipoSelecionadoId] = useState<number | null>(null);

    const [form, setForm] = useState<FormularioDocumento>(formularioVazio);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        async function carregarTipos() {
            try {
                setCarregandoTipos(true);
                const response = await api.get<TipoDocumentoAPI[]>('/TipoDocumento');
                setTipos(response.data);
            } catch (error) {
                console.error('Erro ao carregar tipos de documento:', error);
                Alert.alert('Erro', 'Não foi possível carregar os tipos de documento.');
            } finally {
                setCarregandoTipos(false);
            }
        }

        carregarTipos();
    }, []);

    function atualizarCampo(campo: string, valor: string) {
        setForm((atual) => ({ ...atual, [campo]: valor }));
    }

    function validarDataEmissao(valor: string): Date | null {
        const formatoValido = /^\d{4}-\d{2}-\d{2}$/.test(valor.trim());

        if (!formatoValido) {
            return null;
        }

        const data = new Date(`${valor.trim()}T00:00:00`);

        if (isNaN(data.getTime())) {
            return null;
        }

        return data;
    }

    async function salvarDocumento() {
        if (!tipoSelecionadoId) {
            Alert.alert('Faltou algo', 'Selecione o tipo do documento.');
            return;
        }
        if (!form.numero.trim()) {
            Alert.alert('Faltou algo', 'Informe o número do documento.');
            return;
        }
        if (!form.orgaoEmissor.trim()) {
            Alert.alert('Faltou algo', 'Informe o órgão emissor.');
            return;
        }

        const dataEmissao = validarDataEmissao(form.dataEmissao);

        if (!dataEmissao) {
            Alert.alert('Data inválida', 'Informe a data de emissão no formato AAAA-MM-DD.');
            return;
        }

        try {
            setSalvando(true);

            await api.post('/Documento', {
                numero: form.numero.trim(),
                orgaoEmissor: form.orgaoEmissor.trim(),
                cidadeEmissao: form.cidadeEmissao.trim(),
                dataEmissao: dataEmissao.toISOString(),
                tipoDocumentoId: tipoSelecionadoId,
            });

            Alert.alert('Documento adicionado', 'Seu documento foi cadastrado com sucesso.', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Documentos'),
                },
            ]);
        } catch (error: any) {
            console.error('Erro ao criar documento:', error);

            const mensagem =
                error.response?.data?.mensagem ||
                error.response?.data ||
                'Não foi possível cadastrar o documento.';

            Alert.alert('Erro', typeof mensagem === 'string' ? mensagem : 'Não foi possível cadastrar o documento.');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <HeaderScreen />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
                    Adicionar documento
                </Text>
                <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
                    Preencha os dados abaixo para cadastrar um novo documento.
                </Text>

                <Text style={[styles.sectionLabel, { color: theme.textPrimary }]}>
                    Tipo de documento
                </Text>

                {carregandoTipos ? (
                    <ActivityIndicator size="small" color={theme.accentColor} />
                ) : tipos.length === 0 ? (
                    <View style={styles.emptyTiposBox}>
                        <Ionicons name="alert-circle-outline" size={28} color={theme.textSecondary} />
                        <Text style={[styles.emptyTiposText, { color: theme.textSecondary }]}>
                            Nenhum tipo de documento disponível no momento.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.chipsWrap}>
                        {tipos.map((tipo) => {
                            const selecionado = tipo.id === tipoSelecionadoId;

                            return (
                                <TouchableOpacity
                                    key={tipo.id}
                                    style={[
                                        styles.chip,
                                        {
                                            backgroundColor: selecionado
                                                ? theme.accentColor
                                                : isDarkMode
                                                    ? 'rgba(255,255,255,0.05)'
                                                    : '#F1F5F9',
                                            borderColor: selecionado ? theme.accentColor : theme.borderColor,
                                        },
                                    ]}
                                    activeOpacity={0.85}
                                    onPress={() => setTipoSelecionadoId(tipo.id)}
                                >
                                    <Text
                                        style={[
                                            styles.chipText,
                                            { color: selecionado ? '#FFFFFF' : theme.textPrimary },
                                        ]}
                                    >
                                        {tipo.nome}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}

                <CustomInput
                    label="Número do documento"
                    placeholder="Ex: 56489731047"
                    property="numero"
                    value={form.numero}
                    onChangeText={atualizarCampo}
                />

                <CustomInput
                    label="Órgão emissor"
                    placeholder="Ex: SSP"
                    property="orgaoEmissor"
                    value={form.orgaoEmissor}
                    onChangeText={atualizarCampo}
                />

                <CustomInput
                    label="Cidade de emissão"
                    placeholder="Ex: São Paulo"
                    property="cidadeEmissao"
                    value={form.cidadeEmissao}
                    onChangeText={atualizarCampo}
                />

                <CustomInput
                    label="Data de emissão"
                    placeholder="AAAA-MM-DD"
                    property="dataEmissao"
                    value={form.dataEmissao}
                    onChangeText={atualizarCampo}
                    keyboardType="numbers-and-punctuation"
                    maxLength={10}
                />

                <TouchableOpacity
                    style={[styles.submitButton, { backgroundColor: theme.accentColor }]}
                    activeOpacity={0.85}
                    onPress={salvarDocumento}
                    disabled={salvando}
                >
                    <Text style={styles.submitButtonText}>
                        {salvando ? 'Salvando...' : 'Salvar documento'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.cancelButton, { borderColor: theme.borderColor }]}
                    activeOpacity={0.85}
                    onPress={() => navigation.goBack()}
                    disabled={salvando}
                >
                    <Text style={[styles.cancelButtonText, { color: theme.textSecondary }]}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <FooterScreen />
        </View>
    );
}