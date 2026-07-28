import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from "../../components/Footer";
import { CustomInput } from '../../components/CustomTextInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { RootStackParamList } from '../../../../App';
import styles from "../../theme/PerfilCss";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type DadosPerfil = {
    nome: string;
    email: string;
    telefone: string;
    localizacao: string;
};

const perfilInicial: DadosPerfil = {
    nome: 'Nickinho',
    email: 'nickinho@email.com',
    telefone: '(11) 98765-4312',
    localizacao: 'São Paulo - SP',
};

export default function PerfilScreen() {
    const { theme, isDarkMode } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const [perfil, setPerfil] = useState<DadosPerfil>(perfilInicial);
    const [rascunho, setRascunho] = useState<DadosPerfil>(perfilInicial);
    const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);

    const [biometriaAtiva, setBiometriaAtiva] = useState(true);

    const inicialAvatar = perfil.nome.trim().charAt(0).toUpperCase() || '?';

    function abrirEdicao() {
        setRascunho(perfil);
        setModalEdicaoAberto(true);
    }

    function atualizarCampo(campo: string, valor: string) {
        setRascunho((atual) => ({ ...atual, [campo]: valor }));
    }

    function salvarEdicao() {
        if (!rascunho.nome.trim() || !rascunho.email.trim()) {
            Alert.alert('Faltou algo', 'Nome e email não podem ficar em branco.');
            return;
        }
        if (!rascunho.email.includes('@')) {
            Alert.alert('Email inválido', 'Confere se digitou o email certinho.');
            return;
        }

        setPerfil(rascunho);
        setModalEdicaoAberto(false);
    }

    function confirmarLogout() {
        Alert.alert('Sair da conta', 'Tem certeza que quer sair?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Sair',
                style: 'destructive',
                onPress: () => navigation.navigate('TelaPrincipal'),
            },
        ]);
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <HeaderScreen />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Avatar e identificação */}
                <View style={styles.profileHeaderContainer}>
                    <View style={[styles.avatarLargeContainer, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}>
                        <Text style={styles.avatarLargeText}>{inicialAvatar}</Text>
                        <TouchableOpacity
                            style={[styles.editBadge, { backgroundColor: theme.accentColor, borderColor: theme.background }]}
                            activeOpacity={0.8}
                            onPress={abrirEdicao}
                        >
                            <Ionicons name="pencil" size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.profileName, { color: theme.textPrimary }]}>{perfil.nome}</Text>
                    <Text style={[styles.profileRole, { color: theme.textSecondary }]}>Plano Membro</Text>

                    <View style={styles.badgeRow}>
                        <View style={[styles.statusBadge, { backgroundColor: isDarkMode ? theme.borderColor : '#EBF5FF' }]}>
                            <Text style={[styles.statusBadgeText, { color: theme.accentColor }]}>VERIFICADO</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: isDarkMode ? theme.borderColor : '#F1F5F9' }]}>
                            <Text style={[styles.statusBadgeText, { color: theme.textSecondary }]}>MEMBRO DESDE 2025</Text>
                        </View>
                    </View>
                </View>

                {/* Informações pessoais */}
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={[styles.cardTitle, { color: theme.textPrimary, marginBottom: 0 }]}>Informações pessoais</Text>
                        <TouchableOpacity onPress={abrirEdicao}>
                            <Text style={[styles.editarLink, { color: theme.accentColor }]}>Editar</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={[styles.infoRow, { borderBottomColor: theme.borderColor }]} onPress={abrirEdicao}>
                        <View style={[styles.infoIconBox, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Ionicons name="mail-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>EMAIL</Text>
                            <Text style={[styles.infoValue, { color: theme.textPrimary }]}>{perfil.email}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.infoRow, { borderBottomColor: theme.borderColor }]} onPress={abrirEdicao}>
                        <View style={[styles.infoIconBox, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Ionicons name="call-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>NÚMERO DE TELEFONE</Text>
                            <Text style={[styles.infoValue, { color: theme.textPrimary }]}>{perfil.telefone}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.infoRow, { borderBottomColor: theme.borderColor }]} onPress={abrirEdicao}>
                        <View style={[styles.infoIconBox, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF4FF' }]}>
                            <Ionicons name="location-outline" size={20} color={theme.accentColor} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>LOCALIZAÇÃO</Text>
                            <Text style={[styles.infoValue, { color: theme.textPrimary }]}>{perfil.localizacao}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Segurança */}
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Segurança</Text>

                    <TouchableOpacity
                        style={[styles.securityRow, { borderBottomColor: theme.borderColor }]}
                        onPress={() => Alert.alert('Alterar senha', 'Indisponível no momento.')}
                    >
                        <View style={styles.securityLeft}>
                            <Ionicons name="refresh-outline" size={20} color={theme.textSecondary} style={{ marginRight: 12 }} />
                            <Text style={[styles.securityText, { color: theme.textPrimary }]}>Alterar a senha</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.securityRow, { borderBottomColor: theme.borderColor }]}
                        onPress={() => setBiometriaAtiva((atual) => !atual)}
                    >
                        <View style={styles.securityLeft}>
                            <Ionicons name="finger-print-outline" size={20} color={theme.textSecondary} style={{ marginRight: 12 }} />
                            <Text style={[styles.securityText, { color: theme.textPrimary }]}>Login biométrico</Text>
                        </View>
                        <View style={[
                            styles.habilitadoBadge,
                            { backgroundColor: biometriaAtiva ? (isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF') : theme.borderColor },
                        ]}>
                            <Text style={[styles.habilitadoText, { color: biometriaAtiva ? theme.accentColor : theme.textSecondary }]}>
                                {biometriaAtiva ? 'HABILITADO' : 'DESATIVADO'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.securityRow, { borderBottomColor: theme.borderColor }]}
                        onPress={() => Alert.alert('Autenticação de dois fatores', 'Indisponível no momento.')}
                    >
                        <View style={styles.securityLeft}>
                            <Ionicons name="shield-checkmark-outline" size={20} color={theme.textSecondary} style={{ marginRight: 12 }} />
                            <Text style={[styles.securityText, { color: theme.textPrimary }]}>Autenticação de dois fatores</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={18} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.logoutButton, { backgroundColor: theme.card, borderColor: theme.borderColor }]}
                    activeOpacity={0.7}
                    onPress={confirmarLogout}
                >
                    <Ionicons name="log-out-outline" size={22} color="#DC2626" style={{ marginRight: 8 }} />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </ScrollView>

            <FooterScreen />

            {/* Modal de edição do perfil */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEdicaoAberto}
                onRequestClose={() => setModalEdicaoAberto(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.modalOverlay}
                >
                    <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
                        <View style={styles.modalHeaderRow}>
                            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Editar perfil</Text>
                            <TouchableOpacity onPress={() => setModalEdicaoAberto(false)}>
                                <Ionicons name="close" size={24} color={theme.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <CustomInput
                                label="Nome"
                                placeholder="Como podemos te chamar?"
                                property="nome"
                                value={rascunho.nome}
                                onChangeText={atualizarCampo}
                            />
                            <CustomInput
                                label="Email"
                                placeholder="seuemail@exemplo.com"
                                property="email"
                                value={rascunho.email}
                                onChangeText={atualizarCampo}
                                keyboardType="email-address"
                            />
                            <CustomInput
                                label="Telefone"
                                placeholder="(11) 98765-4312"
                                property="telefone"
                                value={rascunho.telefone}
                                onChangeText={atualizarCampo}
                                keyboardType="phone-pad"
                            />
                            <CustomInput
                                label="Localização"
                                placeholder="Cidade - UF"
                                property="localizacao"
                                value={rascunho.localizacao}
                                onChangeText={atualizarCampo}
                            />
                        </ScrollView>

                        <View style={styles.modalButtonsRow}>
                            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalEdicaoAberto(false)}>
                                <Text style={[styles.modalCancelText, { color: theme.textSecondary }]}>Cancelar</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                <CustomButton title="Salvar" onPress={salvarEdicao} />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}
