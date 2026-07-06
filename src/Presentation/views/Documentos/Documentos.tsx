import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { HeaderScreen } from "../../components/Header";
import { FooterScreen } from "../../components/Footer";
import { useTheme } from "../../context/ThemeContext";

interface DocumentItem {
  id: string;
  title: string;
  type: string;
  info: string;
  iconType: "RG" | "CNH" | "RA" | "e-titulo";
  foto?: any; 
}

interface DocumentVisual {
  label: string;
  iconBg: string;
  iconText: string;
  badgeBg: string;
  badgeText: string;
  image?: any;
}

const { width } = Dimensions.get("window");

const getDocumentVisual = (
  item: DocumentItem,
  isDarkMode: boolean,
): DocumentVisual => {
  const typeColors =
    item.type === "TRABALHO"
      ? {
          badgeBg: isDarkMode ? "rgba(96, 165, 250, 0.16)" : "#E8F1FF",
          badgeText: isDarkMode ? "#93C5FD" : "#2563EB",
        }
      : {
          badgeBg: isDarkMode ? "rgba(192, 132, 252, 0.16)" : "#F4E8FF",
          badgeText: isDarkMode ? "#D8B4FE" : "#7C3AED",
        };

  switch (item.iconType) {
    case "RG":
      return {
        label: "RG",
        iconBg: isDarkMode ? "rgba(59, 130, 246, 0.14)" : "#EAF2FF",
        iconText: isDarkMode ? "#93C5FD" : "#2563EB",
        ...typeColors,
      };

    case "CNH":
      return {
        label: "CNH",
        iconBg: isDarkMode ? "rgba(34, 197, 94, 0.14)" : "#E9F9EF",
        iconText: isDarkMode ? "#86EFAC" : "#15803D",
        ...typeColors,
      };

    case "RA":
      return {
        label: "RA",
        iconBg: isDarkMode ? "rgba(245, 158, 11, 0.14)" : "#FFF4DE",
        iconText: isDarkMode ? "#FCD34D" : "#D97706",
        ...typeColors,
      };

    case "e-titulo":
      return {
        label: "TIT",
        iconBg: isDarkMode ? "rgba(168, 85, 247, 0.14)" : "#F5EBFF",
        iconText: isDarkMode ? "#D8B4FE" : "#7C3AED",
        ...typeColors,
      };

    default:
      return {
        label: "DOC",
        iconBg: isDarkMode ? "rgba(148, 163, 184, 0.18)" : "#EEF2F7",
        iconText: isDarkMode ? "#CBD5E1" : "#475569",
        ...typeColors,
      };
  }
};

