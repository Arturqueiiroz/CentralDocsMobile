import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Adicionado
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function LerDocumentoScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation(); // Hook de navegação

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* BOTÃO DE VOLTAR */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={28} color={theme.textPrimary} />
            </TouchableOpacity>

            <View style={styles.content}>
                {/* TÍTULO E SUBTÍTULO */}
                <Text style={[styles.title, { color: theme.textPrimary }]}>Ler Documento</Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                    Aponte a câmera para o QR Code presente no documento impresso.
                </Text>

                {/* ÁREA DO SCANNER (VIEWFINDER SIMULADO) */}
                <View style={styles.scannerWrapper}>
                    <View style={[styles.corner, styles.topLeft, { borderColor: theme.accentColor }]} />
                    <View style={[styles.corner, styles.topRight, { borderColor: theme.accentColor }]} />
                    <View style={[styles.corner, styles.bottomLeft, { borderColor: theme.accentColor }]} />
                    <View style={[styles.corner, styles.bottomRight, { borderColor: theme.accentColor }]} />

                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=600' }}
                            style={styles.scannerImage}
                            resizeMode="cover"
                        />
                        <View style={styles.qrOverlay}>
                            <Ionicons name="qr-code-outline" size={100} color="rgba(255, 255, 255, 0.8)" />
                        </View>
                    </View>
                </View>

                {/* CONTROLES DA CÂMERA */}
                <View style={styles.controlsContainer}>
                    <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: theme.card }]} activeOpacity={0.7}>
                        <Ionicons name="flashlight-outline" size={24} color={theme.accentColor} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.mainCaptureButton, { borderColor: theme.accentColor }]} activeOpacity={0.8}>
                        <View style={[styles.mainCaptureInner, { backgroundColor: theme.accentColor }]} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: theme.card }]} activeOpacity={0.7}>
                        <Ionicons name="image-outline" size={24} color={theme.accentColor} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity activeOpacity={0.6}>
                    <Text style={[styles.galleryText, { color: theme.textSecondary }]}>Fazer upload da galeria</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Estilo do botão de voltar
    backButton: {
        position: 'absolute',
        top: 50, // Ajuste conforme a necessidade (considerando Notch/Safearea)
        left: 20,
        zIndex: 10,
        padding: 5,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 100, // Aumentado para dar espaço ao botão de voltar
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
    // ... restante dos seus estilos permanecem iguais
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
    topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 18 },
    topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 18 },
    bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 18 },
    bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 18 },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        marginBottom: 15,
    },
    secondaryButton: {
        width: 54, height: 54, borderRadius: 27, justifyContent: 'center', alignItems: 'center',
        elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8,
    },
    mainCaptureButton: {
        width: 72, height: 72, borderRadius: 36, borderWidth: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent',
    },
    mainCaptureInner: { width: 56, height: 56, borderRadius: 28 },
    galleryText: { fontSize: 13, fontWeight: '500', marginTop: 5 },
});