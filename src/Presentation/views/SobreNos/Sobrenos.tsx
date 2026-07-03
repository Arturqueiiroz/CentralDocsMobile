import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderScreen } from '../../components/Header';
import { FooterScreen } from '../../components/Footer'; // Importando o footer global

const { width } = Dimensions.get('window');

interface TeamMember {
    id: string;
    nome: string;
    cargo: string;
    descricao: string;
}

export default function SobreNosScreen() {
    const equipe: TeamMember[] = [
        {
            id: '1',
            nome: 'Nicolay',
            cargo: 'Desenvolvedor Front-end',
            descricao: 'Especialista em criar interfaces intuitivas, responsivas e experiências pixel-perfect.'
        },
        {
            id: '2',
            nome: 'Matheus',
            cargo: 'Desenvolvedor Backend',
            descricao: 'Focado na arquitetura de servidores, segurança de dados e otimização de APIs robustas.'
        },
        {
            id: '3',
            nome: 'Artur',
            cargo: 'Desenvolvedor Full-stack',
            descricao: 'Conectando pontas com maestria, transitando com agilidade entre a lógica de negócios e o cliente.'
        }
    ];

    return (
        <View style={styles.container}>
            <HeaderScreen nome="Nickinho" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* HERO BANNER SUPERIOR */}
                <View style={styles.heroBanner}>
                    <Text style={styles.heroTitle}>Sobre Nós</Text>
                    <Text style={styles.heroSubtitle}>Moldando o futuro da gestão documental segura.</Text>
                </View>

                {/* SEÇÃO: NOSSA MISSÃO */}
                <View style={styles.badgeSection}>
                    <Text style={styles.badgeText}>🚀 Nossa Missão</Text>
                </View>

                <View style={styles.missionCard}>
                    <Text style={styles.missionTitle}>Garantindo o futuro digital</Text>
                    <Text style={styles.missionDescription}>
                        Na CentralDocs, acreditamos que a segurança da informação é a espinha dorsal de qualquer organização moderna. Nossa missão é simplificar a complexidade digital, oferecendo ferramentas que garantem soberania e acessibilidade total aos seus documentos mais preciosos.
                    </Text>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarFill} />
                    </View>
                </View>

                {/* SEÇÃO: NOSSOS VALORES */}
                <View style={styles.sectionHeader}>
                    <Ionicons name="diamond-outline" size={18} color="#1D68E4" />
                    <Text style={styles.sectionTitle}>Nossos Valores</Text>
                </View>

                <View style={styles.valueCardFull}>
                    <View style={[styles.iconWrapper, { backgroundColor: '#EEF4FF' }]}>
                        <Ionicons name="shield-checkmark-outline" size={22} color="#1D68E4" />
                    </View>
                    <Text style={styles.valueCardTitle}>Confiança</Text>
                    <Text style={styles.valueCardSubtitle}>Segurança inabalável em cada transação e armazenamento.</Text>
                </View>

                <View style={styles.gridValues}>
                    <View style={styles.valueCardHalf}>
                        <View style={[styles.iconWrapper, { backgroundColor: '#EEF4FF' }]}>
                            <Ionicons name="flash-outline" size={22} color="#1D68E4" />
                        </View>
                        <Text style={styles.valueCardTitle}>Utilitário</Text>
                        <Text style={styles.valueCardSubtitle}>Foco na eficiência e usabilidade extrema.</Text>
                    </View>

                    <View style={styles.valueCardHalf}>
                        <View style={[styles.iconWrapper, { backgroundColor: '#EEF4FF' }]}>
                            <Ionicons name="people-outline" size={22} color="#1D68E4" />
                        </View>
                        <Text style={styles.valueCardTitle}>Inclusão</Text>
                        <Text style={styles.valueCardSubtitle}>Tecnologia acessível para todos.</Text>
                    </View>
                </View>

                {/* SEÇÃO: NOSSA EQUIPE */}
                <View style={styles.sectionHeader}>
                    <Ionicons name="people-outline" size={18} color="#1D68E4" />
                    <Text style={styles.sectionTitle}>Nossa Equipe</Text>
                </View>

                {equipe.map((membro) => {
                    const inicial = membro.nome ? membro.nome.charAt(0).toUpperCase() : '?';
                    return (
                        <View key={membro.id} style={styles.memberCard}>
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>{inicial}</Text>
                                <View style={styles.verifiedBadge}>
                                    <MaterialCommunityIcons name="check-decagram" size={12} color="#FFFFFF" />
                                </View>
                            </View>

                            <View style={styles.memberInfo}>
                                <Text style={styles.memberName}>{membro.nome}</Text>
                                <Text style={styles.memberRole}>{membro.cargo}</Text>
                                <Text style={styles.memberDescription} numberOfLines={2}>
                                    {membro.descricao}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

            {/* ADICIONANDO O FOOTER GLOBAL */}
            <FooterScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    // ... mantive todos os seus estilos originais, 
    // apenas removi os estilos da 'tabBar' antiga que não são mais necessários
    heroBanner: {
        backgroundColor: '#1E293B',
        borderRadius: 24,
        paddingVertical: 45,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 4,
    },
    heroTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginBottom: 8, letterSpacing: -0.5 },
    heroSubtitle: { color: '#94A3B8', fontSize: 13, textAlign: 'center', lineHeight: 18, paddingHorizontal: 15 },
    badgeSection: { backgroundColor: '#EFF6FF', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 12 },
    badgeText: { color: '#1D68E4', fontSize: 12, fontWeight: '700' },
    missionCard: { backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', padding: 20, marginBottom: 30 },
    missionTitle: { fontSize: 20, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
    missionDescription: { fontSize: 13, color: '#64748B', lineHeight: 20, marginBottom: 18 },
    progressBarContainer: { height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, width: '100%' },
    progressBarFill: { height: '100%', backgroundColor: '#1D68E4', borderRadius: 2, width: '65%' },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15, paddingHorizontal: 4 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
    valueCardFull: { backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', padding: 16, marginBottom: 12 },
    iconWrapper: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    valueCardTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
    valueCardSubtitle: { fontSize: 12, color: '#64748B', lineHeight: 16 },
    gridValues: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    valueCardHalf: { backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', padding: 16, width: (width - 52) / 2 },
    memberCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 15, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
    avatarPlaceholder: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center', position: 'relative', marginRight: 15 },
    avatarText: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
    verifiedBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#1D68E4', width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFFFFF' },
    memberInfo: { flex: 1 },
    memberName: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
    memberRole: { fontSize: 12, fontWeight: '600', color: '#2563EB', marginTop: 2, marginBottom: 4 },
    memberDescription: { fontSize: 11, color: '#94A3B8', lineHeight: 15 },
});