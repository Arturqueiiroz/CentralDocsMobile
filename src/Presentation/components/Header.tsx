import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, StatusBar, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

import CustomDrawer from "./CustomDrawer";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HeaderScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <View style={styles.container}>
            {/* CABEÇALHO DA TELA */}
            <View style={styles.headerBody}>
                <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.menuButton}>
                    <Ionicons name="menu" size={28} color="#1E293B" />
                </TouchableOpacity>

                <Text style={styles.title}>CentralDocs</Text>

                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="notifications-outline" size={24} color="#1E293B" />
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
                        onNavigate={(nomeDaTela) => navigation.navigate(nomeDaTela)}
                        onClose={() => setMenuAberto(false)}
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
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerBody: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
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
});