import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 35,
  },
  scannerWrapper: {
    width: width * 0.75,
    height: width * 0.75,
    position: 'relative',
    borderRadius: 28,
    padding: 10,
    marginBottom: 40,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  scannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  qrOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderWidth: 4,
  },
  topLeft: { 
    top: 0, 
    left: 0, 
    borderRightWidth: 0, 
    borderBottomWidth: 0, 
    borderTopLeftRadius: 18 
  },
  topRight: { 
    top: 0, 
    right: 0, 
    borderLeftWidth: 0, 
    borderBottomWidth: 0, 
    borderTopRightRadius: 18 
  },
  bottomLeft: { 
    bottom: 0, 
    left: 0, 
    borderRightWidth: 0, 
    borderTopWidth: 0, 
    borderBottomLeftRadius: 18 
  },
  bottomRight: { 
    bottom: 0, 
    right: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0, 
    borderBottomRightRadius: 18 
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 15,
  },
  secondaryButton: {
    width: 54, 
    height: 54, 
    borderRadius: 27, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.06, 
    shadowRadius: 8,
  },
  mainCaptureButton: {
    width: 72, 
    height: 72, 
    borderRadius: 36, 
    borderWidth: 4, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'transparent',
  },
  mainCaptureInner: { 
    width: 56, 
    height: 56, 
    borderRadius: 28 
  },
  galleryText: { 
    fontSize: 13, 
    fontWeight: '500', 
    marginTop: 5 
  },
});

export default styles;
