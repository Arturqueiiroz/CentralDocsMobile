import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, StatusBar, Platform, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../../App";

import CustomDrawer from "./CustomDrawer";
import { useTheme } from "../context/ThemeContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HeaderScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const [menuAberto, setMenuAberto] = useState(false);
    const { theme } = useTheme();

    const handleLogout = async () => {
        setMenuAberto(false);

        // limpar token, AsyncStorage, contexto de auth, etc.
        await AsyncStorage.removeItem('userToken');
        // ou: await signOut(); se você tiver um AuthContext

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.card }]}>
            {/* CABEÇALHO DA TELA */}
            <View style={[styles.headerBody, { borderBottomColor: theme.borderColor }]}>
                <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.menuButton}>
                    <Ionicons name="menu" size={28} color={theme.textPrimary} />
                </TouchableOpacity>

                <Image source={require("../../../assets/img/LogoCentralDocsNova.png")} style={styles.logo} />

                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="notifications-outline" size={24} color={theme.textPrimary} />
                </TouchableOpacity>
            </View>

            {/* MODAL DO MENU LATERAL */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={menuAberto}
                onRequestClose={() => setMenuAberto(false)}
            >
                <View style={styles.modalOverlay}>
                    {/* Componente do Menu Lateral */}
                    <CustomDrawer
                        currentScreen={route.name}
                        onNavigate={(nomeDaTela) => navigation.navigate(nomeDaTela as any)}
                        onClose={() => setMenuAberto(false)}
                        onLogout={handleLogout}
                    />

                    {/* Fundo escurecido clicável para fechar o menu */}
                    <TouchableOpacity
                        style={styles.backdrop}
                        activeOpacity={1}
                        onPress={() => setMenuAberto(false)}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerBody: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    menuButton: {
        padding: 4,
    },
    modalOverlay: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    backdrop: {
        flex: 1,
    },
    logo: {
        width: 140,
        height: 60,
        resizeMode: 'contain',
    }
});