import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export const FooterScreen = () => {
    return (
        <View style={styles.containerIcones}>
            <TouchableOpacity style={[styles.tabItem, styles.tabItemActive]}>
                <Ionicons
                    name="grid"
                    size={22}
                    color="#2563EB"
                />
                <Text style={[styles.tabLabel, styles.tabLabelActive]}>
                    Dashboard
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
                <Ionicons
                    name="document-text-outline"
                    size={22}
                    color="#8E9AA6"
                />
                <Text style={styles.tabLabel}>
                    Documentos
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
                <Ionicons
                    name="person-outline"
                    size={22}
                    color="#8E9AA6"
                />
                <Text style={styles.tabLabel}>
                    Perfil
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerIcones: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 75,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        paddingBottom: 12,
    },

    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 20,
    },

    tabItemActive: {
        backgroundColor: "#EFF6FF",
    },

    tabLabel: {
        fontSize: 11,
        color: "#8E9AA6",
        marginTop: 4,
        fontWeight: "500",
    },

    tabLabelActive: {
        color: "#2563EB",
        fontWeight: "600",
    },
});

