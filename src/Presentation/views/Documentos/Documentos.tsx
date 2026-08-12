import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, Image, Alert, } from "react-native";
import styles from "../../theme/DocumentosCss";
import { HeaderScreen } from "../../components/Header";
import { FooterScreen } from "../../components/Footer";
import { useTheme } from "../../context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DocumentItem {
  id: string;
  title: string;
  type: string;
  info: string;
  iconType: "RG" | "CNH" | "RA" | "e-titulo" | "DOC";
  uri?: string;
}

interface DocumentVisual {
  label: string;
  iconBg: string;
  iconText: string;
  badgeBg: string;
  badgeText: string;
}

const { width } = Dimensions.get("window");
const STORAGE_KEY = "@meus_documentos_v1";

const INITIAL_DOCUMENTS: DocumentItem[] = [
  { id: "1", title: "Registro Geral", type: "Documento", info: "Modificado há 2 horas • 2,4 MB", iconType: "RG" },
  { id: "2", title: "Carteira Nacional de Habilitação", type: "Documento", info: "Modificado ontem • 1,1 MB", iconType: "CNH" },
  { id: "3", title: "Certificado de Reservista", type: "Documento", info: "Modificado há 3 dias • 840 KB", iconType: "RA" },
  { id: "4", title: "Título Eleitoral", type: "Documento", info: "Modificado há 1 semana • 1,3 MB", iconType: "e-titulo" },
];

const getDocumentVisual = (item: DocumentItem, isDarkMode: boolean): DocumentVisual => {
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
      return { label: "RG", iconBg: isDarkMode ? "rgba(59, 130, 246, 0.14)" : "#EAF2FF", iconText: isDarkMode ? "#93C5FD" : "#2563EB", ...typeColors };
    case "CNH":
      return { label: "CNH", iconBg: isDarkMode ? "rgba(34, 197, 94, 0.14)" : "#E9F9EF", iconText: isDarkMode ? "#86EFAC" : "#15803D", ...typeColors };
    case "RA":
      return { label: "RA", iconBg: isDarkMode ? "rgba(245, 158, 11, 0.14)" : "#FFF4DE", iconText: isDarkMode ? "#FCD34D" : "#D97706", ...typeColors };
    case "e-titulo":
      return { label: "TIT", iconBg: isDarkMode ? "rgba(168, 85, 247, 0.14)" : "#F5EBFF", iconText: isDarkMode ? "#D8B4FE" : "#7C3AED", ...typeColors };
    default:
      return { label: "DOC", iconBg: isDarkMode ? "rgba(148, 163, 184, 0.18)" : "#EEF2F7", iconText: isDarkMode ? "#CBD5E1" : "#475569", ...typeColors };
  }
};

