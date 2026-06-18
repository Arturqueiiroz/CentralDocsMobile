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

export default function ProfileScreen() {
  const [name] = useState("Nickinho");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={26} color="#2563eb" />
        </TouchableOpacity>

        <Text style={styles.logo}>CentralDocs</Text>

        <TouchableOpacity>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      {/* Perfil */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.avatar}
          />

          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={14} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.plan}>Plano Membro</Text>

        <View style={styles.badgesContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>VERIFICADO</Text>
          </View>

          <Text style={styles.memberText}>
            MEMBRO DESDE 2026
          </Text>
        </View>
      </View>

      {/* Status */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Status da conta</Text>

          <Ionicons
            name="checkmark-circle"
            size={18}
            color="#2563eb"
          />
        </View>

        <View style={styles.storageRow}>
          <Text style={styles.storageLabel}>
            Uso de armazenamento
          </Text>

          <Text style={styles.storageValue}>
            12.4 GB / 50 GB
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View style={styles.progressFill} />
        </View>

        <TouchableOpacity style={styles.upgradeButton}>
          <MaterialCommunityIcons
            name="crown-outline"
            size={16}
            color="#2563eb"
          />

          <Text style={styles.upgradeText}>
            Faça upgrade para a versão premium
          </Text>
        </TouchableOpacity>
      </View>

      {/* Informações pessoais */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Informações pessoais
        </Text>

        <InfoItem
          icon="mail-outline"
          title="EMAIL"
          value="nickinho@email.com"
        />

        <InfoItem
          icon="call-outline"
          title="NÚMERO DE TELEFONE"
          value="(11)98765-4312"
        />

        <InfoItem
          icon="location-outline"
          title="LOCALIZAÇÃO"
          value="São Paulo - SP"
        />
      </View>

      {/* Segurança */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Segurança</Text>

        <SecurityItem
          icon="lock-reset"
          text="Alterar a senha"
        />

        <SecurityItem
          icon="fingerprint"
          text="Login biométrico"
          badge="HABILITADO"
        />

        <SecurityItem
          icon="shield-check"
          text="Autenticação de dois fatores"
        />
      </View>

      {/* Sair */}
      <TouchableOpacity style={styles.logoutButton}>
        <MaterialCommunityIcons
          name="logout"
          size={20}
          color="#ef4444"
        />

        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      <Text style={styles.version}>
        APP VERSION 2.4.1 (BUILD 829)
      </Text>
    </View>
  );
}

type InfoItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
};

function InfoItem({
  icon,
  title,
  value,
}: InfoItemProps) {
  return (
    <TouchableOpacity style={styles.infoItem}>
      <View style={styles.infoLeft}>
        <View style={styles.iconBox}>
          <Ionicons
            name={icon}
            size={18}
            color="#2563eb"
          />
        </View>

        <View>
          <Text style={styles.infoTitle}>{title}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#9ca3af"
      />
    </TouchableOpacity>
  );
}

type SecurityItemProps = {
  icon: string;
  text: string;
  badge?: string;
};

function SecurityItem({
  icon,
  text,
  badge,
}: SecurityItemProps) {
  return (
    <TouchableOpacity style={styles.securityItem}>
      <View style={styles.securityLeft}>
        <MaterialCommunityIcons
          name={icon as any}
          size={20}
          color="#4b5563"
        />

        <Text style={styles.securityText}>{text}</Text>
      </View>

      {badge ? (
        <View style={styles.enabledBadge}>
          <Text style={styles.enabledText}>
            {badge}
          </Text>
        </View>
      ) : (
        <Ionicons
          name="chevron-forward"
          size={18}
          color="#9ca3af"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 15,
    backgroundColor: "#fff",
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
  },

  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  profileContainer: {
    alignItems: "center",
    paddingVertical: 25,
  },

  avatarContainer: {
    position: "relative",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },

  plan: {
    color: "#6b7280",
    marginTop: 4,
  },

  badgesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },

  badge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: "#2563eb",
    fontSize: 11,
    fontWeight: "700",
  },

  memberText: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginBottom: 15,
    borderRadius: 14,
    padding: 15,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },

  storageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  storageLabel: {
    color: "#6b7280",
  },

  storageValue: {
    fontWeight: "700",
  },

  progressBackground: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
    marginTop: 10,
  },

  progressFill: {
    width: "25%",
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 999,
  },

  upgradeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  upgradeText: {
    color: "#2563eb",
    fontWeight: "600",
    marginLeft: 5,
  },

  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoTitle: {
    fontSize: 11,
    color: "#9ca3af",
  },

  infoValue: {
    fontSize: 15,
    color: "#111827",
  },

  securityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },

  securityLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  securityText: {
    fontSize: 15,
  },

  enabledBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },

  enabledText: {
    color: "#2563eb",
    fontSize: 10,
    fontWeight: "700",
  },

  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  logoutText: {
    color: "#ef4444",
    fontWeight: "700",
    marginLeft: 5,
  },

  version: {
    textAlign: "center",
    marginTop: 20,
    color: "#9ca3af",
    fontSize: 11,
    letterSpacing: 1,
  },
});