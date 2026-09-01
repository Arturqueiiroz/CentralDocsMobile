import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    card: {
        borderRadius: 20,
        padding: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },
    logo: {
        width: 220,
        height: 55,
        resizeMode: 'contain',
    },
    title: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 8,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 10,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 16,
    },
    loginLink: {
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 16,
    },
    confirmationContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    confirmationIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    confirmationTitle: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    confirmationText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 20,
        paddingHorizontal: 10,
    },
    confirmationEmail: {
        fontWeight: '700',
    },
    resendLink: {
        marginTop: 18,
    },
    resendLinkText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default styles;
