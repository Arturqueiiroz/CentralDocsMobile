import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 120,
  },
  welcomeContainer: { 
    marginBottom: 20 
  },
  welcomeText: { 
    fontSize: 16, 
    color: '#1E293B', 
    fontWeight: '500' 
  },
  welcomeName: { 
    color: '#0061C4', 
    fontWeight: '700' 
  },
  cardsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  infoCard: { 
    width: '48%', 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: '#EDF2F7', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.03, 
    shadowRadius: 8, 
    elevation: 1 
  },
  cardIconCircle: { 
    width: 38, 
    height: 38, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  number: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#1E293B' 
  },
  label: { 
    marginTop: 2, 
    fontSize: 13, 
    color: '#94A3B8', 
    fontWeight: '500' 
  },
  storageCard: { 
    backgroundColor: '#1D68E4', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 25, 
    shadowColor: '#1D68E4', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 10, 
    elevation: 4 
  },
  storageHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  storageTitleRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  storageTitle: { 
    color: '#FFF', 
    fontSize: 15, 
    fontWeight: '600' 
  },
  percent: { 
    color: '#FFF', 
    fontWeight: '700', 
    fontSize: 16 
  },
  progressBackground: { 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: 'rgba(255,255,255,0.25)', 
    overflow: 'hidden' 
  },
  progressFill: { 
    width: '82%', 
    height: '100%', 
    backgroundColor: '#FFF', 
    borderRadius: 3 
  },
  storageText: { 
    color: 'rgba(255,255,255,0.85)', 
    marginTop: 10, 
    fontSize: 12 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1E293B' 
  },
  seeAll: { 
    color: '#0061C4', 
    fontWeight: '600', 
    fontSize: 14 
  },
  activityCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 12, 
    marginBottom: 12, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#EDF2F7' 
  },
  activityIconContainer: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  activityBody: { 
    flex: 1 
  },
  activityHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  activityTitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#1E293B', 
    flex: 1, 
    paddingRight: 5 
  },
  activitySubtitle: { 
    marginTop: 2, 
    color: '#94A3B8', 
    fontSize: 12 
  },
  moreButton: { 
    padding: 4 
  },
  fab: {
    position: 'absolute',
    bottom: 95,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 999, 
  },
  fabText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '300',
    marginTop: -4,
  },
  modalOverlayTransparent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  floatingMenu: {
    position: 'absolute',
    bottom: 165, 
    right: 20,
    alignItems: 'flex-end',
  },
  speedDialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  miniFabBlue: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingLabelBlue: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingLabelTextWhite: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoCardFull: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoCardFullTextBox: {
    marginLeft: 14,
  },
  pendingBanner: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
  },
  pendingBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pendingIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pendingTextBox: {
    flex: 1,
  },
  pendingTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  pendingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  pendingButton: {
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  pendingButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyStateBox: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 13,
    textAlign: 'center',
  },
  deleteActivityButton: {
    padding: 4,
  },  
});

export default styles;