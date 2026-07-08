import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { height } = Dimensions.get('window');

interface CustomDrawerProps {
    currentScreen: string;
    onNavigate: (screen: any) => void;
    onClose: () => void;
}

export default function CustomDrawer({ currentScreen, onNavigate, onClose }: CustomDrawerProps) {
    const { theme, isDarkMode } = useTheme();

const menuItems = [
    { id: 'TelaHome', label: 'Home', icon: 'home-outline' },
    { id: 'Configuracoes', label: 'Configurações', icon: 'settings-outline' }, 
    { id: 'SobreNos', label: 'Sobre nós', icon: 'information-circle-outline' },
];

    const activeBg = isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF';
    const activeColor = theme.accentColor;
    const inactiveColor = theme.textSecondary;

    return (
        <View style={[styles.drawerContainer, { backgroundColor: theme.card, borderRightColor: theme.borderColor }]}>
       
            <View style={styles.header}>
                <Image
                    source={require('../../../assets/img/LogoCentralDocsNova.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color={theme.textPrimary} />
                </TouchableOpacity>
            </View>

            <View style={styles.navContainer}>
                {menuItems.map((item) => {
                    const isActive = currentScreen === item.id;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.navItem,
                                isActive && { backgroundColor: activeBg }
                            ]}
                            onPress={() => {
                                onNavigate(item.id);
                                onClose();
                            }}
                        >
                            <Ionicons
                                name={item.icon as any}
                                size={20}
                                color={isActive ? activeColor : inactiveColor}
                            />
                            <Text style={[
                                styles.navLabel,
                                { color: isActive ? activeColor : theme.textPrimary },
                                isActive && { fontWeight: '600' }
                            ]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={[styles.footer, { borderTopColor: theme.borderColor }]}>
                <View style={[styles.userCard, { backgroundColor: isDarkMode ? theme.background : '#F8FAFC' }]}>
                    <View style={[styles.avatar, { backgroundColor: theme.accentColor }]}>
                        <Text style={styles.avatarText}>N</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={[styles.userName, { color: theme.textPrimary }]}>Nickinho</Text>
                        <Text style={[styles.userSub, { color: theme.textSecondary }]}>Conta CentralDocs</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} activeOpacity={0.6}>
                    <Ionicons name="log-out-outline" size={18} color={theme.textSecondary} />
                    <Text style={[styles.logoutText, { color: theme.textSecondary }]}>Sair da conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        width: 280,
        height: height,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 20 : 50,
        paddingHorizontal: 20,
        borderRightWidth: 1,
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
        gap: 6,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 10,
        gap: 12,
    },
    navLabel: {
        fontSize: 15,
        fontWeight: '500',
    },
    footer: {
        paddingBottom: 30,
        borderTopWidth: 1,
        paddingTop: 20,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        gap: 12,
        marginBottom: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
    },
    userSub: {
        fontSize: 11,
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
    },
});