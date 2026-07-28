import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import styles from "../../theme/QrCodeCss";

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