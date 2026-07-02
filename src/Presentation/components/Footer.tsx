import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute,} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../App";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const FooterScreen = () => {
    const navigation = useNavigation<NavigationProps>();
    const route = useRoute();

    return (
        <View style={styles.containerIcones}>

            {/* Dashboard */}
            <TouchableOpacity
                style={[
                    styles.tabItem,
                    route.name === "TelaHome" && styles.tabItemActive,
                ]}
                onPress={() => navigation.navigate("TelaHome")}
            >
                <Ionicons
                    name="grid"
                    size={22}
                    color={
                        route.name === "TelaHome"
                            ? "#2563EB"
                            : "#8E9AA6"
                    }
                />

                <Text
                    style={[
                        styles.tabLabel,
                        route.name === "TelaHome" &&
                            styles.tabLabelActive,
                    ]}
                >
                    Dashboard
                </Text>
            </TouchableOpacity>

            {/* Documentos */}
            <TouchableOpacity
                style={styles.tabItem}
                onPress={() =>
                    Alert.alert(
                        "Em desenvolvimento",
                        "A tela de Documentos ainda não foi criada."
                    )
                }
            >
                <Ionicons
                    name="document-text-outline"
                    size={22}
                    color="#8E9AA6"
                />

                <Text style={styles.tabLabel}>
                    Documentos
                </Text>
            </TouchableOpacity>

            {/* Perfil */}
            <TouchableOpacity
                style={[
                    styles.tabItem,
                    route.name === "TelaPrincipal" &&
                        styles.tabItemActive,
                ]}
                onPress={() => navigation.navigate("TelaPrincipal")}
            >
                <Ionicons
                    name="person-outline"
                    size={22}
                    color={
                        route.name === "TelaPrincipal"
                            ? "#2563EB"
                            : "#8E9AA6"
                    }
                />

                <Text
                    style={[
                        styles.tabLabel,
                        route.name === "TelaPrincipal" &&
                            styles.tabLabelActive,
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