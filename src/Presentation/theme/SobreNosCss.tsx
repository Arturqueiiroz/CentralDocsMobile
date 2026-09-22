import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 44,
  },

  // HERO
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
    backgroundColor: "#FFFFFF",
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

  // SEÇÕES
  section: {
    marginBottom: 30,
  },

  sectionHeader: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 22,
  },

  // CARDS
  card: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },

  // MISSÃO
  missionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  missionAccent: {
    width: 5,
    height: "100%",
    minHeight: 74,
    borderRadius: 999,
    marginRight: 14,
  },

  cardTextStrong: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
  },

  // VALORES
  valueCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  valueIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  valueIconText: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  valueContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },

  cardText: {
    fontSize: 14,
    lineHeight: 23,
  },

  lastCard: {
    marginBottom: 0,
  },

  // EQUIPE
  memberCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
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
  },

  memberHeader: {
    flex: 1,
  },

  memberName: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  roleBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  memberRole: {
    fontSize: 12,
    fontWeight: "700",
  },

  memberDescription: {
    fontSize: 14,
    lineHeight: 23,
  },
});

export default styles;