export default function DocumentosScreen() {
  const [activeTab, setActiveTab] = useState<"Tudo" | "Pessoal" | "Trabalho">(
    "Tudo",
  );
  const { theme, isDarkMode } = useTheme();

  const documentos: DocumentItem[] = [
    {
      id: "1",
      title: "Registro Geral",
      type: "Documento",
      info: "Modificado há 2 horas • 2,4 MB",
      iconType: "RG",
    
    },
    {
      id: "2",
      title: "Carteira Nacional de Habilitação",
      type: "Documento",
      info: "Modificado ontem • 1,1 MB",
      iconType: "CNH",
  
    },
    {
      id: "3",
      title: "Certificado de Reservista",
      type: "Documento",
      info: "Modificado há 3 dias • 840 KB",
      iconType: "RA",
    
    },
    {
      id: "4",
      title: "Titulo Eleitoral",
      type: "Documento",
      info: "14 itens • Modificado há 1 semana atrás",
      iconType: "e-titulo",
      
    },
  ];

  const softSurface = isDarkMode ? "rgba(255,255,255,0.04)" : "#F8FAFC";
  const softBorder = isDarkMode ? "rgba(255,255,255,0.06)" : "#E2E8F0";
  const elevatedShadow = isDarkMode ? "#000000" : "#0F172A";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderScreen />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: theme.card,
              borderColor: softBorder,
              shadowColor: elevatedShadow,
            },
          ]}
        >
          <Text style={[styles.heroEyebrow, { color: theme.textSecondary }]}>
            Central de documentos
          </Text>

          <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
            Organize, proteja e acesse seus arquivos com clareza.
          </Text>

          <View
            style={[
              styles.searchSection,
              {
                backgroundColor: softSurface,
                borderColor: softBorder,
              },
            ]}
          >
            <View
              style={[
                styles.searchIconWrapper,
                {
                  backgroundColor: isDarkMode
                    ? "rgba(96, 165, 250, 0.14)"
                    : "#EAF2FF",
                },
              ]}
            >
              <Text style={[styles.searchIcon, { color: theme.accentColor }]}>
                ⌕
              </Text>
            </View>

            <TextInput
              style={[styles.input, { color: theme.textPrimary }]}
              placeholder="Pesquise seus arquivos..."
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.addButton,
              {
                backgroundColor: theme.accentColor,
                shadowColor: theme.accentColor,
              },
            ]}
          >
            <View style={styles.addButtonContent}>
              <View style={styles.addButtonIconWrapper}>
                <Text style={styles.addButtonIcon}>＋</Text>
              </View>

              <Text style={styles.addButtonText}>Adicionar documento</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.filterHeader}>
          <Text style={[styles.filterTitle, { color: theme.textPrimary }]}>
            Categorias
          </Text>
          <Text style={[styles.filterSubtitle, { color: theme.textSecondary }]}>
            Filtre sua biblioteca rapidamente
          </Text>
        </View>

        <View style={styles.chipsContainer}>
          {(["Tudo",] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.9}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    activeTab === tab
                      ? theme.accentColor
                      : isDarkMode
                        ? "rgba(255,255,255,0.05)"
                        : "#F1F5F9",
                  borderColor:
                    activeTab === tab
                      ? theme.accentColor
                      : softBorder,
                },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color:
                      activeTab === tab ? "#FFFFFF" : theme.textSecondary,
                    fontWeight: activeTab === tab ? "700" : "600",
                  },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
              Arquivos recentes
            </Text>
            <Text
              style={[styles.sectionSubtitle, { color: theme.textSecondary }]}
            >
              Seus últimos documentos acessados
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.sectionAction}>
            <Text style={[styles.viewAllText, { color: theme.accentColor }]}>
              Ver tudo
            </Text>
          </TouchableOpacity>
        </View>

        {documentos.map((item) => {
          const visual = getDocumentVisual(item, isDarkMode);

          return (
            <View
              key={item.id}
              style={[
                styles.docCard,
                {
                  backgroundColor: theme.card,
                  borderColor: softBorder,
                  shadowColor: elevatedShadow,
                },
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: visual.iconBg },
                ]}
              >
                {visual.image ? (
                  <Image source={visual.image} style={styles.iconImage} />
                ) : (
                  <Text style={[styles.iconLabel, { color: visual.iconText }]}>
                    {visual.label}
                  </Text>
                )}
              </View>

              <View style={styles.docInfo}>
                <View style={styles.docTopRow}>
                  <Text
                    style={[styles.docTitle, { color: theme.textPrimary }]}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.moreButton,
                      {
                        backgroundColor: isDarkMode
                          ? "rgba(255,255,255,0.05)"
                          : "#F8FAFC",
                        borderColor: softBorder,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.moreButtonText,
                        { color: theme.textSecondary },
                      ]}
                    >
                      ⋯
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.docBottomRow}>
                  <Text
                    style={[styles.docMeta, { color: theme.textSecondary }]}
                    numberOfLines={1}
                  >
                    {item.info}
                  </Text>

                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: visual.badgeBg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        { color: visual.badgeText },
                      ]}
                    >
                      {item.type}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}

        <View
          style={[
            styles.upgradeBanner,
            {
              backgroundColor: isDarkMode ? "#1D4ED8" : "#3B82F6",
              shadowColor: isDarkMode ? "#000000" : "#2563EB",
            },
          ]}
        >
          <View style={styles.bannerPill}>
            <Text style={styles.bannerPillText}>PRO</Text>
          </View>

          <Text style={styles.bannerTitle}>Armazenamento em nuvem cheio?</Text>

          <Text style={styles.bannerSubtitle}>
            Faça upgrade para a versão Pro e obtenha 2 TB de armazenamento
            criptografado de documentos.
          </Text>

          <TouchableOpacity activeOpacity={0.9} style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Atualize agora</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.gridCard,
              {
                backgroundColor: theme.card,
                borderColor: softBorder,
                shadowColor: elevatedShadow,
              },
            ]}
          >
            <View
              style={[
                styles.gridIconWrapper,
                {
                  backgroundColor: isDarkMode
                    ? "rgba(34, 197, 94, 0.14)"
                    : "#EAFBF1",
                },
              ]}
            >
              <Text style={[styles.gridIconText, { color: "#16A34A" }]}>
                SAFE
              </Text>
            </View>

            <Text style={[styles.gridText, { color: theme.textPrimary }]}>
              Cofre seguro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.gridCard,
              {
                backgroundColor: theme.card,
                borderColor: softBorder,
                shadowColor: elevatedShadow,
              },
            ]}
          >
            <View
              style={[
                styles.gridIconWrapper,
                {
                  backgroundColor: isDarkMode
                    ? "rgba(59, 130, 246, 0.14)"
                    : "#EAF2FF",
                },
              ]}
            >
              <Text style={[styles.gridIconText, { color: "#2563EB" }]}>
                LINK
              </Text>
            </View>

            <Text style={[styles.gridText, { color: theme.textPrimary }]}>
              Links compartilhados
            </Text>
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
    paddingTop: 14,
    paddingBottom: 148,
  },

  heroCard: {
    borderRadius: 26,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.08,
    shadowRadius: 28,
    elevation: 4,
  },

  heroEyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 8,
  },

  heroTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "800",
    marginBottom: 18,
  },

  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 58,
    marginBottom: 14,
  },

  searchIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  searchIcon: {
    fontSize: 18,
    fontWeight: "700",
  },

  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },

  addButton: {
    borderRadius: 18,
    minHeight: 58,
    justifyContent: "center",
    paddingHorizontal: 18,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 5,
  },

  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.16)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  addButtonIcon: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  filterHeader: {
    marginBottom: 12,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },

  filterSubtitle: {
    fontSize: 13,
    fontWeight: "500",
  },

  chipsContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },

  chip: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    marginRight: 10,
    borderWidth: 1,
  },

  chipText: {
    fontSize: 13,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "500",
  },

  sectionAction: {
    paddingVertical: 4,
    paddingLeft: 12,
  },

  viewAllText: {
    fontSize: 14,
    fontWeight: "700",
  },

  docCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 22,
    elevation: 3,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  iconLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  iconImage: {
    width: 28,
    height: 28,
    borderRadius: 6,
    resizeMode: "contain",
  },

  docInfo: {
    flex: 1,
  },

  docTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  docTitle: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    marginRight: 12,
  },

  moreButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  moreButtonText: {
    fontSize: 22,
    lineHeight: 22,
    fontWeight: "500",
    marginTop: -2,
  },

  docBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  docMeta: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    marginRight: 10,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.4,
  },

  upgradeBanner: {
    borderRadius: 24,
    padding: 22,
    marginTop: 8,
    marginBottom: 18,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 28,
    elevation: 4,
  },

  bannerPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 14,
  },

  bannerPillText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  bannerSubtitle: {
    color: "rgba(255,255,255,0.84)",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 18,
  },

  upgradeButton: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
  },

  upgradeButtonText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "800",
  },

  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  gridCard: {
    width: (width - 56) / 2,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 18,
    alignItems: "center",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 2,
  },

  gridIconWrapper: {
    minWidth: 62,
    height: 34,
    borderRadius: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  gridIconText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  gridText: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
});