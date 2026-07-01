import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, } from "react-native";
import { FooterScreen } from '../../components/Footer';

import { HeaderScreen } from "../../components/Header";

export const TelaPrincipalScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <HeaderScreen />
      <View style={styles.hero}>

        <Text style={styles.badge}>
          A nova era da gestão digital
        </Text>

        <Text style={styles.title}>
          Organize seus documentos em um só lugar
        </Text>

        <Text style={styles.description}>
          Segurança, velocidade e organização para sua vida digital.
          Comece grátis hoje mesmo.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Comece agora
          </Text>
        </TouchableOpacity>

        <Image
          source={require("../../../../assets/img/ChatGPT Image 23 de abr. de 2026, 15_03_20.png")}
          style={styles.dashboard}
        />

      </View>
      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          Por que{"\n"}CentralDocs?
        </Text>
        <View style={styles.card}>

          <Image
            source={require("../../../../assets/img/Seguranca (2).png")}
            style={styles.icon}
          />

          <Text style={styles.cardTitle}>
            Segurança
          </Text>

          <Text style={styles.cardText}>
            Proteção de nível bancário com criptografia de ponta a ponta para
            seus dados mais sensíveis.
          </Text>

        </View>
        <View style={styles.card}>

          <Image
            source={require("../../../../assets/img/Organizacao.png")}
            style={styles.icon}
          />

          <Text style={styles.cardTitle}>
            Organização
          </Text>

          <Text style={styles.cardText}>
            Pastas inteligentes que se auto-organizam usando inteligência
            artificial avançada.
          </Text>

        </View>
        <View style={styles.cardBlue}>

          <Image
            source={require("../../../../assets/img/PesquisaRapida.png")}
            style={styles.icon}
          />

          <Text style={styles.cardBlueTitle}>
            Pesquisa rápida
          </Text>

          <Text style={styles.cardBlueText}>
            Encontre qualquer documento em segundos, mesmo dentro de imagens e
            PDFs digitalizados.
          </Text>

        </View>

      </View>
      <View style={styles.cta}>

        <Text style={styles.ctaTitle}>
          Pronto para{"\n"}organizar sua{"\n"}vida?
        </Text>

        <Text style={styles.ctaDescription}>
          Junte-se a mais de 10.000 usuários que já simplificaram sua gestão de
          documentos.
        </Text>

        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>
            Experimente Grátis
          </Text>
        </TouchableOpacity>

      </View>
      <View style={styles.footer}>

        <Image
          source={require("../../../../assets/img/LogoCentralDocsNova.png")}
          style={styles.logo}
        />

        <Text style={styles.footerDescription}>
          Sua central de documentos definitiva, segura e acessível de qualquer
          lugar.
        </Text>

        <View style={styles.footerLinks}>

          <View>

            <Text style={styles.footerTitle}>Produto</Text>

            <Text style={styles.footerItem}>Recursos</Text>

            <Text style={styles.footerItem}>Segurança</Text>

            <Text style={styles.footerItem}>Preços</Text>

          </View>

          <View>

            <Text style={styles.footerTitle}>Ajuda</Text>

            <Text style={styles.footerItem}>Suporte</Text>

            <Text style={styles.footerItem}>Contato</Text>

            <Text style={styles.footerItem}>Privacidade</Text>

          </View>

        </View>

        <View style={styles.hr} />

        <Text style={styles.copy}>
          © 2026 CentralDocs
        </Text>

        <FooterScreen/>
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
    paddingTop: 25,
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
    color: "#111827",
    textAlign: "center",
    lineHeight: 42,
  },

  description: {
    marginTop: 18,
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 24,
    fontSize: 15,
    width: "95%",
  },

  button: {
    marginTop: 25,
    backgroundColor: "#2563EB",
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
  },

  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },

  cardBlue: {
    backgroundColor: "#2563EB",
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
    color: "#111827",
  },

  cardText: {
    color: "#6B7280",
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
    marginBottom: 30,
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
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 15,
  },

  footer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  logo: {
    width: 150,
    height: 45,
    resizeMode: "contain",
    marginBottom: 15,
  },

  footerDescription: {
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 25,
  },

  footerLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerTitle: {
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  footerItem: {
    marginBottom: 8,
    color: "#6B7280",
  },

  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginVertical: 25,
  },

  copy: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 13,
  },

});