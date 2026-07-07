import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, Image, Animated, Easing, } from "react-native";
import { HeaderScreen } from "../../components/Header";
import { FooterScreen } from "../../components/Footer";
import { useTheme } from '../../context/ThemeContext';
import styles from "../../theme/SobreNosCss"

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

          <View style={[styles.card,     {
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