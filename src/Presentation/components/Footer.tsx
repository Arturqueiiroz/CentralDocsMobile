import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
    useNavigation,
    useRoute,
    RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../App";
import { useTheme } from "../context/ThemeContext";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList>;

export const FooterScreen = () => {
    const navigation = useNavigation<NavigationProps>();
    const route = useRoute<RouteProps>();
    const { theme, isDarkMode } = useTheme();

    const activeBg = isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF';
    const activeColor = theme.accentColor;
    const inactiveColor = theme.textSecondary;

    return (
        <View style={[styles.containerIcones, { backgroundColor: theme.card, borderTopColor: theme.borderColor }]}>
            {/* Dashboard */}
            <TouchableOpacity
                style={[
                    styles.tabItem,
                    route.name === "TelaHome" && { backgroundColor: activeBg },
                ]}
                onPress={() => navigation.navigate("TelaHome")}
            >
                <Ionicons
                    name="grid"
                    size={22}
                    color={route.name === "TelaHome" ? activeColor : inactiveColor}
                />

                <Text
                    style={[
                        styles.tabLabel,
                        { color: route.name === "TelaHome" ? activeColor : inactiveColor },
                        route.name === "TelaHome" && { fontWeight: "600" },
                    ]}
                >
                    Dashboard
                </Text>
            </TouchableOpacity>

            {/* Documentos */}
            <TouchableOpacity
                style={[
                    styles.tabItem,
                    route.name === "Documentos" && { backgroundColor: activeBg },
                ]}
                onPress={() => navigation.navigate("Documentos")}
            >
                <Ionicons
                    name="document-text-outline"
                    size={22}
                    color={route.name === "Documentos" ? activeColor : inactiveColor}
                />

                <Text
                    style={[
                        styles.tabLabel,
                        { color: route.name === "Documentos" ? activeColor : inactiveColor },
                        route.name === "Documentos" && { fontWeight: "600" },
                    ]}
                >
                    Documentos
                </Text>
            </TouchableOpacity>

            {/* Perfil */}
            <TouchableOpacity
                style={[
                    styles.tabItem,
                    route.name === "Perfil" && { backgroundColor: activeBg },
                ]}
                onPress={() => navigation.navigate("Perfil")}
            >
                <Ionicons
                    name="person-outline"
                    size={22}
                    color={route.name === "Perfil" ? activeColor : inactiveColor}
                />

                <Text
                    style={[
                        styles.tabLabel,
                        { color: route.name === "Perfil" ? activeColor : inactiveColor },
                        route.name === "Perfil" && { fontWeight: "600" },
                    ]}
                >
                    Perfil
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerIcones: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 75,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        paddingBottom: 12,
    },

    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 20,
    },

    tabLabel: {
        fontSize: 11,
        marginTop: 4,
        fontWeight: "500",
    },
});