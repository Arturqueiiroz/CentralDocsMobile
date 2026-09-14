import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 40,
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 4,
    },

    headerSubtitle: {
        fontSize: 14,
        marginBottom: 20,
    },

    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 10,
    },

    chipsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },

    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 8,
        marginBottom: 8,
    },

    chipText: {
        fontSize: 13,
        fontWeight: '600',
    },

    emptyTiposBox: {
        paddingVertical: 24,
        alignItems: 'center',
    },

    emptyTiposText: {
        marginTop: 8,
        fontSize: 14,
        textAlign: 'center',
    },

    submitButton: {
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    submitButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    cancelButton: {
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        borderWidth: 1,
    },

    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default styles;