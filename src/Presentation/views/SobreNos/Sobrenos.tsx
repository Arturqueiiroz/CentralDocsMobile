import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { HeaderScreen } from "../../components/Header";
import { FooterScreen } from "../../components/Footer";

interface TeamMember {
  id: string;
  nome: string;
  cargo: string;
  descricao: string;
  foto: any;
}

export default function SobreNosScreen() {
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
        "Responsável pela integração entre o aplicativo, a API e o banco de dados, garantindo o funcionamento do sistema. Além disso, contribui para o desenvolvimento de novas funcionalidades e melhorias na plataforma.",
        foto: require("../../../../assets/img/Artur.jpg"),
    },
  ];

  const valores = [
    {
      titulo: "Segurança",
      descricao:
        "Protegemos as informações dos usuários com responsabilidade e confiabilidade.",
    },
    {
      titulo: "Organização",
      descricao:
        "Facilitamos o gerenciamento de documentos de forma prática e eficiente.",
    },
    {
      titulo: "Simplicidade",
      descricao:
        "Criamos uma experiência intuitiva para que qualquer pessoa possa utilizar o sistema.",
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderScreen nome="CentralDocs" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Sobre a CentralDocs</Text>

          <Text style={styles.heroSubtitle}>
            Desenvolvemos uma plataforma para armazenar, organizar e acessar
            documentos de forma simples, segura e rápida.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nossa missão</Text>

          <View style={styles.card}>
            <Text style={styles.cardText}>
              Oferecer uma solução prática para o gerenciamento de documentos,
              proporcionando mais segurança, organização e facilidade no dia a
              dia de pessoas e empresas.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nossos valores</Text>

          {valores.map((valor, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{valor.titulo}</Text>

              <Text style={styles.cardText}>{valor.descricao}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nossa equipe</Text>

          {equipe.map((membro) => (
            <View key={membro.id} style={styles.memberCard}>
<Image
    source={membro.foto}
    style={styles.avatar}
/>

              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{membro.nome}</Text>

                <Text style={styles.memberRole}>{membro.cargo}</Text>

                <Text style={styles.memberDescription}>
                  {membro.descricao}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <FooterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: "#1D68E4",
    borderRadius: 14,
    paddingVertical: 30,
    paddingHorizontal: 22,
    marginBottom: 28,
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 10,
  },

  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#E8EEF9",
  },
  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 18,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D68E4",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
  },

  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 14,
  },

avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
},

  memberInfo: {
    flex: 1,
  },

  memberName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  memberRole: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D68E4",
    marginTop: 2,
    marginBottom: 6,
  },

  memberDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#6B7280",
  },
});
