import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderScreen } from '../../components/Header'; // Mantendo a consistência do cabeçalho

const { width } = Dimensions.get('window');

export default function LerDocumentoScreen() {
    return (
        <View style={styles.container}>
            {/* Cabeçalho padrão do CentralDocs */}
            <HeaderScreen nome="Nickinho" />

            <View style={styles.content}>
                {/* TÍTULO E SUBTÍTULO */}
                <Text style={styles.title}>Ler Documento</Text>
                <Text style={styles.subtitle}>
                    Aponte a câmera para o QR Code presente no documento impresso.
                </Text>

                {/* ÁREA DO SCANNER (VIEWFINDER SIMULADO) */}
                <View style={styles.scannerWrapper}>
                    {/* Cantos guias azuis da câmera */}
                    <View style={[styles.corner, styles.topLeft]} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />

                    {/* Imagem interna demonstrativa do scanner */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=600' }}
                            style={styles.scannerImage}
                            resizeMode="cover"
                        />
                        {/* Overlay escuro simulando foco do QR Code */}
                        <View style={styles.qrOverlay}>
                            <Ionicons name="qr-code-outline" size={100} color="rgba(255, 255, 255, 0.8)" />
                        </View>
                    </View>
                </View>

                {/* CONTROLES DA CÂMERA */}
                <View style={styles.controlsContainer}>
                    {/* Botão da Lanterna */}
                    <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7}>
                        <Ionicons name="flashlight-outline" size={24} color="#1D68E4" />
                    </TouchableOpacity>

                    {/* Botão de Disparo Principal */}
                    <TouchableOpacity style={styles.mainCaptureButton} activeOpacity={0.8}>
                        <View style={styles.mainCaptureInner} />
                    </TouchableOpacity>

                    {/* Botão da Galeria */}
                    <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7}>
                        <Ionicons name="image-outline" size={24} color="#1D68E4" />
                    </TouchableOpacity>
                </View>

                {/* TEXTO AUXILIAR INFERIOR */}
                <TouchableOpacity activeOpacity={0.6}>
                    <Text style={styles.galleryText}>Fazer upload da galeria</Text>
                </TouchableOpacity>
            </View>

            {/* TAB BAR INFERIOR (Mantendo a aba Documentos como ativa conforme a imagem) */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="grid-outline" size={22} color="#94A3B8" />
                    <Text style={styles.tabLabel}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabItem, styles.tabItemActive]}>
                    <Ionicons name="document-text" size={22} color="#2563EB" />
                    <Text style={[styles.tabLabel, styles.tabLabelActive]}>Documentos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="person-outline" size={22} color="#94A3B8" />
                    <Text style={styles.tabLabel}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 35,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
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
    // Estilização das bordas (cantos azuis do scanner)
    corner: {
        position: 'absolute',
        width: 35,
        height: 35,
        borderColor: '#1D68E4',
        borderWidth: 4,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopLeftRadius: 18,
    },
    topRight: {
        top: 0,
        right: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopRightRadius: 18,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomLeftRadius: 18,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomRightRadius: 18,
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
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    mainCaptureButton: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 4,
        borderColor: '#1D68E4',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    mainCaptureInner: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#1D68E4',
    },
    galleryText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
        marginTop: 5,
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    tabItemActive: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 14,
    },
    tabLabel: {
        fontSize: 11,
        color: '#94A3B8',
    },
    tabLabelActive: {
        color: '#2563EB',
        fontWeight: '600',
    },
});