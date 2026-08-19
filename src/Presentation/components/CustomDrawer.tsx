import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../theme/CustomDrawerCss';
import { useTheme } from '../context/ThemeContext';

interface CustomDrawerProps {
    currentScreen: string;
    onNavigate: (screen: string) => void;
    onClose: () => void;
    onLogout: () => void;
}

export default function CustomDrawer({
    currentScreen,
    onNavigate,
    onClose,
    onLogout,
}: CustomDrawerProps) {

    const { theme, isDarkMode } = useTheme();

    const menuItems = [
        { id: 'TelaHome', label: 'Home', icon: 'home-outline' },
        { id: 'Configuracoes', label: 'Configurações', icon: 'settings-outline' },
        { id: 'SobreNos', label: 'Sobre nós', icon: 'information-circle-outline' },
        { id: 'PerguntasFrequentes', label: 'Perguntas Frequentes', icon: 'help-circle-outline' },
    ];

    const activeBg = isDarkMode
        ? 'rgba(59,130,246,0.15)'
        : '#EFF6FF';

    const activeIconBg = isDarkMode
        ? 'rgba(59,130,246,0.25)'
        : '#DBEAFE';

    const activeColor = theme.accentColor;
    const inactiveColor = theme.textSecondary;

    return (
        <SafeAreaView
            style={[
                styles.drawerContainer,
                {
                    backgroundColor: theme.card,
                    borderRightColor: theme.borderColor,
                },
            ]}
        >
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require('../../../assets/img/LogoCentralDocsNova.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <TouchableOpacity
                    style={[
                        styles.closeButton,
                        { backgroundColor: isDarkMode ? theme.background : '#F1F5F9' },
                    ]}
                    onPress={onClose}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="close"
                        size={20}
                        color={theme.textPrimary}
                    />
                </TouchableOpacity>
            </View>

            {/* Menu */}
            <View style={styles.navContainer}>
                {menuItems.map((item) => {

                    const isActive = currentScreen === item.id;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.navItem,
                                isActive && { backgroundColor: activeBg },
                            ]}
                            onPress={() => {
                                onNavigate(item.id);
                                onClose();
                            }}
                            activeOpacity={0.7}
                        >
                            {isActive && (
                                <View
                                    style={[
                                        styles.activeIndicator,
                                        { backgroundColor: activeColor },
                                    ]}
                                />
                            )}

                            <View
                                style={[
                                    styles.navIconWrap,
                                    { backgroundColor: isActive ? activeIconBg : 'transparent' },
                                ]}
                            >
                                <Ionicons
                                    name={item.icon as any}
                                    size={19}
                                    color={isActive ? activeColor : inactiveColor}
                                />
                            </View>

                            <Text
                                style={[
                                    styles.navLabel,
                                    { color: isActive ? activeColor : theme.textPrimary },
                                    isActive && { fontWeight: '600' },
                                ]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Usuário */}
            <View
                style={[
                    styles.footer,
                    { borderTopColor: theme.borderColor },
                ]}
            >
                <View
                    style={[
                        styles.userCard,
                        {
                            backgroundColor: isDarkMode ? theme.background : '#F8FAFC',
                            borderColor: theme.borderColor,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.avatar,
                            { backgroundColor: theme.accentColor },
                        ]}
                    >
                        <Text style={styles.avatarText}>N</Text>
                    </View>

                    <View style={styles.userInfo}>
                        <Text style={[styles.userName, { color: theme.textPrimary }]}>
                            Nickinho
                        </Text>

                        <Text style={[styles.userSub, { color: theme.textSecondary }]}>
                            Conta CentralDocs
                        </Text>

                        <TouchableOpacity
                            style={styles.logoutInline}
                            onPress={onLogout}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name="log-out-outline"
                                size={15}
                                color="#EF4444"
                            />
                            <Text style={styles.logoutInlineText}>
                                Sair da conta
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}