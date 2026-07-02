import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Definindo a propriedade que o Header vai receber
interface HeaderProps {
    nome?: string;
}

export const HeaderScreen = ({ nome = 'Nickinho' }: HeaderProps) => {
    // Pega a primeira letra do nome (ou 'U' se estiver vazio) e joga para maiúsculo
    const inicial = nome ? nome.charAt(0).toUpperCase() : 'U';

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity>
                    <Ionicons name="menu" size={32} color="#5A6472" />
                </TouchableOpacity>

                <Image
                    source={require('../../../assets/img/LogoCentralDocsNova.png')}
                    style={styles.logo}
                />
            </View>

            <View style={styles.rightContainer}>
                <TouchableOpacity>
                    <Ionicons name="search" size={28} color="#5A6472" />
                </TouchableOpacity>

                {/* Bloco do Avatar com a Inicial Dinâmica */}
                <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.7}>
                    <Text style={styles.avatarText}>{inicial}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30, // Aumentado levemente para dar respiro em aparelhos com notch
        height: 80,
        backgroundColor: '#F8FAFC', // Ajustado para o mesmo tom de fundo das imagens novas
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    logo: {
        width: 150, // Ajuste leve para equilibrar o tamanho no mobile
        height: 45,
        resizeMode: 'contain',
    },

    // Novo estilo do círculo do avatar substituto da imagem
    avatarContainer: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#1D68E4', // Azul padrão do CentralDocs
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1D68E4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },

    avatarText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});