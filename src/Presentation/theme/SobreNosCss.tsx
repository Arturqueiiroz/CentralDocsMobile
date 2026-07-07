import { StyleSheet } from "react-native";

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