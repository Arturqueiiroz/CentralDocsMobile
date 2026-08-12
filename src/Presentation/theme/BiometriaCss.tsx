import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5FA",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  logoText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 24,
    fontWeight: "700",
    color: "#2563EB",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 30,
  },

  iconCard: {
    width: 120,
    height: 120,
    backgroundColor: "#FFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
    elevation: 5,
  },

  title: {
    fontSize: 38,
    fontWeight: "700",
    color: "#13233F",
    textAlign: "center",
    marginBottom: 18,
  },

  description: {
    textAlign: "center",
    fontSize: 18,
    color: "#4B5563",
    lineHeight: 28,
    marginBottom: 40,
  },

  cardButtons: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    elevation: 3,
  },

  primaryButton: {
    backgroundColor: "#0A63D8",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    backgroundColor: "#EEF2FF",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#0A63D8",
    fontSize: 16,
    fontWeight: "700",
  },

  securityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },

  securityText: {
    marginLeft: 5,
    color: "#94A3B8",
    fontSize: 13,
  },

  bottomTab: {
    height: 75,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  tabItem: {
    alignItems: "center",
  },

  tabText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },

  activeTab: {
    backgroundColor: "#EFF6FF",
    padding: 10,
    borderRadius: 12,
  },

  activeTabText: {
    fontSize: 12,
    color: "#2563EB",
    marginTop: 4,
    fontWeight: "600",
  },
});

export default styles;