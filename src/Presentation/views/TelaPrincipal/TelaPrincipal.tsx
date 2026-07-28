import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useTheme } from "../../context/ThemeContext";
import styles from "../../theme/TelaPrincipalCss";

export const TelaPrincipalScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Organize seus documentos em um só lugar
        </Text>

        <View style={styles.dashboardContainer}>
          <Image
            source={require("../../../../assets/img/telahome.png")}
            style={styles.dashboard}
          />
        </View>

        <Text style={[styles.description, { color: theme.textSecondary }]}>
          Segurança, velocidade e organização para sua vida digital.
          Comece grátis hoje mesmo.
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.accentColor }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Comece agora</Text>
        </TouchableOpacity>


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
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.ctaButtonText, { color: theme.accentColor }]}>Experimente Grátis</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TelaPrincipalScreen;