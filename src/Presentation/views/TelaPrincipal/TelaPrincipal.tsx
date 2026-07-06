import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App'; // Ajuste o caminho conforme seu projeto
import { useTheme } from "../../context/ThemeContext";

export const TelaPrincipalScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={[styles.badge, { backgroundColor: isDarkMode ? theme.borderColor : '#EAF3FF', color: theme.accentColor }]}>
          A nova era da gestão digital
        </Text>

        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Organize seus documentos em um só lugar
        </Text>

        <Text style={[styles.description, { color: theme.textSecondary }]}>
          Segurança, velocidade e organização para sua vida digital.
          Comece grátis hoje mesmo.
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.accentColor }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Comece agora</Text>
        </TouchableOpacity>

        <Image
          source={require("../../../../assets/img/ChatGPT Image 23 de abr. de 2026, 15_03_20.png")}
          style={styles.dashboard}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Por que{"\n"}CentralDocs?
        </Text>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Image source={require("../../../../assets/img/Seguranca (2).png")} style={styles.icon} />
          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Segurança</Text>
          <Text style={[styles.cardText, { color: theme.textSecondary }]}>
            Proteção de nível bancário com criptografia de ponta a ponta para seus dados mais sensíveis.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Image source={require("../../../../assets/img/Organizacao.png")} style={styles.icon} />
          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Organização</Text>
          <Text style={[styles.cardText, { color: theme.textSecondary }]}>
            Pastas inteligentes que se auto-organizam usando inteligência artificial avançada.
          </Text>
        </View>

        <View style={[styles.cardBlue, { backgroundColor: theme.accentColor }]}>
          <Image source={require("../../../../assets/img/PesquisaRapida.png")} style={styles.icon} />
          <Text style={styles.cardBlueTitle}>Pesquisa rápida</Text>
          <Text style={styles.cardBlueText}>
            Encontre qualquer documento em segundos, mesmo dentro de imagens e PDFs digitalizados.
          </Text>
        </View>
      </View>

      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>Pronto para{"\n"}organizar sua{"\n"}vida?</Text>
        <Text style={styles.ctaDescription}>
          Junte-se a mais de 10.000 usuários que já simplificaram sua gestão de documentos.
        </Text>
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.ctaButtonText, { color: theme.accentColor }]}>Experimente Grátis</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TelaPrincipalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  hero: {
    paddingHorizontal: 25,
    paddingTop: 60, // Aumentado para não ficar colado no topo (sem o header)
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#EAF3FF",
    color: "#3478F6",
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 42,
  },
  description: {
    marginTop: 18,
    textAlign: "center",
    lineHeight: 24,
    fontSize: 15,
    width: "95%",
  },
  button: {
    marginTop: 25,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  dashboard: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginTop: 25,
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },
  card: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },
  cardBlue: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },
  icon: {
    width: 34,
    height: 34,
    resizeMode: "contain",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  cardText: {
    lineHeight: 22,
    fontSize: 14,
  },
  cardBlueTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#FFF",
  },
  cardBlueText: {
    color: "#FFF",
    lineHeight: 22,
    fontSize: 14,
  },
  cta: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 50, // Espaço extra no final
    backgroundColor: "#2563EB",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
  },
  ctaTitle: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 36,
  },
  ctaDescription: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 18,
    lineHeight: 24,
    fontSize: 15,
  },
  ctaButton: {
    marginTop: 25,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontWeight: "700",
    fontSize: 15,
  },
});