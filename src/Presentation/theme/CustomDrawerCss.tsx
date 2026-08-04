import {
    StyleSheet,
    Platform,
    StatusBar,
} from "react-native";

const styles = StyleSheet.create({
    drawerContainer: {
        width: 290,
        paddingTop:
            Platform.OS === "android"
                ? (StatusBar.currentHeight ?? 0) + 20
                : 0,
        paddingHorizontal: 20,
        borderRightWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 16,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
        paddingBottom: 24,
    },

    logo: {
        width: 150,
        height: 57,
    },

    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },

    // ================= MENU =================

    navContainer: {
        flex: 1,
    },

    navItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 14,
        marginBottom: 6,
        position: "relative",
        overflow: "hidden",
    },

    activeIndicator: {
        position: "absolute",
        left: 0,
        top: 8,
        bottom: 8,
        width: 3,
        borderRadius: 3,
    },

    navIconWrap: {
        width: 34,
        height: 34,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    navLabel: {
        marginLeft: 12,
        fontSize: 15,
        fontWeight: "500",
    },

    // ================= FOOTER =================

    footer: {
        borderTopWidth: 1,
        paddingTop: 18,
        paddingBottom: Platform.OS === "ios" ? 12 : 16,
    },

    // ================= CARD USUÁRIO =================

    userCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 18,
        borderWidth: 1,
    },

    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },

    avatarText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
    },

    userInfo: {
        flex: 1,
        marginLeft: 12,
    },

    userName: {
        fontSize: 15,
        fontWeight: "700",
    },

    userSub: {
        marginTop: 2,
        fontSize: 11,
    },

    logoutInline: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingVertical: 6,
        alignSelf: "flex-start",
    },

    logoutInlineText: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: "600",
        color: "#EF4444",
    },
});

export default styles;