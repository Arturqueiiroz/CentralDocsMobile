import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  Easing,
} from "react-native";
import { HeaderScreen } from "../../components/Header";
import { FooterScreen } from "../../components/Footer";
import { useTheme } from '../../context/ThemeContext';



interface TeamMember {
  id: string;
  nome: string;
  cargo: string;
  descricao: string;
  foto: any;
}

export default function SobreNosScreen() {
  const { theme, isDarkMode } = useTheme();
  const equipe: TeamMember[] = [
    {
      id: "1",
      nome: "Nicolay Neves",
      cargo: "Desenvolvedor Front-end",
      descricao:
        "Responsável pela criação das telas e pela experiência dos usuários no aplicativo.",
      foto: require("../../../../assets/img/Nicolay.jpg"),
    },
    {
      id: "2",
      nome: "Matheus Cantanhede",
      cargo: "Desenvolvedor Back-end",
      descricao:
        "Responsável pelo desenvolvimento da API, banco de dados e segurança das informações.",
      foto: require("../../../../assets/img/Matheus.jpg"),
    },
    {
      id: "3",
      nome: "Artur Queiroz",
      cargo: "Desenvolvedor Full Stack",
      descricao:
        "Responsável pela integração entre o aplicativo, a API e o banco de dados, garantindo o funcionamento do sistema.",
      foto: require("../../../../assets/img/Artur.jpg"),
    },
  ];

  const valores = [
    {
      titulo: "Segurança",
      descricao:
        "Protegemos as informações dos usuários com responsabilidade e confiabilidade.",
      sigla: "SG",
    },
    {
      titulo: "Organização",
      descricao:
        "Facilitamos o gerenciamento de documentos de forma prática e eficiente.",
      sigla: "OR",
    },
    {
      titulo: "Simplicidade",
      descricao:
        "Criamos uma experiência intuitiva para que qualquer pessoa possa utilizar o sistema.",
      sigla: "SP",
    },
  ];

  const heroAnim = useRef(new Animated.Value(0)).current;
  const missionAnim = useRef(new Animated.Value(0)).current;
  const valuesAnim = useRef(new Animated.Value(0)).current;
  const teamAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(130, [
      Animated.timing(heroAnim, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(missionAnim, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(valuesAnim, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(teamAnim, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [heroAnim, missionAnim, valuesAnim, teamAnim]);

  const fadeUp = (animation: Animated.Value) => ({
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [22, 0],
        }),
      },
    ],
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background }
      ]}
    >
      <HeaderScreen nome="CentralDocs" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.hero, fadeUp(heroAnim)]}>
          <View style={styles.heroGlowPrimary} />
          <View style={styles.heroGlowSecondary} />

          <View style={styles.heroBadge}>
            <View style={styles.heroBadgeDot} />
            <Text style={styles.heroBadgeText}>
              Gestão documental com padrão profissional
            </Text>
          </View>

          <Text style={styles.heroTitle}>Sobre a CentralDocs</Text>

          <Text style={styles.heroSubtitle}>
            Desenvolvemos uma plataforma para armazenar, organizar e acessar
            documentos com mais clareza, segurança e agilidade no dia a dia.
          </Text>

          <View style={styles.heroChips}>
            <View style={styles.heroChip}>
              <Text style={styles.heroChipText}>Segurança</Text>
            </View>

            <View style={styles.heroChip}>
              <Text style={styles.heroChipText}>Organização</Text>
            </View>

            <View style={styles.heroChip}>
              <Text style={styles.heroChipText}>Agilidade</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.section, fadeUp(missionAnim)]}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.textPrimary }
              ]}
            > Nossa missão</Text>
            <Text
              style={[
                styles.sectionSubtitle,
                { color: theme.textSecondary }
              ]}
            >
              O que orienta cada decisão de produto e experiência.
            </Text>
          </View>

          <View style={[styles.card, {
            backgroundColor: theme.card,
            borderColor: theme.borderColor,
          }, styles.missionCard]}>
            <View style={styles.missionAccent} />
            <Text style={styles.cardTextStrong}>
              Oferecer uma solução prática para o gerenciamento de documentos,
              proporcionando mais segurança, organização e facilidade no dia a
              dia de pessoas e empresas.
            </Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.section, fadeUp(valuesAnim)]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nossos valores</Text>
            <Text style={styles.sectionSubtitle}>
              Princípios que sustentam a qualidade e a confiança da plataforma.
            </Text>
          </View>

          {valores.map((valor, index) => (
            <View
              key={index}
              style={[styles.card, styles.valueCard, index === 2 && styles.lastCard]}
            >
              <View style={styles.valueIcon}>
                <Text style={styles.valueIconText}>{valor.sigla}</Text>
              </View>

              <View style={styles.valueContent}>
                <Text style={styles.cardTitle}>{valor.titulo}</Text>
                <Text style={styles.cardText}>{valor.descricao}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.section, fadeUp(teamAnim)]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nossa equipe</Text>
            <Text style={styles.sectionSubtitle}>
              Um time multidisciplinar focado em desempenho, confiabilidade e
              experiência do usuário.
            </Text>
          </View>

          {equipe.map((membro) => (
            <View key={membro.id} style={styles.memberCard}>
              <View style={styles.memberTop}>
                <Image source={membro.foto} style={styles.avatar} />

                <View style={styles.memberHeader}>
                  <Text style={styles.memberName}>{membro.nome}</Text>

                  <View style={styles.roleBadge}>
                    <Text style={styles.memberRole}>{membro.cargo}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.memberDescription}>{membro.descricao}</Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>

      <FooterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 44,
  },

  hero: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#111827",
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 8,
  },

  heroGlowPrimary: {
    position: "absolute",
    top: -30,
    right: -10,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(124, 58, 237, 0.28)",
  },

  heroGlowSecondary: {
    position: "absolute",
    bottom: -40,
    left: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(59, 130, 246, 0.18)",
  },

  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
  },

  heroBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffffff",
    marginRight: 8,
  },

  heroBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#E5E7EB",
    letterSpacing: 0.2,
  },

  heroTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 36,
    marginBottom: 12,
  },

  heroSubtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: "#CBD5E1",
    marginBottom: 22,
    maxWidth: "92%",
  },

  heroChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
    marginBottom: -8,
  },

  heroChip: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    marginBottom: 8,
  },

  heroChipText: {
    color: "#F8FAFC",
    fontSize: 13,
    fontWeight: "600",
  },

  metricsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
  },

  metricNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },

  metricLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },

  section: {
    marginBottom: 30,
  },

  sectionHeader: {
    marginBottom: 16,
  },

  sectionEyebrow: {
    fontSize: 12,
    fontWeight: "700",
    color: "#081249ff",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: "#64748B",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    padding: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },

  missionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  missionAccent: {
    width: 5,
    height: "100%",
    minHeight: 74,
    borderRadius: 999,
    backgroundColor: "#2e00faff",
    marginRight: 14,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },

  cardText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 23,
  },

  cardTextStrong: {
    flex: 1,
    fontSize: 15,
    color: "#334155",
    lineHeight: 24,
    fontWeight: "500",
  },

  valueCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  valueIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  valueIconText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0033dbff",
    letterSpacing: 0.6,
  },

  valueContent: {
    flex: 1,
  },

  lastCard: {
    marginBottom: 0,
  },

  memberCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    padding: 18,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },

  memberTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 22,
    marginRight: 14,
    borderWidth: 3,
    borderColor: "#EEF2FF",
  },

  memberHeader: {
    flex: 1,
  },

  memberName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },

  roleBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  memberRole: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4338CA",
  },

  memberDescription: {
    fontSize: 14,
    lineHeight: 23,
    color: "#64748B",
  },
});