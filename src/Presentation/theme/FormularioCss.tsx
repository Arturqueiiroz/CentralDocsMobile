import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    content: {
        padding: 16,
    },
    // ESTILOS ADICIONADOS PARA O BOTÃO VOLTAR
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        alignSelf: "flex-start",
        paddingVertical: 8,
        paddingRight: 16, // Área de toque melhorada
    },
    backButtonText: {
        fontSize: 16,
        color: "#1E293B",
        marginLeft: 6,
        fontWeight: "600",
    },
    // ----------------------------------------
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#0A5BC4",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardComDropdown: {
        zIndex: 10,
        overflow: "visible",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#0A5BC4",
        marginLeft: 8,
        textTransform: "uppercase",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    halfInput: {
        width: "48%",
    },
    label: {
        fontSize: 16,
        color: "#1E293B",
        marginBottom: 8,
        fontWeight: "500",
    },
    dropdownContainer: {
        position: "relative",
        width: "100%",
        marginBottom: 12,
    },
    genderButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: "#FFF",
        height: 54,
    },
    genderButtonAberto: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 0,
    },
    genderText: {
        fontSize: 16,
        color: "#1E293B",
    },
    dropdownLista: {
        position: "absolute",
        top: 54,
        left: 0,
        right: 0,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        zIndex: 5000,
        elevation: 5,
    },
    dropdownItem: {
        padding: 14,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    dropdownItemText: {
        fontSize: 16,
        color: "#475569",
    },
    dropdownItemAtivoText: {
        color: "#0A5BC4",
        fontWeight: "600",
    },
    cepContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 15,
        width: "100%",
    },
    cepInputWrapper: {
        flex: 1,
        marginRight: 12,
    },
    buscarButton: {
        backgroundColor: "#D0E1FD",
        paddingHorizontal: 20,
        height: 54,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    buscarButtonText: {
        color: "#0A5BC4",
        fontSize: 12,
        fontWeight: "700",
    },
});

export default styles;