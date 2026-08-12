import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import styles from "../../theme/BiometriaCss";

export default function ConfirmacaoBiometrica() {
  const { theme, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.borderColor }]}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color={theme.accentColor} />
        </TouchableOpacity>

        <Text style={[styles.logoText, { color: theme.accentColor }]}>CentralDocs</Text>

        <TouchableOpacity>
          <Image
            source={{
              uri: "https://i.pravatar.cc/100",
            }}
            style={[styles.avatar, { borderColor: theme.accentColor }]}
          />
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <View style={[styles.iconCard, { backgroundColor: theme.card }]}>
          <Ionicons
            name="finger-print-outline"
            size={80}
            color={theme.accentColor}
          />
        </View>

        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Confirmação{"\n"}Biométrica
        </Text>

        <Text style={[styles.description, { color: theme.textSecondary }]}>
          Use sua biometria para validar o acesso ao documento com
          segurança.
        </Text>

        <View style={[styles.cardButtons, { backgroundColor: theme.card }]}>
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.accentColor }]}>
            <Text style={styles.primaryButtonText}>
              Validar Biometria
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: isDarkMode ? theme.borderColor : '#EEF2FF' }]}>
            <Text style={[styles.secondaryButtonText, { color: theme.accentColor }]}>
              Entrar com senha
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.securityContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={16}
            color={theme.textSecondary}
          />
          <Text style={[styles.securityText, { color: theme.textSecondary }]}>
            Criptografia de ponta a ponta
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.bottomTab, { backgroundColor: theme.card, borderTopColor: theme.borderColor }]}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons
            name="grid-outline"
            size={22}
            color={theme.textSecondary}
          />
          <Text style={[styles.tabText, { color: theme.textSecondary }]}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <View style={[styles.activeTab, { backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF' }]}>
            <Ionicons
              name="document-text"
              size={22}
              color={theme.accentColor}
            />
          </View>
          <Text style={[styles.activeTabText, { color: theme.accentColor }]}>
            Documentos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons
            name="person-outline"
            size={22}
            color={theme.textSecondary}
          />
          <Text style={[styles.tabText, { color: theme.textSecondary }]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
