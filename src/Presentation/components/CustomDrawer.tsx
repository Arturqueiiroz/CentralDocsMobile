import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

interface CustomDrawerProps {
    currentScreen: string;
    onNavigate: (screen: string) => void;
    onClose: () => void;
}

export default function CustomDrawer({ currentScreen, onNavigate, onClose }: CustomDrawerProps) {

    // Mapeamento exato das telas que você possui na imagem image_089c24.png
    const menuItems = [
        { id: 'PaginaInicial', label: 'Home', icon: 'home-outline' },
        { id: 'Documentos', label: 'Meus documentos', icon: 'document-text-outline' },
        { id: 'QRCode', label: 'Ler QR Code', icon: 'qr-code-outline' },
        { id: 'Perfil', label: 'Perfil', icon: 'person-outline' },
        { id: 'Configuracoes', label: 'Configurações', icon: 'settings-outline' },
        { id: 'SobreNos', label: 'Sobre nós', icon: 'information-circle-outline' },
    ];

    return (
        <View style={styles.drawerContainer}>
            {/* TOPO: LOGO E BOTÃO FECHAR */}
            <View style={styles.header}>
                <Image
                    source={require('../../../assets/img/LogoCentralDocsNova.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#1E293B" />
                </TouchableOpacity>
            </View>

            {/* MEIO: LINKS DE NAVEGAÇÃO */}
            <View style={styles.navContainer}>
                {menuItems.map((item) => {
                    const isActive = currentScreen === item.id;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.navItem, isActive && styles.navItemActive]}
                            onPress={() => {
                                onNavigate(item.id);
                                onClose();
                            }}
                        >
                            <Ionicons
                                name={item.icon as any}
                                size={20}
                                color={isActive ? '#2563EB' : '#64748B'}
                            />
                            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* RODAPÉ: CARD DO USUÁRIO E LOGOUT (Igual ao design da web) */}
            <View style={styles.footer}>
                <View style={styles.userCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>N</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Nickinho</Text>
                        <Text style={styles.userSub}>Conta CentralDocs</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} activeOpacity={0.6}>
                    <Ionicons name="log-out-outline" size={18} color="#64748B" />
                    <Text style={styles.logoutText}>Sair da conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        width: 280,
        height: height,
        backgroundColor: '#FFFFFF',
        paddingTop: 40,
        paddingHorizontal: 20,
        borderRightWidth: 1,
        borderRightColor: '#E2E8F0',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 140,
        height: 35,
    },
    closeButton: {
        padding: 5,
    },
    navContainer: {
        flex: 1,
        gap: 8,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 10,
        gap: 12,
    },
    navItemActive: {
        backgroundColor: '#EFF6FF',
    },
    navLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#64748B',
    },
    navLabelActive: {
        color: '#2563EB',
        fontWeight: '600',
    },
    footer: {
        paddingBottom: 30,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 20,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 12,
        borderRadius: 16,
        gap: 12,
        marginBottom: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B',
    },
    userSub: {
        fontSize: 11,
        color: '#94A3B8',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    logoutText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#64748B',
    },
});