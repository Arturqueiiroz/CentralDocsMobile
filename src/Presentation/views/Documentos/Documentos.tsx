import React, { useState } from "react";
import {StyleSheet,View,Text,TextInput,TouchableOpacity,ScrollView,Dimensions,} from "react-native";
import { HeaderScreen } from "../../components/Header";
import { FooterScreen } from "../../components/Footer";
import { useTheme } from "../../context/ThemeContext";

interface DocumentItem {
  id: string;
  title: string;
  type: "TRABALHO" | "PESSOAL";
  info: string;
  iconType: "pdf" | "image" | "excel" | "folder";
}
const { width } = Dimensions.get("window");

export default function DocumentosScreen() {
  const [activeTab, setActiveTab] = useState<"Tudo" | "Pessoal" | "Trabalho">(
    "Tudo",
  );
  const { theme, isDarkMode } = useTheme();

  const documentos: DocumentItem[] = [
    {
      id: "1",
      title: "Relatório Financeiro do 4º Trimestre.pdf",
      type: "TRABALHO",
      info: "Modificado há 2 horas • 2,4 MB",
      iconType: "pdf",
    },
    {
      id: "2",
      title: "Passport_Scan_Front.jpg",
      type: "PESSOAL",
      info: "Modificado ontem • 1,1 MB",
      iconType: "image",
    },
    {
      id: "3",
      title: "Project Timeline v3.xlsx",
      type: "TRABALHO",
      info: "Modificado há 3 dias • 840 KB",
      iconType: "excel",
    },
    {
      id: "4",
      title: "Fotos de férias de 2024",
      type: "PESSOAL",
      info: "14 itens • Modificado há 1 semana atrás",
      iconType: "folder",
    },
  ];

 const renderIcon = (type: DocumentItem["iconType"]) => {
    const iconBg = isDarkMode ? theme.borderColor : undefined;
    switch (type) {
      case "pdf":
        return (
          <View style={[styles.iconContainer, { backgroundColor: iconBg || "#EEF4FF" }]}>
            <Text
              style={{
                color: "#2F80ED",
                fontWeight: "bold",
              }}
            >
              📄
            </Text>
          </View>
        );

      case "image":
        return (
          <View style={[styles.iconContainer, { backgroundColor: iconBg || "#F5EEFF" }]}>
            <Text style={{ color: "#9B51E0" }}>🖼️</Text>
          </View>
        );

      case "excel":
        return (
          <View style={[styles.iconContainer, { backgroundColor: iconBg || "#E6F9EE" }]}>
            <Text style={{ color: "#27AE60" }}>📊</Text>
          </View>
        );

      case "folder":
        return (
          <View style={[styles.iconContainer, { backgroundColor: iconBg || "#FFF8EC" }]}>
            <Text style={{ color: "#F2994A" }}>📁</Text>
          </View>
        );

      default:
        return (
          <View style={[styles.iconContainer, iconBg ? { backgroundColor: iconBg } : null]}>
            <Text>📄</Text>
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderScreen />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.searchSection, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            style={[styles.input, { color: theme.textPrimary }]}
            placeholder="Pesquise seus arquivos..."
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}>
          <Text style={styles.addButtonText}>+ Adicionar documento</Text>
        </TouchableOpacity>

        <View style={styles.chipsContainer}>
          {(["Tudo", "Pessoal", "Trabalho"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.chip,
                { backgroundColor: isDarkMode ? theme.borderColor : '#F1F5F9' },
                activeTab === tab && { backgroundColor: theme.accentColor }
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: theme.textSecondary },
                  activeTab === tab && { color: "#FFFFFF", fontWeight: "600" },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Arquivos recentes</Text>

          <TouchableOpacity>
            <Text style={[styles.viewAllText, { color: theme.accentColor }]}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        {documentos.map((item) => (
          <View key={item.id} style={[styles.docCard, { backgroundColor: theme.card }]}>
            {renderIcon(item.iconType)}

            <View style={styles.docInfo}>
              <View style={styles.docTitleRow}>
                <Text style={[styles.docTitle, { color: theme.textPrimary }]} numberOfLines={2}>
                  {item.title}
                </Text>

                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        item.type === "TRABALHO" 
                          ? (isDarkMode ? "rgba(49, 130, 206, 0.15)" : "#EBF5FF") 
                          : (isDarkMode ? "rgba(107, 70, 193, 0.15)" : "#F3E8FF"),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      {
                        color: item.type === "TRABALHO" 
                          ? (isDarkMode ? "#63B3ED" : "#3182CE") 
                          : (isDarkMode ? "#B794F4" : "#6B46C1"),
                      },
                    ]}
                  >
                    {item.type}
                  </Text>
                </View>
              </View>

              <Text style={[styles.docMeta, { color: theme.textSecondary }]}>{item.info}</Text>
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <Text style={[styles.moreButtonText, { color: theme.textSecondary }]}>⋮</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.upgradeBanner}>
          <Text style={styles.bannerTitle}>Armazenamento em nuvem cheio?</Text>

          <Text style={styles.bannerSubtitle}>
            Faça upgrade para a versão Pro e obtenha 2 TB de armazenamento
            criptografado de documentos.
          </Text>

          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Atualize agora</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity style={[styles.gridCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
            <Text style={styles.gridIcon}>🛡️</Text>
            <Text style={[styles.gridText, { color: theme.textPrimary }]}>Cofre seguro</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.gridCard, { backgroundColor: theme.card, borderColor: theme.borderColor }]}>
            <Text style={styles.gridIcon}>🔗</Text>
            <Text style={[styles.gridText, { color: theme.textPrimary }]}>Links compartilhados</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },

  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    marginVertical: 15,
    paddingHorizontal: 15,
    height: 50,
  },

  searchIcon: {
    marginRight: 10,
    fontSize: 16,
  },

  input: {
    flex: 1,
    color: "#1A202C",
  },

  addButton: {
    backgroundColor: "#0061C4",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0061C4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  chipsContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },

  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    marginRight: 10,
  },

  chipActive: {
    backgroundColor: "#0061C4",
  },

  chipText: {
    color: "#475569",
    fontWeight: "500",
  },

  chipTextActive: {
    color: "#FFFFFF",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },

  viewAllText: {
    color: "#3B82F6",
    fontWeight: "600",
  },

  docCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  docInfo: {
    flex: 1,
  },

  docTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingRight: 5,
  },

  docTitle: {
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "700",
  },

  docMeta: {
    marginTop: 5,
    fontSize: 11,
    color: "#94A3B8",
  },

  moreButton: {
    paddingHorizontal: 5,
  },

  moreButtonText: {
    fontSize: 20,
    color: "#94A3B8",
  },

  upgradeBanner: {
    backgroundColor: "#4D84FF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 15,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  bannerSubtitle: {
    color: "#E0E7FF",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 15,
  },

  upgradeButton: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  upgradeButtonText: {
    color: "#4D84FF",
    fontSize: 14,
    fontWeight: "700",
  },

  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  gridCard: {
    width: (width - 55) / 2,
    height: 90,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },

  gridIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  gridText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E293B",
  },
});
