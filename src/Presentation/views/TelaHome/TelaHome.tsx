import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HeaderScreen } from '../../components/Header';

export const TelaHomeScreen = () => {
    return (
        <View style={styles.container}>
            <HeaderScreen />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>
                        Bom dia, Artur
                    </Text>

                    <Text style={styles.subtitle}>
                        Seu espaço de trabalho foi atualizado.
                    </Text>
                </View>

                <View style={styles.cardsRow}>
                    <View style={styles.infoCard}>
                        <Text style={styles.number}>128</Text>
                        <Text style={styles.label}>Documentos</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.number}>14</Text>
                        <Text style={styles.label}>Contribuidores</Text>
                    </View>
                </View>

                {/* <View style={styles.storageCard}>
                    <View style={styles.storageHeader}>
                        <Text style={styles.storageTitle}>
                            Armazenamento
                        </Text>

                        <Text style={styles.percent}>82%</Text>
                    </View>

                    <View style={styles.progressBackground}>
                        <View style={styles.progressFill} />
                    </View>

                    <Text style={styles.storageText}>
                        4,1 GB de 5 GB utilizados
                    </Text>
                </View> */}

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Atividade recente
                    </Text>

                    <Text style={styles.seeAll}>
                        Ver tudo
                    </Text>
                </View>

                <View style={styles.activityCard}>
                    <Text style={styles.activityTitle}>
                        Curriculaum.
                    </Text>

                    <Text style={styles.activitySubtitle}>
                        Editado há 2 horas
                    </Text>
                </View>

                <View style={styles.activityCard}>
                    <Text style={styles.activityTitle}>
                        Relatório Financeiro do 4º Trimestre
                    </Text>

                    <Text style={styles.activitySubtitle}>
                        Compartilhado com Sarah M.
                    </Text>
                </View>

                <View style={styles.activityCard}>
                    <Text style={styles.activityTitle}>
                        CPF
                    </Text>

                    <Text style={styles.activitySubtitle}>
                        Adicionado aos favoritos
                    </Text>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.fab}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>




<View style={styles.containerIcones}>
                <TouchableOpacity style={[styles.tabItem, styles.tabItemActive]}>
                    <Ionicons
                        name={'grid'}
                        size={22}
                        color="#2563EB"    
                    /> 
                    <Text style={[styles.tabLabel, styles.tabLabelActive]}>Dashboard</Text>                  
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons
                        name={'document-text-outline'}
                        size={22}
                        color="#8E9AA6"    
                    />  
                    <Text style={styles.tabLabel}>Documentos</Text>                  
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons
                        name={'person-outline'}
                        size={22}
                        color="#8E9AA6"    
                    />  
                    <Text style={styles.tabLabel}>Perfil</Text>                  
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TelaHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F8',
    },

    content: {
        padding: 20,
    },

    welcomeContainer: {
        marginBottom: 20,
    },

    welcomeText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2563EB',
    },

    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: '#555',
    },

    cardsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    infoCard: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        elevation: 2,
    },

    number: {
        fontSize: 28,
        fontWeight: '700',
        color: '#222',
    },

    label: {
        marginTop: 8,
        fontSize: 15,
        color: '#777',
    },

    storageCard: {
        backgroundColor: '#2563EB',
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
    },

    storageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    storageTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },

    percent: {
        color: '#FFF',
        fontWeight: '700',
    },

    progressBackground: {
        height: 8,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        overflow: 'hidden',
    },

    progressFill: {
        width: '82%',
        height: '100%',
        backgroundColor: '#FFF',
    },

    storageText: {
        color: '#FFF',
        marginTop: 10,
        fontSize: 13,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
    },

    seeAll: {
        color: '#2563EB',
        fontWeight: '600',
    },

    activityCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 1,
    },

    activityTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },

    activitySubtitle: {
        marginTop: 4,
        color: '#777',
        fontSize: 13,
    },
    containerIcones: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 75,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingBottom: 12,
    },

    fab: 
    {
        position: 'absolute',
        bottom: 85,
        right: 25,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },

    fabText: 
    {
        color: '#FFF',
        fontSize: 32,
        fontWeight: '300',
    },
    tabItem: 
    {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 20,
    },

    tabItemActive: {
        backgroundColor: '#EFF6FF',
    },

    tabLabel: {
        fontSize: 11,
        color: '#8E9AA6',
        marginTop: 4,
        fontWeight: '500',
    },

    tabLabelActive: {
        color: '#2563EB', 
        fontWeight: '600',
    },
});