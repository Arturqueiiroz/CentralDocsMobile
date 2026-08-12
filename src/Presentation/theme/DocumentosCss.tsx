import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scrollContent: { 
    paddingHorizontal: 20, 
    paddingTop: 14, 
    paddingBottom: 148 
  },
  heroCard: { 
    borderRadius: 26, 
    padding: 18, 
    marginBottom: 24, 
    borderWidth: 1, 
    shadowOffset: { width: 0, height: 14 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 28, 
    elevation: 4 
  },
  heroEyebrow: { 
    fontSize: 12, 
    fontWeight: "700", 
    letterSpacing: 0.6, 
    textTransform: "uppercase", 
    marginBottom: 8 
  },
  heroTitle: { 
    fontSize: 24, 
    lineHeight: 32, 
    fontWeight: "800", 
    marginBottom: 18 
  },
  searchSection: { 
    flexDirection: "row", 
    alignItems: "center", 
    borderWidth: 1, 
    borderRadius: 18, 
    paddingHorizontal: 14, 
    height: 58, 
    marginBottom: 14 
  },
  searchIconWrapper: { 
    width: 34, 
    height: 34, 
    borderRadius: 12, 
    alignItems: "center", 
    justifyContent: "center", 
    marginRight: 12 
  },
  searchIcon: { 
    fontSize: 18, 
    fontWeight: "700" 
  },
  input: { 
    flex: 1, 
    fontSize: 15, 
    fontWeight: "500" 
  },
  addButton: { 
    borderRadius: 18, 
    minHeight: 58, 
    justifyContent: "center", 
    paddingHorizontal: 18, 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.22, 
    shadowRadius: 20, 
    elevation: 5 
  },
  addButtonContent: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  addButtonIconWrapper: { 
    width: 28, 
    height: 28, 
    borderRadius: 10, 
    backgroundColor: "rgba(255,255,255,0.16)", 
    justifyContent: "center", 
    alignItems: "center", 
    marginRight: 10 
  },
  addButtonIcon: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "700" 
  },
  addButtonText: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "700", 
    letterSpacing: 0.2 
  },
  filterHeader: { 
    marginBottom: 12 
  },
  filterTitle: { 
    fontSize: 16, 
    fontWeight: "800", 
    marginBottom: 4 
  },
  filterSubtitle: { 
    fontSize: 13, 
    fontWeight: "500" 
  },
  chipsContainer: { 
    flexDirection: "row", 
    marginBottom: 24 
  },
  chip: { 
    paddingHorizontal: 18, 
    paddingVertical: 11, 
    borderRadius: 999, 
    marginRight: 10, 
    borderWidth: 1 
  },
  chipText: { 
    fontSize: 13 
  },
  sectionHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "flex-end", 
    marginBottom: 16 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "800", 
    marginBottom: 4 
  },
  sectionSubtitle: { 
    fontSize: 13, 
    fontWeight: "500" 
  },
  sectionAction: { 
    paddingVertical: 4, 
    paddingLeft: 12 
  },
  viewAllText: { 
    fontSize: 14, 
    fontWeight: "700" 
  },
  docCard: { 
    flexDirection: "row", 
    alignItems: "flex-start", 
    borderRadius: 22, 
    padding: 16, 
    marginBottom: 14, 
    borderWidth: 1, 
    shadowOffset: { width: 0, height: 12 }, 
    shadowOpacity: 0.06, 
    shadowRadius: 22, 
    elevation: 3 
  },
  iconContainer: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    justifyContent: "center", 
    alignItems: "center", 
    marginRight: 14, 
    overflow: "hidden" 
  },
  iconLabel: { 
    fontSize: 12, 
    fontWeight: "800", 
    letterSpacing: 0.5 
  },
  previewImageContainer: { 
    width: "100%", 
    height: 140, 
    borderRadius: 14, 
    borderWidth: 1, 
    overflow: "hidden", 
    marginBottom: 12, 
    marginTop: 2 
  },
  previewImage: { 
    width: "100%", 
    height: "100%", 
    resizeMode: "cover" 
  },
  docInfo: { 
    flex: 1 
  },
  docTopRow: { 
    flexDirection: "row", 
    alignItems: "flex-start", 
    marginBottom: 6 
  },
  docTitle: { 
    flex: 1, 
    fontSize: 15, 
    lineHeight: 22, 
    fontWeight: "700", 
    marginRight: 12 
  },
  moreButton: { 
    width: 34, 
    height: 34, 
    borderRadius: 12, 
    borderWidth: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  moreButtonText: { 
    fontSize: 22, 
    lineHeight: 22, 
    fontWeight: "500", 
    marginTop: -2 
  },
  docBottomRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  },
  docMeta: { 
    flex: 1, 
    fontSize: 12, 
    fontWeight: "500", 
    marginRight: 10 
  },
  badge: { 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 999 
  },
  badgeText: { 
    fontSize: 10, 
    fontWeight: "800", 
    letterSpacing: 0.4 
  },
  upgradeBanner: { 
    borderRadius: 24, 
    padding: 22, 
    marginTop: 8, 
    marginBottom: 18, 
    shadowOffset: { width: 0, height: 16 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 28, 
    elevation: 4 
  },
  bannerPill: { 
    alignSelf: "flex-start", 
    backgroundColor: "rgba(255,255,255,0.16)", 
    borderRadius: 999, 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    marginBottom: 14 
  },
  bannerPillText: { 
    color: "#FFFFFF", 
    fontSize: 10, 
    fontWeight: "800", 
    letterSpacing: 0.8 
  },
  bannerTitle: { 
    color: "#FFFFFF", 
    fontSize: 18, 
    fontWeight: "800", 
    marginBottom: 8 
  },
  bannerSubtitle: { 
    color: "rgba(255,255,255,0.84)", 
    fontSize: 13, 
    lineHeight: 20, 
    marginBottom: 18 
  },
  upgradeButton: { 
    backgroundColor: "#FFFFFF", 
    alignSelf: "flex-start", 
    paddingVertical: 12, 
    paddingHorizontal: 18, 
    borderRadius: 14 
  },
  upgradeButtonText: { 
    color: "#2563EB", 
    fontSize: 14, 
    fontWeight: "800" 
  },
});

export default styles;