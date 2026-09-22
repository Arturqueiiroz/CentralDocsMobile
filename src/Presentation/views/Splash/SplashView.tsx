import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

interface SplashViewProps {
    onFinish?: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onFinish }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.85)).current;
    const subtitleFade = useRef(new Animated.Value(0)).current;
    const subtitleTranslateY = useRef(new Animated.Value(15)).current;

    useEffect(() => {
        // Sequência de animações de entrada
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 7,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Animação do subtítulo após a entrada do logo
            Animated.parallel([
                Animated.timing(subtitleFade, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(subtitleTranslateY, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            
            {/* Fundo em degradê com as cores da logo (Azul Escuro Navy -> Azul Real -> Ciano) */}
            <LinearGradient
                colors={['#0F172A', '#0F2752', '#1E40AF', '#0284C7']}
                locations={[0, 0.35, 0.7, 1]}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0.9, y: 0.9 }}
                style={StyleSheet.absoluteFill}
            />

            {/* Elementos decorativos de brilho no fundo */}
            <View style={styles.glowCircleTop} />
            <View style={styles.glowCircleBottom} />

            {/* Conteúdo Central */}
            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <Image
                        source={require('../../../../assets/img/LogoParaTemaClaro.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.subtitleContainer,
                        {
                            opacity: subtitleFade,
                            transform: [{ translateY: subtitleTranslateY }],
                        },
                    ]}
                >
                    <Text style={styles.subtitle}>
                        Gerencie seus documentos de forma simples e segura
                    </Text>
                </Animated.View>
            </View>

            {/* Rodapé / Indicator */}
            <Animated.View style={[styles.footer, { opacity: subtitleFade }]}>
                <ActivityIndicator size="small" color="#38BDF8" style={{ marginBottom: 12 }} />
                <Text style={styles.footerText}>CentralDocs Mobile v1.0</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F172A',
    },
    glowCircleTop: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(56, 189, 248, 0.12)',
    },
    glowCircleBottom: {
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: 'rgba(30, 64, 175, 0.25)',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    logo: {
        width: width * 0.75,
        height: 110,
    },
    subtitleContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    subtitle: {
        color: '#E2E8F0',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.3,
        opacity: 0.9,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(226, 232, 240, 0.5)',
        fontSize: 12,
        letterSpacing: 0.5,
    },
});

export default SplashView;