export default function DocumentosScreen() {
  const [documentos, setDocumentos] = useState<DocumentItem[]>([]);
  const [activeTab, setActiveTab] = useState<"Tudo" | "Pessoal" | "Trabalho">("Tudo");
  const { theme, isDarkMode } = useTheme();

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setDocumentos(JSON.parse(storedData));
        } else {
          setDocumentos(INITIAL_DOCUMENTS);
        }
      } catch (error) {
        console.error("Erro ao carregar documentos", error);
        setDocumentos(INITIAL_DOCUMENTS);
      }
    };
    loadDocuments();
  }, []);

  const adicionarDocumentoGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à sua galeria para adicionar documentos.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      const uriImagem = resultado.assets[0].uri;

      const novoDocumento: DocumentItem = {
        id: Date.now().toString(),
        title: "Novo Documento Anexado",
        type: "Pessoal",
        info: "Adicionado hoje • Recém-criado",
        iconType: "DOC",
        uri: uriImagem,
      };

      const listaAtualizada = [novoDocumento, ...documentos];
      setDocumentos(listaAtualizada);

      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));
      } catch (error) {
        console.error("Erro ao salvar documento", error);
      }
    }
  };

  const removerDocumento = (id: string) => {
    Alert.alert(
      "Retirar documento",
      "Deseja realmente retirar este documento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Retirar",
          style: "destructive",
          onPress: async () => {
            try {
              const novaLista = documentos.filter((doc) => doc.id !== id);

              setDocumentos(novaLista);

              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
            } catch (error) {
              console.error("Erro ao remover documento:", error);
            }
          },
        },
      ]
    );
  };

  const softSurface = isDarkMode ? "rgba(255,255,255,0.04)" : "#F8FAFC";
  const softBorder = isDarkMode ? "rgba(255,255,255,0.06)" : "#E2E8F0";
  const elevatedShadow = isDarkMode ? "#000000" : "#0F172A";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderScreen />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.heroCard, { backgroundColor: theme.card, borderColor: softBorder, shadowColor: elevatedShadow }]}>
          <Text style={[styles.heroEyebrow, { color: theme.textSecondary }]}>Central de documentos</Text>
          <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
            Organize, proteja e acesse seus arquivos com clareza.
          </Text>

          <View style={[styles.searchSection, { backgroundColor: softSurface, borderColor: softBorder }]}>
            <View style={[styles.searchIconWrapper, { backgroundColor: isDarkMode ? "rgba(96, 165, 250, 0.14)" : "#EAF2FF" }]}>
              <Text style={[styles.searchIcon, { color: theme.accentColor }]}>⌕</Text>
            </View>
            <TextInput
              style={[styles.input, { color: theme.textPrimary }]}
              placeholder="Pesquise seus arquivos..."
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={adicionarDocumentoGaleria}
            style={[styles.addButton, { backgroundColor: theme.accentColor, shadowColor: theme.accentColor }]}
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
          <Text style={[styles.filterTitle, { color: theme.textPrimary }]}>Categorias</Text>
          <Text style={[styles.filterSubtitle, { color: theme.textSecondary }]}>Filtre sua biblioteca rapidamente</Text>
        </View>

        <View style={styles.chipsContainer}>
          {(["Tudo"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.9}
              style={[
                styles.chip,
                {
                  backgroundColor: activeTab === tab ? theme.accentColor : isDarkMode ? "rgba(255,255,255,0.05)" : "#F1F5F9",
                  borderColor: activeTab === tab ? theme.accentColor : softBorder,
                },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.chipText, { color: activeTab === tab ? "#FFFFFF" : theme.textSecondary, fontWeight: activeTab === tab ? "700" : "600" }]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Arquivos recentes</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>Seus últimos documentos acessados</Text>
          </View>
          <TouchableOpacity activeOpacity={0.85} style={styles.sectionAction}>
            <Text style={[styles.viewAllText, { color: theme.accentColor }]}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        {documentos
          .filter((doc) => activeTab === "Tudo" || doc.type.toLowerCase() === activeTab.toLowerCase())
          .map((item) => {
            const visual = getDocumentVisual(item, isDarkMode);

            return (
              <View key={item.id} style={[styles.docCard, { backgroundColor: theme.card, borderColor: softBorder, shadowColor: elevatedShadow }]}>
                <View style={[styles.iconContainer, { backgroundColor: visual.iconBg }]}>
                  <Text style={[styles.iconLabel, { color: visual.iconText }]}>{visual.label}</Text>
                </View>

                <View style={styles.docInfo}>
                  <View style={styles.docTopRow}>
                    <Text style={[styles.docTitle, { color: theme.textPrimary }]} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => removerDocumento(item.id)}
                      style={[styles.moreButton, { backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "#F8FAFC", borderColor: softBorder }]}
                    >
                      <Text style={[styles.moreButtonText, { color: theme.textSecondary }]}>⋯</Text>
                    </TouchableOpacity>
                  </View>

                  {item.uri && (
                    <View style={[styles.previewImageContainer, { borderColor: softBorder }]}>
                      <Image source={{ uri: item.uri }} style={styles.previewImage} />
                    </View>
                  )}

                  <View style={styles.docBottomRow}>
                    <Text style={[styles.docMeta, { color: theme.textSecondary }]} numberOfLines={1}>
                      {item.info}
                    </Text>
                    <View style={[styles.badge, { backgroundColor: visual.badgeBg }]}>
                      <Text style={[styles.badgeText, { color: visual.badgeText }]}>{item.type}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}

        <View style={[styles.upgradeBanner, { backgroundColor: isDarkMode ? "#1D4ED8" : "#3B82F6", shadowColor: isDarkMode ? "#000000" : "#2563EB" }]}>
          <View style={styles.bannerPill}>
            <Text style={styles.bannerPillText}>PRO</Text>
          </View>
          <Text style={styles.bannerTitle}>Armazenamento em nuvem cheio?</Text>
          <Text style={styles.bannerSubtitle}>Faça upgrade para a versão Pro e obtenha 2 TB de armazenamento criptografado de documentos.</Text>
          <TouchableOpacity activeOpacity={0.9} style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Atualize agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterScreen />
    </View>
  );
}