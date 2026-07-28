import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  hero: {
    paddingHorizontal: 25,
    paddingTop: 60, 
    alignItems: "center",
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
dashboardContainer: {
    width: "100%",
    height: 180,
    marginTop: 25,
    borderRadius: 16,
    overflow: "hidden",
  },

  dashboard: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", 
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

export default styles;