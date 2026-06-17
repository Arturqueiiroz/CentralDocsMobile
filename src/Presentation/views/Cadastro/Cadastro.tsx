import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../assets/img/LogoCentralDocsNova.png")}
            style={styles.logo}
          />
          <Text style={styles.subtitle}>
            Gerenciamento de documentos
          </Text>
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color="#7B8190"
          />

          <TextInput
            placeholder="nickinho@email.com"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Senha */}
        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={22}
            color="#7B8190"
          />

          <TextInput
            placeholder="••••••••"
            secureTextEntry={!passwordVisible}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#7B8190"
            />
          </TouchableOpacity>
        </View>

        {/* Confirmar Senha */}
        <Text style={styles.label}>Confirmar Senha</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={22}
            color="#7B8190"
          />

          <TextInput
            placeholder="••••••••"
            secureTextEntry={!confirmPasswordVisible}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() =>
              setConfirmPasswordVisible(!confirmPasswordVisible)
            }
          >
            <Ionicons
              name={
                confirmPasswordVisible
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color="#7B8190"
            />
          </TouchableOpacity>
        </View>

        {/* Botão */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>

        {/* Login */}
        <Text style={styles.loginText}>
          Já tem conta?{" "}
          <Text style={styles.loginLink}>Faça login</Text>
        </Text>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Ou criar com</Text>
          <View style={styles.line} />
        </View>

        {/* Google */}
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEFF7",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 30,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 250,
    height: 120,
    resizeMode: "contain",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2D2D2D",
  },

  blue: {
    color: "#1565C0",
  },

  subtitle: {
    color: "#666",
    marginTop: 5,
    textAlign: "center",
    fontSize: 18,
  },

  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6D9E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 52,
    marginBottom: 8,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#1565C0",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  loginText: {
    textAlign: "center",
    marginTop: 25,
    color: "#555",
  },

  loginLink: {
    color: "#1565C0",
    fontWeight: "600",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D6D9E0",
  },

  dividerText: {
    marginHorizontal: 10,
    color: "#777",
  },

  googleButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D6D9E0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  googleText: {
    fontSize: 16,
    color: "#333",
  },
});