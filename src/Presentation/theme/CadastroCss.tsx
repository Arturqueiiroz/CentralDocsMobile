import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F8FF',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 25,
        elevation: 5,
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },

    logo: {
        width: 300,
        height: 80,
        resizeMode: 'contain',
    },

    subtitle: {
        marginTop: 10,
        color: '#1f1f1f',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
    },

    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },

    loginText: {
        color: '#666',
        fontSize: 17,
    },

    loginLink: {
        color: '#0A5BC4',
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 17,
    },

    google: {
        alignItems: 'center',
        marginTop: 20,
    },

    googleButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
    },

    googleIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

export default styles;