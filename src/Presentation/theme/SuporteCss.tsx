import { StyleSheet } from "react-native";

const BRAND = {
    primary: "#2563EB",
    primaryDark: "#1D4ED8",
    primaryLight: "#DBEAFE",
    primarySoft: "#EFF6FF",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },

    // INTRO
    headerContainer: {
        alignItems: "center",
        marginBottom: 24,
    },

    subtitle: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 20,
        paddingHorizontal: 10,
    },

    // SEÇÃO
    sectionTitle: {
        fontSize: 13,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 12,
    },

    // CANAIS
    channelList: {
        gap: 10,
        marginBottom: 28,
    },

    channelCard: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 14,
        borderWidth: 1,
        padding: 14,
        gap: 12,
    },

    channelIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    channelTextColumn: {
        flex: 1,
    },

    channelTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 2,
    },

    channelSubtitle: {
        fontSize: 12,
    },

    // FORMULÁRIO
    formCard: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 18,
        marginBottom: 24,
    },

    inputGroup: {
        marginBottom: 16,
    },

    inputLabel: {
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 6,
    },

    textInput: {
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 14,
        height: 46,
        fontSize: 14,
    },

    textArea: {
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        minHeight: 110,
        fontSize: 14,
        textAlignVertical: "top",
    },

    submitButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: BRAND.primary,
        borderRadius: 10,
        paddingVertical: 14,
    },

    submitButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    // STATUS
    statusBanner: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 12,
        borderWidth: 1,
        padding: 14,
        marginBottom: 24,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#22C55E",
    },

    statusText: {
        fontSize: 13,
        flex: 1,
    },

    // LINK FAQ
    faqLinkRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },

    faqLinkText: {
        fontSize: 13,
        fontWeight: "600",
        color: BRAND.primary,
    },
});

export default styles;