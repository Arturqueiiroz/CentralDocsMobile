import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HeaderScreen = () => {
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

                <Image
                    source={require('../../../assets/img/avatar.png')}
                    style={styles.avatar}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 17,
        height: 80,
        backgroundColor: '#F5F5F5',
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
        width: 180,
        height: 50,
        resizeMode: 'contain',
    },

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
    },
});